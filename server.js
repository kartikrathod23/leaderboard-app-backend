const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
// Allow CORS from local frontend and Vercel frontend
app.use(cors({
  origin: [
    'http://localhost:5173', // local dev
    'https://leaderboard-app-frontend.vercel.app' // replace with your actual Vercel frontend URL
  ],
  credentials: true
}));
app.use(express.json());

// API routes
app.use('/api', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
