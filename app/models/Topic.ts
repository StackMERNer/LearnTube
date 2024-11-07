import { Topic } from "@/types/topic";
import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema<Topic>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String },
    title: { type: String, required: true },
    thumbnail: { type: String },
    // playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
  },
  { timestamps: true }
);

export default mongoose.models.Topic || mongoose.model("Topic", TopicSchema);
