import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVideo {
  videoId: string;
  title: string;
  thumbnail: string; // URL to the smaller thumbnail
  position:number;
}

interface IPlaylist extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  playlistId: string;
  description: string;
  thumbnail: string; // URL to the playlist thumbnail
  videos: IVideo[]; // Array of video objects
}

const VideoSchema: Schema<IVideo> = new Schema({
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
});

const PlaylistSchema: Schema<IPlaylist> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    playlistId: { type: String, required: true, unique: true }, // YouTube Playlist ID
    description: { type: String, required: false },
    thumbnail: { type: String, required: false }, // URL to the playlist thumbnail
    videos: [VideoSchema], // Array of video objects following VideoSchema
  },
  { timestamps: true }
);

const Playlist: Model<IPlaylist> =
  mongoose.models.Playlist ||
  mongoose.model<IPlaylist>("Playlist", PlaylistSchema);

export default Playlist;
