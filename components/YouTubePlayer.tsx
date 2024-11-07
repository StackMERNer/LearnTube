// YouTubePlayer.tsx
"use client";

import React from "react";

type YouTubePlayerProps = {
  videoId: string;
  title?: string;
  width?: string;
  height?: string;
};

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  title = "YouTube Video Player",
  width = "100%",
  height = "500px",
}) => {
  if (!videoId) {
    return <p>No video selected</p>;
  }

  return (
    <div className="youtube-player-container" style={{ width, height }}>
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="rounded-lg shadow-md"
      />
    </div>
  );
};

export default YouTubePlayer;
