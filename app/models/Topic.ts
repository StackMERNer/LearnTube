import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }]
});

export default mongoose.models.Topic || mongoose.model('Topic', TopicSchema);
