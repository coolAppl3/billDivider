const path = require('path');
const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const rateLimiter = require('./middleware/rateLimiter');
const userRouter = require('./routes/users');

// cron-jobs
const removeUnverifiedUsers = require('./cron-jobs/removeUnverifiedUsers');
const updateLimitTrackers = require('./cron-jobs/updateLimitTrackers');

// Connecting to database
connectDB();

// ---

const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
const cors = require('cors');
if(process.env.NODE_ENV !== 'production') {
  const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'http://46.240.183.31:3000', '46.240.183.31:3000', 'http://46.240.183.31:5000', '46.240.183.31:5000'];
  
  app.use(
    cors({
      origin: whitelist,
      credentials: true,
    })
  );
};

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Rate limiting
app.use(rateLimiter);

// Routes
app.use('/api/users', userRouter);

// Initialization
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Starting cron jobs
removeUnverifiedUsers();
updateLimitTrackers();