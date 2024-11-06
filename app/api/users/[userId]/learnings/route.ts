// import { NextRequest, NextResponse } from "next/server";
// import {
//   addToCurrentPlaylists,
//   removeFromCurrentPlaylists,
// } from "@/app/controllers/userController"; // Import from userController
// import User from "@/app/models/User";
// import Playlist from "@/app/models/Playlist";

// export const GET = async (req: NextRequest,) => {
//   try {
//     const userId = req.nextUrl.pathname.split("/")[3];
//     const user = await User.findById(userId).select("learningPlaylists");

//     const playlists = await Playlist.find({
//       playlistId: { $in: user.learningPlaylists },
//     });
//     return NextResponse.json(playlists);
//   } catch (error: any) {
//     return NextResponse.json(
//       { message: `Failed to fetch playlists: ${error.message}` },
//       { status: 500 }
//     );
//   }
// };

// export const POST = async (req: NextRequest) => {
//   try {
//     const userId = req.nextUrl.pathname.split("/")[3];
//     const { playlistId } = await req.json();
//     await addToCurrentPlaylists(userId, playlistId);
//     return NextResponse.json({
//       message: "Playlist added to current learning.",
//     });
//   } catch (error) {
//     console.error("Error adding playlist:", error);
//     return NextResponse.json(
//       { message: "Failed to add playlist." },
//       { status: 500 }
//     );
//   }
// };

// export const DELETE = async (req: Request) => {
//   try {
//     const { userId, playlistId } = await req.json();
//     await removeFromCurrentPlaylists(userId, playlistId);
//     return NextResponse.json({
//       message: "Playlist removed from current learning.",
//     });
//   } catch (error) {
//     console.error("Error removing playlist:", error);
//     return NextResponse.json(
//       { message: "Failed to remove playlist." },
//       { status: 500 }
//     );
//   }
// };

// app/api/users/[userId]/learning/route.ts
import { NextResponse } from "next/server";
import UserLearning from "@/app/models/UserLearning"; // import the model
import mongoose from "mongoose";
import Playlist from "@/app/models/Playlist";

export const GET = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    const { userId } = params;

    const userLearnings = await UserLearning.findOne({ user: userId });

    // For each playlistId, fetch the corresponding Playlist document
    const populatedPlaylists = await Promise.all(
      userLearnings.learnings.map(async (playlist: any) => {
        const playlistDetails = await Playlist.findOne({
          playlistId: playlist.playlistId, // Match with the YouTube playlistId
        });

        return {
          learningInfo: playlist,
          playlist: playlistDetails, // Add the full playlist document to the playlist object
        };
      })
    );

    // Return the populated user learning data
    return NextResponse.json(populatedPlaylists);
    // return NextResponse.json({
    //   ...userLearnings,
    //   playlists: populatedPlaylists,
    // });
  } catch (error: any) {
    return NextResponse.json(
      { message: `Failed to fetch playlists: ${error.message}` },
      { status: 500 }
    );
  }
};

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const { playlistId, status } = await req.json();

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
  }

  if (!["Learning", "Paused", "Finished"].includes(status)) {
    return NextResponse.json({ message: "Invalid status" }, { status: 400 });
  }

  try {
    // Check if the user learning data already exists
    let userLearning = await UserLearning.findOne({ user: userId });

    if (!userLearning) {
      // Create new user learning data if not present
      userLearning = new UserLearning({
        user: userId,
        learnings: [{ playlistId, startedAt: new Date(), status }],
      });
    } else {
      // Add the new playlist to the existing data
      userLearning.learnings.push({
        playlistId,
        startedAt: new Date(),
        status,
      });
    }

    await userLearning.save();
    return NextResponse.json({ message: "Playlist added to user learnings" });
  } catch (error) {
    console.error("Error adding playlist:", error);
    return NextResponse.json(
      { message: "Failed to add playlist" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const { status, playlistId } = await req.json();

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
  }

  if (!["Learning", "Paused", "Finished"].includes(status)) {
    return NextResponse.json({ message: "Invalid status" }, { status: 400 });
  }

  try {
    // Find the user learning data
    const userLearning = await UserLearning.findOne({ user: userId });

    if (!userLearning) {
      return NextResponse.json(
        { message: "User learning data not found" },
        { status: 404 }
      );
    }

    // Find the playlist and update the status
    const playlist = userLearning.playlists.find(
      (p: any) => p.playlistId === playlistId
    );

    if (!playlist) {
      return NextResponse.json(
        { message: "Playlist not found" },
        { status: 404 }
      );
    }

    playlist.status = status;
    if (status === "Finished") {
      playlist.finishedAt = new Date();
    }

    await userLearning.save();
    return NextResponse.json({ message: "Playlist status updated" });
  } catch (error) {
    console.error("Error updating playlist status:", error);
    return NextResponse.json(
      { message: "Failed to update playlist status" },
      { status: 500 }
    );
  }
}
