import { IUser } from "@/types/user";
import mongoose, {  Schema } from "mongoose";

const UserSchema: Schema<IUser> = new Schema(
  {
    auth0Id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
