import useSWR from "swr";
import { get } from "../utils/api";
import { IUser } from "@/types/user";

const fetcher = (url: string) => get<IUser>(url);

export const useUser = (userId: string) => {
  const { data, error, isLoading } = useSWR(`/users/${userId}`, fetcher);
  return { data, error, isLoading };
};
