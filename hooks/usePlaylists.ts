import useSWR from "swr";
import { get } from "../utils/api";
import { Playlist } from "@/types/playlist";

const fetcher = (url: string) => get<Playlist[]>(url);

export const usePlaylists = () => {
  const { data: playlists, error, isLoading } = useSWR(`/playlists`, fetcher);
  return { playlists, error, isLoading };
};
