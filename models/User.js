// User.js - Mongoose schema for user accounts in the leaderboard
const mongoose = require('mongoose');

// Each user has a name, total points, and optional profile picture
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  points: {
    type: Number,
    default: 0, // Users start with 0 points
  },
  profilePic: {
    type: String, // Optional: URL to user's profile picture
  },
});

module.exports = mongoose.model('User', userSchema); 