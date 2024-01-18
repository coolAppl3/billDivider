const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const ValidateUser = require('../util/ValidateUser');

// Util
const generateLoginToken = require('../util/generateLoginToken');
const generateSessionID = require('../util/generateSessionID');

// ---

const router = express.Router();

// Sign in
router.post('/login', async (req, res) => {
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

  // Ensuring both the username and password are valid.
  const validateUser = new ValidateUser();

  const isValidUsername = validateUser.validateUsername(username); // returns true if it is
  const isValidPassword = validateUser.validatePassword(password); // returns true if it is

  if(!isValidUsername || !isValidPassword) {
    res.status(401).json({ success: false, message: 'Invalid username or password.' });
    return ;
  };


  // Checking if the username is taken
  const usernameExists = await User.findOne({ username: username });
  if(usernameExists) {
    res.status(409).json({ success: false, message: 'Username already taken'});
    return ;
  };

  // Validation - only letters and numbers are allowed
  const allowedUsernameChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  for(let char of username) {
    if(allowedUsernameChars.indexOf(char) === -1) {
      res.status(406).json({ success: false, message: 'Invalid username. Username can only contain letters and numbers' });
      return ;
    };
  };

  // Continuing...
  const user = new User({
    username,
    password: hash,
    loginToken: await generateLoginToken(),
  });

  try {
    const newUser = await user.save(user);
    res.json({ success: true, data: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// Add session
router.post('/newSession', async (req, res) => {
  const user = await User.findOne({ loginToken: req.get('loginToken') });
  if(!user) {
    res.status(403).json({ success: false, message: 'Invalid login token. Please login' });
    return ;
  };

  const newSession = req.body;
  let newSessionID;
  let index = 0;
  while(index < 1) {
    newSessionID = generateSessionID();

    if(user.history.find(({ sessionID }) => sessionID === newSessionID) === undefined) {
      newSession.sessionID = newSessionID;
      index++;
    };
  };

  user.history.push(newSession);

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        history: user.history,
      },
    },
    {
      new: true,
    }
  );

  try {
    res.json({ success: true, data: newSession });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

// Delete session
router.delete('/delete-session/:sessionID', async (req, res) => {
  const user = await User.findOne({ loginToken: req.get('loginToken') });
  if(!user) {
    res.status(403).json({ success: false, message: 'Invalid login token. Please login' });
    return ;
  };

  user.history = user.history.filter((session) => session.sessionID !== req.params.sessionID);
  
  const updatedHistory = await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        history: user.history,
      },
    },
    {
      new: true,
    }
  );

  try {
    res.json({ success: true, data: updatedHistory });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

// Retrieve user sessions
router.post('/history', async (req, res) => {
  const loginToken = req.body.loginToken;

  const user = await User.findOne({ loginToken: loginToken });
  if(!user) {
    res.status(404).json({ success: false, message: 'Invalid login' });
    return ;
  };

  userHistory = user.history;
  
  try {
    res.json({ success: true, data: userHistory });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

// Get single session
router.get('/session/:sessionID', async (req, res) => {
  const loginToken = req.get('loginToken');
  const requestedSessionID = req.params.sessionID;

  const user = await User.findOne({ loginToken: loginToken });
  if(!user) {
    res.status(403).json({ success: false, message: 'Invalid login token. Please log in.' });
    return ;
  };

  const userSessions = user.history;
  const requestedSession = userSessions.find(({ sessionID }) => sessionID === requestedSessionID);

  if(!requestedSession) {
    res.status(404).json({ success: false, message: 'Session not found' });
    return ;
  };

  try {
    res.json({ success: true, data: requestedSession });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

// Retrieve username
router.post('/username', async (req, res) => {
  const loginToken = req.body.loginToken;

  const user = await User.findOne({ loginToken: loginToken });
  if(!user) {
    res.status(404).json({ success: false, message: 'Invalid login' });
    return ;
  };

  username = user.username;
  
  try {
    res.json({ success: true, data: username });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

module.exports = router;