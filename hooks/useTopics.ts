import useSWR from "swr";
import { get } from "../utils/api";
import { Topic } from "@/types/topic";

const fetcher = (url: string) => get<Topic[]>(url);

export const useTopics = () => {
  const { data:topics, error, isLoading } = useSWR(`/topics`, fetcher);
  return { topics, error, isLoading };
};
