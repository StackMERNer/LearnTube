import { NextResponse } from "next/server";
import UserPlaylistProgress from "@/app/models/UserPlaylistProgress";
import connectDB from "@/app/lib/mongodb";
import UserLearning, { ILearningInfo } from "@/app/models/UserLearning";

export const POST = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    await connectDB();
    const { userId } = params;
    const { playlistId, videoId } = await req.json();

    const progress = await UserPlaylistProgress.findOneAndUpdate(
      { playlistId, user: userId },
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

export const GET = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    await connectDB();
    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Fetch user document to get learningPlaylists array
    const userLearnings = await UserLearning.findOne({ user: userId });

    // return;
    if (!userLearnings) {
      return NextResponse.json(
        { message: "userLearnings not found" },
        { status: 404 }
      );
    }

    const playlistIds = userLearnings.learnings.map(
      (playlist: ILearningInfo) => playlist.playlistId
    );
    // Collect all finished video IDs for the user's playlists

    let allFinishedVideos: string[] = [];

    // // Fetch finished videos for each playlist in learningPlaylists
    for (const playlistId of playlistIds) {
      const progress = await UserPlaylistProgress.findOne({
        playlistId,
        user: userId,
      });
      if (progress && progress.finishedVideos) {
        allFinishedVideos = allFinishedVideos.concat(progress.finishedVideos);
      }
    }

    return NextResponse.json(allFinishedVideos);
  } catch (error) {
    console.error("Error retrieving finished videos:", error);
    return NextResponse.json(
      { message: "Failed to retrieve finished videossss" },
      { status: 500 }
    );
  }
};
