import connectDB from "@/app/lib/mongodb";
import Topic from "@/app/models/Topic";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { topicId: string } }
) => {
  try {
    const { topicId } = params;
    await connectDB();
    const topic = await Topic.findById(topicId).populate({
      path: "playlists",
      select: "title playlistId thumbnail",
    });
    return NextResponse.json(topic);
  } catch (error) {
    console.error("Error fetching topics:", error);
    return NextResponse.json(
      { message: "Failed to fetch topics" },
      { status: 500 }
    );
  }
};
