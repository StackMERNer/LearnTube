import mongoose from "mongoose";
import User from "@/app/models/User"; // Import your User model

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to MongoDB");
    return;
  }
  
  const uri = process.env.MONGODB_URI!;
  
  try {
    await mongoose.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // You can add more options here if needed
    });
    console.log("MongoDB connected");

    // Ensure that indexes are created
    await User.init(); // Initializes the User model and creates indexes

  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

export default connectDB;
