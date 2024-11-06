"use client";
import { IPlaylist } from "@/app/models/Playlist";
import useUserStore from "@/stores/useUserStore";
import Image from "next/image";
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
        setPlaylists(playlists);
      } catch (error) {
        console.error("Error fetching topics:", error);
        toast.error("Failed to load topics");
      }
    };

    fetchData();
  }, [user]);

  if (!user) return null;

  return (
    <main className="p-5 mt-12">
      <h1 className="text-2xl font-bold mb-6">Your Learning Playlists</h1>
      <div className="w-full shadow  rounded-lg">
        {playlists.map((playlist) => (
          <div
            key={playlist.playlistId}
            className="collapse collapse-arrow join-item border-base-300 border-b"
          >
            <input
              type="radio"
              name="playlist-accordion" // Ensures only one playlist opens at a time
            />
            <div className="collapse-title text-xl font-medium flex items-center space-x-4 cursor-pointer">
              <Image
                height={60}
                width={60}
                src={playlist.thumbnail}
                alt={playlist.title}
                className="w-16 h-16 object-cover rounded"
              />
              <span>{playlist.title}</span>
            </div>
            <div className="collapse-content px-4 py-2">
              <p className="text-gray-600 mb-4">{playlist.description}</p>
              <ul className="space-y-2">
                {playlist.videos.map((video) => (
                  <li
                    key={video.videoId}
                    className="flex items-center space-x-4"
                  >
                    <Image
                      height={60}
                      width={60}
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-md font-semibold">{video.title}</p>
                      <p className="text-sm text-gray-500">
                        Position: {video.position}
                      </p>
                    </div>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() =>
                        window.open(
                          `https://www.youtube.com/watch?v=${video.videoId}`,
                          "_blank"
                        )
                      }
                    >
                      Watch
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default LearningDashboard;
