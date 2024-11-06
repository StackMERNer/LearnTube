"use client";
import { useTopic } from "@/hooks/useTopic";
import useUserStore from "@/stores/useUserStore";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const TopicPage = ({
  params: { topicId },
}: {
  params: { topicId: string };
}) => {
  const { topic, isLoading, error } = useTopic(topicId);
  const { user } = useUserStore();
  const [playlistUrl, setPlaylistUrl] = useState<string>("");
  if (isLoading) {
    return <div>loading topic..</div>;
  }
  if (error) {
    return <div>Error loading topic: {error.message}</div>;
  }
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
        // setTopics((prevTopics) =>
        //   prevTopics.map((topic) =>
        //     topic._id === topicId
        //       ? { ...topic, playlists: [...topic.playlists, res.data] }
        //       : topic
        //   )
        // );
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
      const response = await fetch(
        // `/api/users/${user._id}/learning-playlists`,
        `/api/users/${user._id}/learnings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            playlistId,
            status: "Learning",
          }),
        }
      );
      if (!response.ok) throw new Error("Error starting to learn");
      // setUser({
      //   ...user,
      //   learningPlaylists: [...user.learningPlaylists, playlistId],
      // } as IUser);
      console.log(response.json());
      toast.success("Started learning this playlist!");
    } catch (error) {
      console.error("Error starting learning:", error);
      toast.error("Error starting to learn this playlist");
    }
  };

  if (!topic) {
    return null;
  }
  return (
    <section className="py-8 p-4 border border-gray-200 rounded-md container mx-auto">
      <h3 className="text-xl font-semibold">{topic.title}</h3>

      {/* Display associated playlists */}
      <div className="">
        <strong>Playlists:</strong>
        <div className="flex flex-col gap-2">
          {topic?.playlists.map((playlist, idx) => (
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
      <div className="grid grid-cols-[5fr,1fr] mt-4">
        <input
          type="text"
          className="input input-bordered w-full"
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
    </section>
  );
};

export default TopicPage;
