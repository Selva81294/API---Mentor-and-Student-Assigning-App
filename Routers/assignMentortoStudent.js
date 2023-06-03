import express from "express"
import Mentor from "../Models/MentorModel.js";
import Student from "../Models/StudentModel.js";
import mongoose from "mongoose";

const objId = mongoose.Types.ObjectId;

const router = express.Router();

// Assigning new mentor

router.post("/newMentor", async (req, res) => {
    // console.log("assignMentorToStudent");
    let studentsArray = JSON.parse(req.body.studentsArray)
    //req -> has mentor id + studentsId
    //to do : add students to mentor & viceversa
    try {
      //updating studentList in mentor doc
      const mentorData = await Mentor.findById(req.body.mentorId);
      mentorData.studentsAssigned = [
        ...mentorData.studentsAssigned,
        ...studentsArray,
      ];
      mentorData.save();
      //adding mentor to all respective students
      studentsArray.forEach(async (stud) => {
        const temp = await Student.findById(stud);
        temp.mentorAssigned = req.body.mentorId;
        temp.save();
      });
  
      res.send("Mentor Added to Students and updated in mentor document too");
    } catch (e) {
      console.log(e, "error in assigning mentor route");
      res.status(400).send("error");
    }
  });


// Modify old mentor to new mentor

  router.post("/modifyMentor", async (req, res) => {
    //req has studentid and newMentorid
    // console.log("Select One Student and Assign one Mentor");
    try {
      //change mentorassigned to new value in students
      let stud = await Student.findById(req.body.studentId);
      const oldMentorId = stud.mentorAssigned; //save the oldmentor id for updating studAssignedList later
      stud.mentorAssigned = req.body.newMentorId;
      stud.save();
      //todo : remove that student from oldmentor assignedlist and add in new mentor assignedlist
  
      //change in oldmentor studentsAssigned list 
      let oldment = await Mentor.findById(oldMentorId);
  
      if (oldment.studentsAssigned.length < 0) {
        // console.log("oldment");
        return;
      } else {
        let newAssigned = oldment.studentsAssigned;
        const indexpos = newAssigned.indexOf(new objId(req.body.studentId));
        // console.log(indexpos, "index");
        newAssigned.pop(indexpos);
        // console.log(newAssigned);
        oldment.studentsAssigned = newAssigned;
      }
  
      //filtering that one student and remove from studentList of mentor
      oldment.save();
  
      //add the studentid in newMentor studentsAssignedlist
      let newment = await Mentor.findById(req.body.newMentorId);
      if (newment.studentsAssigned.length < 0) {
        return;
      } else {
        if (!newment.studentsAssigned.includes(req.body.studentId)) {
          newment.studentsAssigned = [
            ...newment.studentsAssigned,
            req.body.studentId,
          ];
        }
      }
      newment.save();
  
      res.send(
        "Updated mentor to respective student , updated in oldmentor and new mentor studentsAssigned list"
      );
    } catch (e) {
      console.log(e, "error");
      res.status(500).send("error in all students for 1 mentor");
    }
  });

export const assignMentorToStudentRouter = router;