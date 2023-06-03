import mongoose from "mongoose";

const dbConnect = async () => {
    try {
      await mongoose.connect(
        process.env.MONGO_URL,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          autoIndex: true,
        }
      );
      console.log("DB Connected Successfully");
    } catch (e) {
      console.log(e.message, "error in connecting db");
    }
  };

  export default dbConnect;