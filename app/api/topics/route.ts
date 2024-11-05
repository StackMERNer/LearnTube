import connectDB from "@/app/lib/mongodb";
import Topic from "@/app/models/Topic";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();
    const topics = await Topic.find({}).populate({
      path: "playlists",
      select: "title playlistId",
    });
    return NextResponse.json(topics);
  } catch (error) {
    console.error("Error fetching topics:", error);
    return NextResponse.json(
      { message: "Failed to fetch topics" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const { title, user } = await req.json();
    await connectDB();

    // Validate input
    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    // Create a new topic
    const newTopic = new Topic({ title, user });
    await newTopic.save();

    return NextResponse.json(newTopic, { status: 201 });
  } catch (error) {
    console.error("Error adding new topic:", error);
    return NextResponse.json(
      { message: "Failed to add topic" },
      { status: 500 }
    );
  }
};
