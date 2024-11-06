import { NextResponse } from "next/server";
import UserPlaylistProgress from "@/app/models/UserPlaylistProgress";
import connectDB from "@/app/lib/mongodb";

export const POST = async (req: Request) => {
  try {
    await connectDB();
    const { playlistId, user, videoId } = await req.json();

    const progress = await UserPlaylistProgress.findOneAndUpdate(
      { playlistId, user },
      { $addToSet: { finishedVideos: videoId } },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      message: "Video marked as finished",
      data: progress,
    });
  } catch (error) {
    console.error("Error updating finished videos:", error);
    return NextResponse.json(
      { message: "Failed to update finished videos" },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const playlistId = searchParams.get("playlistId");
    const user = searchParams.get("user");

    if (!playlistId || !user) {
      return NextResponse.json(
        { message: "Playlist ID and User ID are required" },
        { status: 400 }
      );
    }

    const progress = await UserPlaylistProgress.findOne({ playlistId, user });

    return NextResponse.json({
      message: "Finished videos retrieved successfully",
      data: progress?.finishedVideos || [],
    });
  } catch (error) {
    console.error("Error retrieving finished videos:", error);
    return NextResponse.json(
      { message: "Failed to retrieve finished videos" },
      { status: 500 }
    );
  }
};
