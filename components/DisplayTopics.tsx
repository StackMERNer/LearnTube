"use client";
import React, { useEffect, useState } from "react";

interface Topic {
  _id: string;
  title: string;
  playlists: string[]; // Array of playlist IDs
}

interface Playlist {
  _id: string;
  title: string;
}

const DisplayTopics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  // Fetch topics and playlists on mount
  useEffect(() => {
    const fetchData = async () => {
      const topicsResponse = await fetch("/api/topics");
      const topicsData = await topicsResponse.json();
      setTopics(topicsData);

      const playlistsResponse = await fetch("/api/playlists");
      const playlistsData = await playlistsResponse.json();
      setPlaylists(playlistsData);
    };

    fetchData();
  }, []);

  // Add selected playlist to a topic
  const handleAddPlaylist = async (topicId: string) => {
    // if (!selectedPlaylist) return;

    const response = await fetch(`/api/playlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playlistUrl:
          "https://www.youtube.com/watch?v=crfH_JuC2lI&list=PLgGbWId6zgaU8BM9JYUmyMO2I0TUcUCc_&ab_channel=EnvatoTuts%2B",
        topicId,
      }),
    });

    if (response.ok) {
      const updatedTopic = await response.json();
      console.log(updatedTopic);
      //   setTopics((prevTopics) =>
      //     prevTopics.map((topic) =>
      //       topic._id === topicId ? updatedTopic : topic
      //     )
      //   );
      setSelectedPlaylist(null);
    } else {
      alert("Error adding playlist to topic");
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
              {topic.playlists.map((playlistId) => {
                const playlist = playlists.find((pl) => pl._id === playlistId);
                return (
                  <li key={playlistId}>
                    {playlist ? playlist.title : "Unknown Playlist"}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Playlist selection form */}
          <div className="flex items-center mt-4">
            <select
              className="select select-bordered w-full max-w-xs"
              value={selectedPlaylist || ""}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
            >
              <option value="" disabled>
                Select a playlist to add
              </option>
              {playlists.map((playlist) => (
                <option key={playlist._id} value={playlist._id}>
                  {playlist.title}
                </option>
              ))}
            </select>
            <button
              className="btn btn-primary ml-2"
              onClick={() => handleAddPlaylist(topic._id)}
              //   disabled={!selectedPlaylist}
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
