function generateSessionID() {
  const allowedChars = 'abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ0123456789'; // Uppercase or lowercase letter "o" not allowed
  let id = '';

  for(let i = 0; i < 16; i++) {
    id += allowedChars[Math.floor(Math.random() * allowedChars.length)];
  };

  return id;
};

module.exports = generateSessionID;