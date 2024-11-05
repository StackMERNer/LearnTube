"use client";
import { IPlaylist } from "@/app/models/Playlist";
import useUserStore from "@/stores/useUserStore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LearningDashboard = () => {
  const { user } = useUserStore();
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const topicsResponse = await fetch(
          `/api/users/${user._id}/learning-playlists`
        );
        if (!topicsResponse.ok) throw new Error("Failed to fetch topics");
        const playlists = await topicsResponse.json();
        console.log("xx", playlists);
        setPlaylists(playlists);
      } catch (error) {
        console.error("Error fetching topics:", error);
        toast.error("Failed to load topics");
      }
    };

    fetchData();
  }, [user]);
  if (!user) {
    return null;
  }
  return <main className="shadow rounded-lg p-5">Learnings..</main>;
};

export default LearningDashboard;
