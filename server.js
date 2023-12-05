const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');

// Connecting to database
connectDB();

// Importing routes
const userRouter = require('./routes/user');

// Setting environment
process.env.NODE_ENV = 'development';

const port = process.env.PORT || 5000;
const server = express();

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: false }));


// Users path
server.use('/api/users', userRouter);

// Homepage path
server.use('/', (req, res) => {
  res.json({ success: true, message: 'Homepage' });
});

// Default path
server.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Invalid path' });
});


// Initialization
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});