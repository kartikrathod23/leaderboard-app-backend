// seed.js - Script to populate the database with initial users
const mongoose = require('mongoose');
const User = require('./models/User');

// List of initial users to seed the database
const initialUsers = [
  { name: 'Rahul' },
  { name: 'Kamal' },
  { name: 'Sanak' },
  { name: 'Priya' },
  { name: 'Amit' },
  { name: 'Neha' },
  { name: 'Vikas' },
  { name: 'Simran' },
  { name: 'Rohit' },
  { name: 'Anjali' },
];

// Connect to MongoDB and insert users
mongoose.connect('mongodb://localhost:27017/leaderboard', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    // Remove all existing users before seeding
    await User.deleteMany({});
    // Insert initial users
    await User.insertMany(initialUsers);
    console.log('Database seeded with initial users!');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Seeding error:', err);
    mongoose.disconnect();
  }); 