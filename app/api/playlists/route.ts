import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Topic from "@/app/models/Topic";
import Playlist, { IVideo } from "@/app/models/Playlist";

export const POST = async (req: Request) => {
  try {
    const { playlistUrl, topicId, user } = await req.json();

    // Extract playlist ID from the URL
    const playlistIdMatch = playlistUrl.match(/[?&]list=([^&]+)/);
    if (!playlistIdMatch) throw new Error("Invalid playlist URL");

    const playlistId = playlistIdMatch[1];
    const headers = {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
      "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
    };

    let videos: IVideo[] = [];
    let nextPageToken: string | undefined = "";

    do {
      const url:string = `https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=${playlistId}&part=snippet&maxResults=50&pageToken=${nextPageToken}`;
      const response = await fetch(url, { headers });
      const data = await response.json();

      if (!data || !data.items) throw new Error("Failed to retrieve playlist information");

      // Extract relevant data for each video
      const videoItems: IVideo[] = data.items.map((item: any) => ({
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url,
        position: item.snippet.position,
      }));

      videos = videos.concat(videoItems);
      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    // Fetch playlist details separately
    const playlistDetailsUrl = `https://youtube-v31.p.rapidapi.com/playlists?part=snippet&id=${playlistId}`;
    const playlistResponse = await fetch(playlistDetailsUrl, { headers });
    const playlistData = await playlistResponse.json();

    if (!playlistData || !playlistData.items || playlistData.items.length === 0)
      throw new Error("Failed to retrieve playlist details");

    const playlistInfo = {
      user,
      playlistId,
      title: playlistData.items[0].snippet.title,
      description: playlistData.items[0].snippet.description,
      thumbnail: playlistData.items[0].snippet.thumbnails.default.url,
      videos,
    };

    await connectDB();

    // Check if playlist exists and update or create
    const updatedPlaylist = await Playlist.findOneAndUpdate(
      { playlistId },
      playlistInfo, // replace with the new playlistInfo document
      { new: true, upsert: true } // upsert creates a new document if none is found
    );

    // Ensure playlist ID is in topic
    await Topic.findByIdAndUpdate(topicId, {
      $addToSet: { playlists: updatedPlaylist._id },
    });

    return NextResponse.json({
      message: updatedPlaylist.wasNew ? "Playlist created successfully" : "Playlist updated successfully",
      data: updatedPlaylist,
    });
  } catch (error) {
    console.error("Error adding or updating playlist:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to add or update playlist",
      },
      { status: 500 }
    );
  }
};