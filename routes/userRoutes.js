// userRoutes.js - Express routes for user and claim operations
const express = require('express');
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

const router = express.Router();

// GET /users - Fetch all users, sorted by points descending (for leaderboard)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST /users - Add a new user to the database
router.post('/users', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const user = new User({ name });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// POST /claim - Award random points to a user and log the claim in history
router.post('/claim', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId is required' });
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    // Generate random points between 1 and 10
    const points = Math.floor(Math.random() * 10) + 1;
    // Update user's total points
    user.points += points;
    await user.save();
    // Log this claim in the ClaimHistory collection
    const history = new ClaimHistory({
      userId: user._id,
      userName: user.name,
      points,
    });
    await history.save();
    // Return updated leaderboard and awarded points
    const users = await User.find().sort({ points: -1 });
    res.json({ awardedPoints: points, user, leaderboard: users });
  } catch (err) {
    res.status(500).json({ error: 'Failed to claim points' });
  }
});

// GET /history - Fetch all claim history records, sorted by latest
router.get('/history', async (req, res) => {
  try {
    const history = await ClaimHistory.find().sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router; 