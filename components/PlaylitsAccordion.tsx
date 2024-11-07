"use client";

import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillCameraVideoFill } from "react-icons/bs";
import clsx from "clsx";
import { MdOpenInNew } from "react-icons/md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Playlist } from "@/types/playlist";
import { useState } from "react";
import YouTubePlayer from "./YouTubePlayer";

type PlaylistsAccordionProps = {
  finishedVideos?: string[];
  playlists: Playlist[];
  onClickMarkVideoAsFinished?: (playlistId: string, videoId: string) => void;
};

const PlaylistsAccordion = ({
  finishedVideos,
  onClickMarkVideoAsFinished,
  playlists,
}: PlaylistsAccordionProps) => {
  const [videoId, setVideoId] = useState<string>("");
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-2 justify-center py-3">
      {videoId && <div
        onClick={() => setOpen(!open)}
        className={clsx("cursor-pointer", {
          "fixed right-1 top-30 border rounded-full shadow-lg p-2 z-20": videoId,
        })}
      >
        <MdOpenInNew size={30} />
      </div>}
      {videoId && <YouTubePlayer videoId={videoId} />}
      <div
        className={clsx("flex gap-2 flex-col", {
          "fixed bg-white max-h-[94vh] overflow-y-scroll right-0 max-w-[50%]  rounded-b py-3 pl-3":
            videoId,
          "translate-x-[100%]": !open && videoId,
        })}
      >
        <Accordion type="single" collapsible>
            {playlists.map((playlist) => (
              <AccordionItem
                key={playlist.playlistId}
                value={playlist.playlistId}
                className={clsx("border px-2 rounded-lg w-full p-3")}
              >
                <AccordionTrigger className="text-xl font-medium flex items-center space-x-4">
                  <Image
                    height={60}
                    width={60}
                    src={playlist.thumbnail}
                    alt={playlist.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  {/* Aligning the title to the left */}
                  <span className="text-left w-full">{playlist.title}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 mb-4">{playlist.description}</p>
                  <ul className="space-y-2">
                    {playlist.videos.map((video) => (
                      <li
                        onClick={() => setVideoId(video.videoId)}
                        key={video.videoId}
                        className="flex items-center space-x-4 cursor-pointer"
                      >
                        <BsFillCameraVideoFill size={18} />
                        <div
                          //   onClick={() =>
                          //     window.open(
                          //       `https://www.youtube.com/watch?v=${video.videoId}`,
                          //       "_blank"
                          //     )
                          //   }
                          className="flex-1 hover:bg-gray-200 p-2 rounded"
                        >
                          <p className="text-md font-semibold">{video.title}</p>
                        </div>
                        {onClickMarkVideoAsFinished && (
                          <div className="min-w-[30px]">
                            {finishedVideos?.includes(video.videoId) ? (
                              <button>
                                <FaCheckCircle
                                  size={25}
                                  className="text-green-400"
                                />
                              </button>
                            ) : (
                              <div
                                onClick={() =>
                                  onClickMarkVideoAsFinished(
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
                                  Mark Finished
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
      </div>
    </div>
  );
};

export default PlaylistsAccordion;
