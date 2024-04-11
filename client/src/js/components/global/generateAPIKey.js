function generateAPIKey() {
  const keyExists = localStorage.getItem('APIKey');

  if(keyExists && keyExists.length === 64 && keyExists.startsWith('a')) {
    return keyExists;
  };
  
  const allowedChars = 'abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ0123456789'; // Uppercase or lowercase "o" not allowed
  let APIKey = 'a';

  for(let i = 0; i < 63; i++) {
    APIKey += allowedChars[Math.floor(Math.random() * allowedChars.length)];
  };

  localStorage.setItem('APIKey', APIKey);
  return APIKey;
};

export default generateAPIKey;