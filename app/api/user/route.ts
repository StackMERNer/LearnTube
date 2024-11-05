import { NextResponse } from "next/server"; 
import connectDB from "@/app/lib/mongodb"; 
import User from "@/app/models/User"; 

export const POST = async (req: Request) => {
  try {
    const userData = await req.json(); // Get the JSON body from the request

    // Connect to MongoDB
    await connectDB();

    // Check if the user already exists
    const existingUser = await User.findOne({ auth0Id: userData.auth0Id });
    let message = "User data processed successfully";
    let userResponse;
    if (!existingUser) {
      // If the user does not exist, create a new user
      const newUser = new User(userData);
      await newUser.save(); // Save the new user to the database
      userResponse = newUser; // Set the response to the newly created user
      message = "New user created successfully"; // Update the message
    } else {
      userResponse = existingUser; // Set the response to the existing user
      message = "Existing user found"; // Update the message
    }

    // Return the user data along with a message
    return NextResponse.json({ message, user: userResponse });
  } catch (error) {
    console.error("Error processing user data:", error);
    return NextResponse.json({ message: "Failed to process user data" }, { status: 500 });
  }
};
