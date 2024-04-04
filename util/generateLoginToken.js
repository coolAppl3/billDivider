const User = require('../models/User');

async function generateLoginToken() {
  const allowedChars = 'abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ0123456789'; // Uppercase or lowercase "o" not allowed
  let token = '';

  for(let i = 0; i < 32; i++) {
    token += allowedChars[Math.floor(Math.random() * allowedChars.length)];
  };

  tokenExists = await User.findOne({ loginToken: token });
  if(tokenExists) {
    return await generateLoginToken();
  };

  return token;
};

module.exports = generateLoginToken;