export interface IUser extends Document {
  _id: string;
  auth0Id: string;
  email: string;
  name: string;
  picture: string;
  role: "admin" | "user";
  learnings: {
    playlistId: string;
    startedAt: Date;
    finishedAt?: Date;
    status: "Learning" | "Paused" | "Finished";
  }[];
}

// Create a type for editable user fields only
export type EditableUserFields = Pick<IUser, "name" | "role">;

// Partial type for user updates where not all fields are required
export type UserUpdatePayload = Partial<IUser>;

type ExcludeKeys<T, K extends keyof T> = Omit<T, K>;

export type UserRole = IUser["role"];

export type UserWithoutId = ExcludeKeys<IUser, "_id">;