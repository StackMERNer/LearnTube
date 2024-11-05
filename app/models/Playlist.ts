import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  playlistId: { type: String, required: true }, // YouTube Playlist ID
  videos: [{ type: String }] // Array of video IDs
});

export default mongoose.models.Playlist || mongoose.model('Playlist', PlaylistSchema);
