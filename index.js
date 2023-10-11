const express = require('express');
const connectDB = require('./config/connection'); // Import the database connection function
const routes = require('./routes/userRoutes.js');
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mounting API routes
app.use('/api', routes);

// Establish the database connection
connectDB()
  .then(() => {
    // Start the server after the database connection is established
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error: ', err);
  });