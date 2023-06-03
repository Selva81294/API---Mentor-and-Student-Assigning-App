import express from "express"
import Mentor from "../Models/MentorModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  // console.log("get all mentors");
  try {
    const data = await Mentor.find().populate("studentsAssigned", "name course");
    res.send(data);
  } catch (e) {
    console.log(e, "error");
    res.status(400).send("Can't fetch the mentors data");
  }
});

router.post("/", async (req, res) => {
  console.log("mentor create route");
  try {
    const data = await Mentor.create({
      name: req.body.name,
      email: req.body.email,
      expertise: req.body.expertise,
    });
    res.send(data);
  } catch (e) {
    console.log(e, "error");
    res.status(400).send("Error occured while posting");
  }
});

router.get("/:id", async (req, res) => {
  console.log("show all students for particular mentor");
  try {
    const mentor = await Mentor
      .findById(req.params.id)
      .populate("studentsAssigned", "name course");
    res.send(mentor);
  } catch (e) {
    console.log(e, "error");
    res.status(500).send("error in for 1 mentor get all students");
  }
});

export const mentorRouter = router;