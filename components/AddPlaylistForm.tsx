import React, { useState } from "react";

const AddPlaylistForm = ({ topicId }: { topicId: string }) => {
  const [playlistUrl, setPlaylistUrl] = useState("");

  const handleAddPlaylist = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/addPlaylist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlistUrl, topicId }),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to add playlist");
      console.log("Playlist added successfully:", result);
    } catch (error:any) {
      console.error("Error adding playlist:", error);
      alert(error.message || "Failed to add playlist");
    }
  };

  return (
    <form onSubmit={handleAddPlaylist}>
      <input
        type="url"
        placeholder="Enter YouTube Playlist URL"
        value={playlistUrl}
        onChange={(e) => setPlaylistUrl(e.target.value)}
        required
        className="input input-bordered"
      />
      <button type="submit" className="btn btn-primary mt-2">
        Add Playlist
      </button>
    </form>
  );
};

export default AddPlaylistForm;
