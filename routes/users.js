const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const ValidateUser = require('../util/ValidateUser');

// Util
const generateLoginToken = require('../util/generateLoginToken');
const generateSessionID = require('../util/generateSessionID');

// ---
const router = express.Router();



// Account --- --- ---

// Sign in
router.post('/signin', async (req, res) => {
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
    res.json({ success: true, loginToken: user.loginToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// Sign up
router.post('/signup', async (req, res) => {
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

  const user = new User({
    username,
    password: hash,
    loginToken: await generateLoginToken(),
  });

  try {
    const newUser = await user.save(user);
    res.json({ success: true, loginToken: newUser.loginToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});



// Session --- --- ---

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

// Add session
router.post('/session', async (req, res) => {
  const loginToken = req.get('loginToken');
  
  const user = await User.findOne({ loginToken: loginToken});
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

  await User.findByIdAndUpdate(
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
router.delete('/session/:sessionID', async (req, res) => {
  const loginToken = req.get('loginToken');
  
  const user = await User.findOne({ loginToken: loginToken });
  if(!user) {
    res.status(403).json({ success: false, message: 'Invalid login token. Please login' });
    return ;
  };

  const sessionID = req.params.sessionID;
  const updatedHistory = user.history.filter((session) => session.sessionID !== sessionID);
  
  if(JSON.stringify(updatedHistory) === JSON.stringify(user.history)) { // Session doesn't exist if they're the same.
    res.status(404).json({ success: false, message: 'Session does not exist' });
    return ;
  };
  
  await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        history: updatedHistory,
      },
    },
    {
      new: true,
    }
  );

  try {
    res.json({ success: true, message: 'Session successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

// Update session
router.put('/session/:sessionID', async (req, res) => {
  const loginToken = req.get('loginToken');
  const id = req.params.sessionID;
  const updatedSession = req.body;

  const user = await User.findOne({ loginToken: loginToken });
  if(!user) {
    res.status(403).json({ success: false, message: 'Invalid login' });
    return ;
  };

  const sessionIndex = user.history.findIndex(({ sessionID }) => sessionID === id );
  if(sessionIndex === -1) {
    res.status(404).json({ success: false, message: 'Invalid session ID. Could not find session to update.' });
    return ;
  };

  user.history[sessionIndex] = updatedSession;

  await User.findByIdAndUpdate(
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
    res.json({ success: true, data: updatedSession });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});



// History --- --- ---

// Retrieve user history 
router.get('/history', async (req, res) => {
  const loginToken = req.get('loginToken');

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

// Retrieve username
router.get('/username', async (req, res) => {
  const loginToken = req.get('loginToken');

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