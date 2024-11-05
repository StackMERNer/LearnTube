"use client";
import { IPlaylist } from "@/app/models/Playlist";
import useUserStore from "@/stores/useUserStore";
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
            <ul className="list-disc list-inside">
              {topic.playlists.map((playlist, idx) => (
                <li key={idx}>
                  {playlist ? playlist.title : "Unknown Playlist"}
                </li>
              ))}
            </ul>
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
