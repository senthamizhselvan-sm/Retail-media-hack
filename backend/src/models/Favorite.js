const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
  },
  type: {
    type: String,
    enum: ['generated', 'edited'],
    default: 'generated',
  },
  metadata: {
    style: String,
    size: String,
    editType: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Favorite', favoriteSchema);
