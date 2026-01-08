const mongoose = require('mongoose');

const businessProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  shopName: {
    type: String,
    required: true,
    trim: true
  },
  vendorType: {
    type: String,
    enum: ['kirana', 'clothing', 'rural'],
    required: true
  },
  preferredLanguage: {
    type: String,
    enum: ['ta', 'en', 'hi'],
    default: 'en'
  },
  themeColor: {
    type: String,
    default: '#3B82F6'
  },
  logoUrl: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  phoneNumber: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
businessProfileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('BusinessProfile', businessProfileSchema);