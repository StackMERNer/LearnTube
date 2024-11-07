"use client";
import { usePlaylists } from "@/hooks/usePlaylists";
import React from "react";

const PlaylistsPage = () => {
  const { error, isLoading, playlists } = usePlaylists();
  console.log("playlists", playlists);
  if (isLoading) {
    return <div>Loading Playlists..</div>;
  }
  if (error) {
    return <div>Error loading playlists: {error.message}</div>;
  }
  return <section className="container mx-auto py-2">playlists..</section>;
};

export default PlaylistsPage;
