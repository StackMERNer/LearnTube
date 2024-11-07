"use client";

import { ILearningInfo } from "@/app/models/UserLearning";
import useUserStore from "@/stores/useUserStore";
import { Playlist } from "@/types/playlist";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PlaylistsAccordion from "./PlaylitsAccordion";
const LearningDashboard = () => {
  const { user } = useUserStore();
  const [userLearning, setUserLearning] = useState<
    { learningInfo: ILearningInfo; playlist: Playlist }[]
  >([]);
  const [finishedVideos, setFinishedVideos] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const topicsResponse = await fetch(`/api/users/${user._id}/learnings`);
        if (!topicsResponse.ok) throw new Error("Failed to fetch topics");
        const playlists = await topicsResponse.json();
        setUserLearning(playlists);

        const finishedVideosResponse = await fetch(
          `/api/users/${user._id}/playlist-progress`
        );
        if (!finishedVideosResponse.ok)
          throw new Error("Failed to fetch finished videos");
        const finishedVideosData = await finishedVideosResponse.json();

        setFinishedVideos(finishedVideosData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, [user]);

  const markVideoAsFinished = async (playlistId: string, videoId: string) => {
    try {
      const response = await fetch(`/api/user-playlist-progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlistId, videoId, user: user!._id }),
      });

      if (!response.ok) throw new Error("Failed to mark video as finished");

      setFinishedVideos((prev) => [...prev, videoId]);
      toast.success("Video marked as finished");
    } catch (error) {
      console.error("Error marking video as finished:", error);
      toast.error("Failed to mark video as finished");
    }
  };

  if (!user) return null;

  return (
    <main className="">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Your Learning Playlists
      </h1>
      <div className="p-4">
        <PlaylistsAccordion
          playlists={userLearning.map((learningObj) => learningObj.playlist)}
          finishedVideos={finishedVideos}
          onClickMarkVideoAsFinished={markVideoAsFinished}
        />
      </div>
    </main>
  );
};

export default LearningDashboard;
