import mongoose from "mongoose";
import { Playlist } from "./playlist";

export interface Topic {
  _id: string;
  user: mongoose.Schema.Types.ObjectId;
  description?: string;
  thumbnail?: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TopicWithPlaylists extends Topic {
  playlists: Playlist[];
}
