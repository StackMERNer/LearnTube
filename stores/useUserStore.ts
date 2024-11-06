import { IUser } from "@/app/models/User";
import { create } from "zustand";

// type User = {
//   _id: string;
//   auth0Id: string;
//   email: string;
//   name: string;
//   picture: string;
// };

type UserStore = {
  user: IUser | null;
  setUser: (user: IUser) => void;
  clearUser: () => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
