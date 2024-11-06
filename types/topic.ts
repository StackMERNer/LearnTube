import { IPlaylist } from "@/app/models/Playlist";

export interface Topic {
  _id: string;
  user: string;
  description?: string;
  title: string;
  //   playlists: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TopicWithPlaylists extends Topic {
  playlists: IPlaylist[];
}
