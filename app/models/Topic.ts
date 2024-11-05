import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: { type: String },
    title: { type: String, required: true },
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
  },
  { timestamps: true }
);

export default mongoose.models.Topic || mongoose.model("Topic", TopicSchema);
