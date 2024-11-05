"use client";
import { IPlaylist } from "@/app/models/Playlist";
import useUserStore from "@/stores/useUserStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Topic {
  _id: string;
  title: string;
  playlists: IPlaylist[];
}

const DisplayTopics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [playlistUrl, setPlaylistUrl] = useState<string>(""); // State for input field
  const { user } = useUserStore();
  // const [targetTopicId, setTargetTopicId] = useState<string | null>(null);

  // Fetch topics on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const topicsResponse = await fetch("/api/topics");
        if (!topicsResponse.ok) throw new Error("Failed to fetch topics");
        const topicsData = await topicsResponse.json();
        console.log("topicsData", topicsData);
        setTopics(topicsData);
      } catch (error) {
        console.error("Error fetching topics:", error);
        toast.error("Failed to load topics");
      }
    };

    fetchData();
  }, []);

  // Add playlist to a topic
  const handleAddPlaylist = async (topicId: string) => {
    if (!user) {
      toast.error("Please sign in first");
      return;
    }
    if (!playlistUrl) {
      toast.error("Please enter a playlist URL");
      return;
    }

    try {
      const response = await fetch(`/api/playlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playlistUrl,
          topicId,
          user: user._id,
        }),
      });

      if (!response.ok) throw new Error("Error adding playlist to topic");

      const res = await response.json();
      console.log("updatedTopic", res);
      if (res.data) {
        setTopics((prevTopics) =>
          prevTopics.map((topic) =>
            topic._id === topicId
              ? { ...topic, playlists: [...topic.playlists, res.data] }
              : topic
          )
        );
      }

      setPlaylistUrl(""); // Clear input field after adding
      toast.success("Playlist added successfully!");
    } catch (error) {
      console.error("Error adding playlist:", error);
      toast.error("Error adding playlist to topic");
    }
  };
  // Handle "Start Learning" button click
  const handleStartLearning = async (playlistId: string) => {
    if (!user) {
      toast.error("Please sign in first");
      return;
    }

    try {
      const response = await fetch(`/api/users/${user._id}/learning-playlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          playlistId,
        }),
      });

      console.log('response',response)

      if (!response.ok) throw new Error("Error starting to learn");

      const res = await response.json();
      toast.success("Started learning this playlist!");
      console.log("Start Learning Response:", res);
    } catch (error) {
      console.error("Error starting learning:", error);
      toast.error("Error starting to learn this playlist");
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Topics</h2>
      {topics.map((topic) => (
        <div
          key={topic._id}
          className="mb-4 p-4 border border-gray-200 rounded-md"
        >
          <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>

          {/* Display associated playlists */}
          <div className="mb-2">
            <strong>Playlists:</strong>
            <div className="flex flex-col gap-2">
              {topic.playlists.map((playlist, idx) => (
                <div key={idx}>
                  <div className="grid grid-cols-[1fr,4fr,1fr] items-center gap-2">
                    <Image
                      src={playlist.thumbnail}
                      height={100}
                      width={100}
                      alt="playlist thumbnail"
                      className="h-auto w-auto"
                    />
                    <h1>{playlist ? playlist.title : "Unknown Playlist"}</h1>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleStartLearning(playlist.playlistId)}
                    >
                      Start Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Playlist input field and button */}
          <div className="flex items-center mt-4">
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              placeholder="Enter Playlist URL"
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
            />
            <button
              className="btn btn-primary ml-2"
              onClick={() => handleAddPlaylist(topic._id)}
            >
              Add Playlist
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayTopics;
