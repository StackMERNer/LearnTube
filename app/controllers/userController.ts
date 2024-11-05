import User from "@/app/models/User";

// Function to add a playlist ID to the user's current playlists
export const addToCurrentPlaylists = async (userId: string, playlistId: string) => {
  console.log('userid',userId,playlistId)
  return await User.findByIdAndUpdate(
    userId,
    { $addToSet: { learningPlaylists: playlistId } }, // Add the playlist ID if it doesn't already exist
    { new: true }
  );
};

// Function to remove a playlist ID from the user's current playlists
export const removeFromCurrentPlaylists = async (userId: string, playlistId: string) => {
  return await User.findByIdAndUpdate(
    userId,
    { $pull: { learningPlaylists: playlistId } }, // Remove the playlist ID
    { new: true }
  );
};
