import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import dbConnect from "./Database/db.js";
import { studentRouter } from "./Routers/studentRouter.js";
import { mentorRouter } from "./Routers/mentorRouter.js";
import { assignMentorToStudentRouter } from "./Routers/assignMentortoStudent.js";

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("API for Mentor & Student Assigning APP");
});

app.use("/student", studentRouter);
app.use("/mentor", mentorRouter);
app.use("/assignmentor", assignMentorToStudentRouter);

app.listen(process.env.PORT, async (err) => {
  await dbConnect();
  console.log(`Server started in the PORT ${process.env.PORT}`);
  if (err) {
    console.log(err, "error in starting server");
  }
});