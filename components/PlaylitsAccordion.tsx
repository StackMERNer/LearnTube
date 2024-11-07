"use client";

import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillCameraVideoFill } from "react-icons/bs";
import clsx from "clsx";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Playlist } from "@/types/playlist";

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
  return (
    <Accordion type="single" collapsible className="flex gap-2 flex-col">
      {playlists.map((playlist) => (
        <AccordionItem
          key={playlist.playlistId}
          value={playlist.playlistId}
          className={clsx("border px-2 rounded-lg w-full")}
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
                  key={video.videoId}
                  className="flex items-center space-x-4 cursor-pointer"
                >
                  <BsFillCameraVideoFill size={18} />
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
                  </div>
                  {onClickMarkVideoAsFinished && (
                    <div className="min-w-[30px]">
                      {finishedVideos?.includes(video.videoId) ? (
                        <button>
                          <FaCheckCircle size={25} className="text-green-400" />
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
  );
};

export default PlaylistsAccordion;
