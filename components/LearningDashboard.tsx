"use client";
import { IPlaylist } from "@/app/models/Playlist";
import useUserStore from "@/stores/useUserStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";

const LearningDashboard = () => {
  const { user } = useUserStore();
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [finishedVideos, setFinishedVideos] = useState<string[]>([]);

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

        // Fetch finished videos for each playlist
        const finishedVideosResponse = await fetch(
          `/api/user-playlist-progress?user=${user._id}`
        );
        if (!finishedVideosResponse.ok)
          throw new Error("Failed to fetch finished videos");
        const finishedVideosData = await finishedVideosResponse.json();
        console.log("finishedVideosData", finishedVideosData);
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

      // Update the local state to show the video as finished
      setFinishedVideos((prev) => [...prev, videoId]);
      toast.success("Video marked as finished");
    } catch (error) {
      console.error("Error marking video as finished:", error);
      toast.error("Failed to mark video as finished");
    }
  };

  if (!user) return null;

  return (
    <main className="p-5 mt-12">
      <h1 className="text-2xl font-bold mb-6">Your Learning Playlists</h1>
      <div className="w-full shadow rounded-lg">
        {playlists.map((playlist) => (
          <div
            key={playlist.playlistId}
            className="collapse collapse-arrow join-item border-base-300 border-b"
          >
            <input type="radio" name="playlist-accordion" />
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
                    className="flex items-center space-x-4 cursor-pointer"
                  >
                    <Image
                      height={60}
                      width={60}
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div
                      onClick={() =>
                        window.open(
                          `https://www.youtube.com/watch?v=${video.videoId}`,
                          "_blank"
                        )
                      }
                      className="flex-1"
                    >
                      <p className="text-md font-semibold">{video.title}</p>
                      <p className="text-sm text-gray-500">
                        Position: {video.position}
                      </p>
                    </div>
                    <div className="min-w-[30px]">
                      {finishedVideos.includes(video.videoId) ? (
                        <button>
                          <FaCheckCircle size={25} className="text-green-400" />
                        </button>
                      ) : (
                        <div
                          onClick={() =>
                            markVideoAsFinished(
                              playlist.playlistId,
                              video.videoId
                            )
                          }
                          className="group"
                        >
                          <FaCheckCircle
                            className="group-hover:hidden"
                            size={25}
                          />
                          <button className="hidden group-hover:inline-block btn btn-primary text-white">
                            mark Finished
                          </button>
                        </div>
                      )}
                    </div>
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
