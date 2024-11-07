"use client";

import { IPlaylist } from "@/app/models/Playlist";
import { ILearningInfo } from "@/app/models/UserLearning";
import useUserStore from "@/stores/useUserStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LearningDashboard = () => {
  const { user } = useUserStore();
  const [userLearning, setUserLearning] = useState<
    { learningInfo: ILearningInfo; playlist: IPlaylist }[]
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
    <main className="p-5 mt-12">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Your Learning Playlists
      </h1>
      <div className="shadow rounded-lg p-4">
        <Accordion type="single" collapsible>
          {userLearning.map((learningObj) => (
            <AccordionItem key={learningObj.playlist.playlistId} value={learningObj.playlist.playlistId}>
              <AccordionTrigger className="text-xl font-medium flex items-center space-x-4">
                <Image
                  height={60}
                  width={60}
                  src={learningObj.playlist.thumbnail}
                  alt={learningObj.playlist.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <span>{learningObj.playlist.title}</span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 mb-4">
                  {learningObj.playlist.description}
                </p>
                <ul className="space-y-2">
                  {learningObj.playlist.videos.map((video) => (
                    <li
                      key={video.videoId}
                      className="flex items-center space-x-4 cursor-pointer"
                    >
                      {/* <Image
                        height={60}
                        width={60}
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-12 h-12 object-cover rounded"
                      /> */}
                      <div
                        onClick={() =>
                          window.open(
                            `https://www.youtube.com/watch?v=${video.videoId}`,
                            "_blank"
                          )
                        }
                        className="flex-1 hover:bg-gray-200 p-2 rounded"
                      >
                        <p className="text-md font-semibold">{video.title}</p>
                        {/* <p className="text-sm text-gray-500">
                          Position: {video.position}
                        </p> */}
                      </div>
                      <div className="min-w-[30px]">
                        {finishedVideos.includes(video.videoId) ? (
                          <button>
                            <FaCheckCircle
                              size={25}
                              className="text-green-400"
                            />
                          </button>
                        ) : (
                          <div
                            onClick={() =>
                              markVideoAsFinished(
                                learningObj.playlist.playlistId,
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
                              Mark Finished
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
};

export default LearningDashboard;
