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
  // const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const { user } = useUserStore();
  const [targetTopicId,setTargetTopicId] = useState<string | null>(null);

  // Fetch topics and playlists on mount
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

  // Add selected playlist to a topic
  const handleAddPlaylist = async (topicId: string) => {
    if (!user) {
      toast.error("Please sign in first");
      return;
    }
    try {
      const response = await fetch(`/api/playlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playlistUrl:
            "https://www.youtube.com/watch?v=crfH_JuC2lI&list=PLgGbWId6zgaU8BM9JYUmyMO2I0TUcUCc_&ab_channel=EnvatoTuts%2B",
          topicId,
          user: user._id,
        }),
      });

      if (!response.ok) throw new Error("Error adding playlist to topic");

      const updatedTopic = await response.json();
      setTopics((prevTopics) =>
        prevTopics.map((topic) =>
          topic._id === topicId ? { ...topic, ...updatedTopic } : topic
        )
      );
      setSelectedPlaylist(null);
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
              {topic.playlists.map((playlist, idx) => {
                return (
                  <li key={idx}>
                    {playlist ? playlist.title : "Unknown Playlist"}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Playlist selection form */}
          <div className="flex items-center mt-4">
            
            <button
              className="btn btn-primary ml-2"
              onClick={() => handleAddPlaylist(topic._id)}
              disabled={!selectedPlaylist}
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
