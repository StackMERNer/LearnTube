// example type guards
import { IUser } from "./user";

export function isUser(data: any): data is IUser {
  return data && typeof data.id === "string" && typeof data.email === "string";
}
