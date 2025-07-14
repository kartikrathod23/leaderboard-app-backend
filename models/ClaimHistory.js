// ClaimHistory.js - Mongoose schema for tracking each claim event
const mongoose = require('mongoose');

// Each claim history record logs which user claimed, how many points, and when
const claimHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically set to now
  },
});

module.exports = mongoose.model('ClaimHistory', claimHistorySchema); 