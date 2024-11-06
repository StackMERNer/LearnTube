import mongoose, { Schema, Document } from "mongoose";

interface IUserPlaylistProgress extends Document {
  playlistId: string;
  user: mongoose.Schema.Types.ObjectId;
  finishedVideos: string[];
}

const UserPlaylistProgressSchema = new Schema<IUserPlaylistProgress>({
  playlistId: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  finishedVideos: { type: [String], default: [] },
});

const UserPlaylistProgress = mongoose.model<IUserPlaylistProgress>(
  "UserPlaylistProgress",
  UserPlaylistProgressSchema
);

export default UserPlaylistProgress;
