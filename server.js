const path = require('path');
const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');

// Connecting to database
connectDB();

// ---

const port = process.env.PORT || 5000;
const server = express();

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// CORS
// const cors = require('cors');
// if(process.env.NODE_ENV !== 'production') {
//   const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'http://46.240.183.31:3000', '46.240.183.31:3000', 'http://46.240.183.31:5000', '46.240.183.31:5000'];
  
//   server.use(
//     cors({
//       origin: whitelist,
//       credentials: true,
//     })
//   );

// };

// Static Files
server.use(express.static(path.join(__dirname, 'public')));

// Importing Routers
const userRouter = require('./routes/users');

// routes
server.use('/api/users', userRouter);

// ---

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