import useSWR from "swr";
import { get } from "../utils/api";
import { Playlist } from "@/types/playlist";

const fetcher = (url: string) => get<Playlist[]>(url);

export const useTopics = () => {
  const { data: topics, error, isLoading } = useSWR(`/playlists`, fetcher);
  return { topics, error, isLoading };
};
