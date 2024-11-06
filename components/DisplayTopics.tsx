"use client";

import { useTopics } from "@/hooks/useTopics";
import Link from "next/link";

const DisplayTopics = () => {
  const { topics, error, isLoading } = useTopics();
  if (isLoading) {
    return <div>Loading Topics..</div>;
  }
  if (error) {
    return <div>Error fetching topics: {error.message}</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Topics</h2>
      {topics?.map((topic) => (
        <div
          key={topic._id}
          className="mb-4 p-4 border border-gray-200 rounded-md"
        >
          <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
          <Link href={`topics/${topic._id}`}>
            <button className="btn btn-primary">View</button>
          </Link>

          {/* Display associated playlists */}
          {/* <div className="mb-2">
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
          </div> */}

          {/* Playlist input field and button */}
          {/* <div className="grid grid-cols-[5fr,1fr] mt-4">
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
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default DisplayTopics;
