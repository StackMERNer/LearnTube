import { NextResponse } from "next/server";
import { addToCurrentPlaylists, removeFromCurrentPlaylists } from "@/app/controllers/userController"; // Import from userController

export const POST = async (req: Request) => {
  try {
    const { userId, playlistId } = await req.json();
    await addToCurrentPlaylists(userId, playlistId);
    return NextResponse.json({ message: "Playlist added to current learning." });
  } catch (error) {
    console.error("Error adding playlist:", error);
    return NextResponse.json(
      { message: "Failed to add playlist." },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { userId, playlistId } = await req.json();
    await removeFromCurrentPlaylists(userId, playlistId);
    return NextResponse.json({ message: "Playlist removed from current learning." });
  } catch (error) {
    console.error("Error removing playlist:", error);
    return NextResponse.json(
      { message: "Failed to remove playlist." },
      { status: 500 }
    );
  }
};
