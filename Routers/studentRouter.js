import express from "express"
import Student from "../Models/StudentModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
    // console.log("get all Students");
    try {
      const data = await Student.find().populate("mentorAssigned", "name expertise");
      res.send(data);
    } catch (e) {
        console.log(e.message, "error");
        res.status(500).send("Error in fetching students data");
    }
  });
  
  router.post("/", async (req, res) => {
    console.log("Student create route");
    try {
      const data = await Student.create({
        name: req.body.name,
        email: req.body.email,
        course: req.body.course,
      });
      res.send(data);
    } catch (e) {
      console.log(e.message, "error");
      res.status(500).send("Error in student POST");
    }
  });

  export const studentRouter = router;