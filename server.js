const express = require('express');
require('dotenv').config();

const port = process.env.PORT || 5000;
const server = express();

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Initialization
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});