function generateBillID() {
  const allowedChars = 'abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ0123456789'; // Letter "o" not allowed
  let billID = '';

  for(let i = 0; i < 10; i++) {
    billID += allowedChars[Math.floor(Math.random() * allowedChars.length)];
  };

  return billID;
  
};

export default generateBillID;