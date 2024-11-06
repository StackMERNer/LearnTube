import { NextResponse } from "next/server";
import UserPlaylistProgress from "@/app/models/UserPlaylistProgress";
import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/User";

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
    const userId = searchParams.get("user");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Fetch user document to get learningPlaylists array
    const user = await User.findById(userId).lean();
    if (!user || !user.learningPlaylists) {
      return NextResponse.json(
        { message: "User or learning playlists not found" },
        { status: 404 }
      );
    }

    // Collect all finished video IDs for the user's playlists
    let allFinishedVideos: string[] = [];

    // Fetch finished videos for each playlist in learningPlaylists
    for (const playlistId of user.learningPlaylists) {
      const progress = await UserPlaylistProgress.findOne({
        playlistId,
        user: userId,
      }).lean();
      if (progress && progress.finishedVideos) {
        allFinishedVideos = allFinishedVideos.concat(progress.finishedVideos);
      }
    }

    return NextResponse.json(allFinishedVideos);
  } catch (error) {
    console.error("Error retrieving finished videos:", error);
    return NextResponse.json(
      { message: "Failed to retrieve finished videos" },
      { status: 500 }
    );
  }
};
