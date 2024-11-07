import mongoose from "mongoose";

export interface Video {
  videoId: string; // youtube video id
  title: string;
  thumbnail: string; // URL to the smaller thumbnail
  position: number;
}

interface PlaylistBase {
  description: string;
  thumbnail: string;
  videos: Video[]; // URL to the playlist thumbnail
  title: string;
  playlistId: string; // youtube playlist _id
}

export interface Playlist extends PlaylistBase {
  topic: string; // topic _id
  user: string; // user _id
}

export interface PlaylistModel extends PlaylistBase {
  topic: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
}
