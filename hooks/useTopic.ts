import useSWR from "swr";
import { get } from "../utils/api";
import {  TopicWithPlaylists } from "@/types/topic";

const fetcher = (url: string) => get<TopicWithPlaylists>(url);

export const useTopic = (topicId: string) => {
  const {
    data: topic,
    error,
    isLoading,
  } = useSWR(`/topics/${topicId}`, fetcher);
  return { topic, error, isLoading };
};
