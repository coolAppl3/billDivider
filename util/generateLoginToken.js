function generateLoginToken(length) {
  const allowedChars = 'abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ0123456789'; // Letter "o" not allowed
  let token = '';

  for(let i = 0; i < length; i++) {
    token += allowedChars[Math.floor(Math.random() * (allowedChars.length + 1))];
  };

  return token;
};

module.exports = generateLoginToken;