import { PlaylistModel, Video } from "@/types/playlist";
import mongoose, { Schema, Model } from "mongoose";


const VideoSchema: Schema<Video> = new Schema({
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
});

const PlaylistSchema: Schema<PlaylistModel> = new Schema(
  {
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Topic",
    },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    playlistId: { type: String, required: true, unique: true }, // YouTube Playlist ID
    description: { type: String, required: false },
    thumbnail: { type: String, required: false }, // URL to the playlist thumbnail
    videos: [VideoSchema], // Array of video objects following VideoSchema
  },
  { timestamps: true }
);

const Playlist: Model<PlaylistModel> =
  mongoose.models.Playlist ||
  mongoose.model<PlaylistModel>("Playlist", PlaylistSchema);

export default Playlist;
