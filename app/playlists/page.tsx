"use client";
import PlaylistsAccordion from "@/components/PlaylitsAccordion";
import { usePlaylists } from "@/hooks/usePlaylists";
import React from "react";

const PlaylistsPage = () => {
  const { error, isLoading, playlists } = usePlaylists();
  if (isLoading) {
    return <div>Loading Playlists..</div>;
  }
  if (error) {
    return <div>Error loading playlists: {error.message}</div>;
  }
  return (
    <section className="container mx-auto py-2">
      <div>{playlists && <PlaylistsAccordion playlists={playlists} />}</div>
    </section>
  );
};

export default PlaylistsPage;
