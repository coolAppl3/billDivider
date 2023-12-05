const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateLoginToken = require('../util/generateLoginToken');

// ---

const router = express.Router();

// Sign in
router.get('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });
  if(!user) {
    res.status(404).json({ success: false, message: 'Username does not exist' });
    return ;
  };

  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  if(!passwordIsCorrect) {
    res.status(401).json({ success: false, message: 'Incorrect password' });
    return ;
  };

  try {
    res.json({ success: true, token: user.loginToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// Sign up
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  // Checking if the username is taken
  const usernameExists = await User.findOne({ username: username });

  if(usernameExists) {
    res.status(409).json({ success: false, message: 'Username already taken'});
    return ;
  };
  

  // Continuing since the username is not taken
  const user = new User({
    username,
    password: hash,
    loginToken: generateLoginToken(32),
  });

  try {
    const newUser = await user.save(user);
    res.json({ success: true, data: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

module.exports = router;