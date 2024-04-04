function generateEmailVerificationCode() {
  const allowedChars = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789'; // Letter "o" and number 0 not allowed
  let verificationCode = '';

  for(let i = 0; i < 6; i++) {
    verificationCode += allowedChars[Math.floor(Math.random() * allowedChars.length)];
  };

  return verificationCode;
};

module.exports = generateEmailVerificationCode;