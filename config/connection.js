const mongoose = require('mongoose');

// MongoDB URI
const MONGODB_URI = 'mongodb://127.0.0.1:27017/social-network';

// Create a new mongoose connection with updated options
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error: ', err);
  }
};

module.exports = connectDB;
