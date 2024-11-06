import mongoose, { Schema, Document } from "mongoose";

export interface ILearningInfo {
  playlistId: string;
  startedAt: Date;
  finishedAt?: Date;
  status: "Learning" | "Paused" | "Finished";
}

export interface IUserLearnings extends Document {
  user: { type: mongoose.Schema.Types.ObjectId; ref: "User"; required: true };
  learnings: ILearningInfo[];
}

const PlaylistSchema: Schema = new Schema(
  {
    playlistId: { type: String, required: true },
    startedAt: { type: Date, required: true },
    finishedAt: { type: Date },
    status: {
      type: String,
      enum: ["Learning", "Paused", "Finished"],
      required: true,
    },
  },
  { _id: false } // to not create an _id for each playlist item
);

const UserLearningSchema: Schema = new Schema<IUserLearnings>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    learnings: { type: [PlaylistSchema], default: [] },
  },
  { timestamps: true }
);

const UserLearning =
  mongoose.models.UserLearning ||
  mongoose.model<IUserLearnings>("UserLearning", UserLearningSchema);

export default UserLearning;
