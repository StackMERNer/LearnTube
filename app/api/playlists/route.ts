// /app/api/addPlaylist/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Topic from "@/app/models/Topic";
import Playlist from "@/app/models/Playlist";

export const POST = async (req: Request) => {
  try {
    const { playlistUrl, topicId } = await req.json();
    console.log(playlistUrl, topicId);
    // return;
    // Extract playlist ID from the URL
    const playlistIdMatch = playlistUrl.match(/[?&]list=([^&]+)/);
    if (!playlistIdMatch) throw new Error("Invalid playlist URL");

    const playlistId = playlistIdMatch[1];

    const url = `https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=${playlistId}&part=snippet&maxResults=50`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("data", data);

      if (!data || !data.items)
        throw new Error("Failed to retrieve playlist information");
      const playlistData = {
        playlistId,
        title: data.items[0].snippet.title,
        description: data.items[0].snippet.description,
        thumbnail: data.items[0].snippet.thumbnails.default.url,
      };

      await connectDB();

      // Create playlist in the database
      //   const newPlaylist = await Playlist.create(playlistData);

      // Update the topic with the playlist ID
      //   await Topic.findByIdAndUpdate(topicId, {
      //     $push: { playlists: newPlaylist._id },
      //   });

      return NextResponse.json({
        message: "Playlist added successfully",
        data: data,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Error adding playlist:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to add playlist",
      },
      { status: 500 }
    );
  }
};
