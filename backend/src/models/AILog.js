const mongoose = require('mongoose');

const aiLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  action: {
    type: String,
    enum: ['generate', 'edit'],
    required: true,
  },
  prompt: {
    type: String,
  },
  apiUsed: {
    type: String,
    enum: ['gemini', 'canva', 'placeholder', 'dalle', 'stable-diffusion', 'imagen', 'fallback'],
  },
  success: {
    type: Boolean,
    default: true,
  },
  errorMessage: {
    type: String,
  },
  metadata: {
    style: String,
    size: String,
    outputCount: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('AILog', aiLogSchema);
