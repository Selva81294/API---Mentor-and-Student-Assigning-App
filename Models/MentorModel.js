import mongoose from "mongoose";

const mentorSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String, 
      required: true,
      unique: true,
    },
    expertise: {
      type: String,
      required: true,
    },
    studentsAssigned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        default: null,
      },
    ],
  });
  
  const Mentor = mongoose.model("mentor", mentorSchema);

  export default Mentor;