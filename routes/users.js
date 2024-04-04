const express = require('express');
const User = require('../models/User');
const UnverifiedUser = require('../models/UnverifiedUser');
const bcrypt = require('bcrypt');
const ValidateUser = require('../util/ValidateUser');
const nodemailer = require('nodemailer');

// Util
const generateLoginToken = require('../util/generateLoginToken');
const generateSessionID = require('../util/generateSessionID');
const generateEmailVerificationCode = require('../util/generateEmailVerificationCode');
const { default: mongoose } = require('mongoose');

// Initializing imports
const validateUser = new ValidateUser();

// ---
const router = express.Router();

// nodemailer setup
const transporter = nodemailer.createTransport({
  host: process.env.TRANSPORTER_HOST,
  port: process.env.TRANSPORTER_PORT,
  secure: true,
  auth: {
    user: process.env.TRANSPORTER_USER,
    pass: process.env.TRANSPORTER_PASS,
  },
});


// Account creation --- --- ---

// Sign up
router.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  const isValidEmail = validateUser.validateEmail(email);
  const isValidUsername = validateUser.validateUsername(username);
  const isValidPassword = validateUser.validatePassword(password);

  if(!isValidEmail || !isValidUsername || !isValidPassword) {
    res.status(401).json({ success: false, message: 'Invalid email address, username, or password.' });
    return ;
  };

  // Checking if the email is taken
  const emailInUse = await User.findOne({ email: email });
  if(emailInUse) {
    res.status(409).json({ success: false, message: 'Email address already in use.'});
    return ;
  };

  // Checking if the username is taken
  const usernameExists = await User.findOne({ username: username });
  if(usernameExists) {
    res.status(409).json({ success: false, message: 'Username already taken.'});
    return ;
  };

  const loginToken = await generateLoginToken();
  const verificationCode = generateEmailVerificationCode();

  const user = new User({
    email,
    username,
    password: hash,
    emailVerificationCode: verificationCode,
    loginToken,
  });

  const unverifiedUser = new UnverifiedUser({
    loginToken,
    createdOnTimestamp: Date.now(),
  });

  const mailOptions = {
    from: process.env.TRANSPORTER_USER,
    to: email,
    subject: '[No Reply] Email Verification Code - Bill Divider',
    text: `
    Hey there,
  
    Thank you for signing up to Bill Divider!
    
    To complete the sign up process, you would need to enter the following email-verification code: ${verificationCode}. Alternatively, click on the following link: https://billdivider.fun/verification.html?id=${unverifiedUser._id}&keepMeSignedIn=&verificationCode=${verificationCode}.
    
    If this request wasn't made by you, please ignore this email.
    
    Best,
    Bill Divider Automated Email Service`,
  };

  try {
    await user.save(user);
    await unverifiedUser.save(unverifiedUser);

    transporter.sendMail(mailOptions, (error, info) => {
      if(error) {
        console.log(error);
      } else {
        console.log('Email sent:', info.response)
      };
    });
    
    res.json({ success: true, unverifiedUserID: unverifiedUser._id });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'Something went wrong.' });
  };
});

// Email verification
router.post('/verification', async (req, res) => {
  const { unverifiedUserID, verificationCode } = req.body;

  if(!mongoose.Types.ObjectId.isValid(unverifiedUserID)) {
    res.status(404).json({ success: false, message: 'Account does not exist or is already validated.' });
    return ;
  };
  
  const unverifiedUser = await UnverifiedUser.findById(unverifiedUserID);
  if(!unverifiedUser) {
    res.status(404).json({ success: false, message: 'Account does not exist or is already validated.' });
    return ;
  };
  
  const loginToken = unverifiedUser.loginToken;

  const user = await User.findOne({ loginToken: loginToken });
  const userID = user._id;
  
  if(user.emailVerificationCode !== verificationCode) {
    res.status(401).json({ success: false, message: 'Incorrect verification code.' });
    return ;
  };

  try {
    await UnverifiedUser.findByIdAndDelete(unverifiedUserID);
    await User.findByIdAndUpdate(
      userID,
      {
        $set: {
          verified: true,
        },
        $unset: {
          emailVerificationCode: '',
        },
      },
      {
        new: true,
      }
    );

    res.json({ success: true, loginToken: user.loginToken });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  };
});

// Resend verification email
router.post('/resendVerification', async (req, res) => {
  const { unverifiedUserID } = req.body;

  if(!mongoose.Types.ObjectId.isValid(unverifiedUserID)) {
    res.status(404).json({ success: false, message: 'Account does not exist or has already been validated.' });
    return ;
  };
  
  const unverifiedUser = await UnverifiedUser.findById(unverifiedUserID);
  if(!unverifiedUser) {
    res.status(404).json({ success: false, message: 'Account does not exist or has already been validated.' });
    return ;
  };

  let resendAttempts = unverifiedUser.emailResendAttempts;
  if(resendAttempts >= 3) {
    res.status(403).json({ success: false, message: 'Email verification code resend limit exceeded. Request denied.' });
    return ;
  };

  resendAttempts++;
  await UnverifiedUser.findByIdAndUpdate(
    unverifiedUserID,
    {
      $set: {
        emailResendAttempts: resendAttempts,
      },
    },
    {
      new: true,
    }
  );
  
  const loginToken = unverifiedUser.loginToken;

  const user = await User.findOne({ loginToken: loginToken });
  const { emailVerificationCode, email } = user;

  const mailOptions = {
    from: process.env.TRANSPORTER_USER,
    to: email,
    subject: '[No Reply] Email Verification Code - Bill Divider',
    text: `
    Hey there,
  
    Thank you for signing up to Bill Divider!
    
    To complete the sign up process, you would need to enter the following email-verification code: ${emailVerificationCode}. Alternatively, click on the following link: https://billdivider.fun/verification.html?id=${unverifiedUser._id}&keepMeSignedIn=&verificationCode=${emailVerificationCode}.
    
    If this request wasn't made by you, please ignore this email.
    
    Best,
    Bill Divider Automated Email Service`,
  };

  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if(error) {
        console.log(error);
      } else {
        console.log('Email sent:', info.response)
      };
    });
    
    res.json({ success: true, message: 'Email resent.' });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'Something went wrong.' });
  };

});

// Sign in
router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });
  if(!user) {
    res.status(404).json({ success: false, message: 'Username does not exist.' });
    return ;
  };

  if(user.failedLoginAttempts >= 3) {
    res.status(403).json({ success: false, message: 'Account locked due to many failed sign in attempts.' });
    return ;
  };

  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  if(!passwordIsCorrect) {
    let newFailedLoginAttempts = user.failedLoginAttempts + 1;
    
    await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          failedLoginAttempts: newFailedLoginAttempts,
        },
      },
      {
        new: true,
      }
    );
    
    res.status(401).json({ success: false, message: 'Incorrect password.' });
    return ;
  };

  if(!user.verified) {
    res.status(403).json({ success: false, message: 'Email not verified.' });
    return ;
  };

  try {
    await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          failedLoginAttempts: 0,
        },
      },
      {
        new: true,
      }
    );
    
    res.json({ success: true, loginToken: user.loginToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'Something went wrong.' });
  }
});



// Account recovery --- --- ---

// Send recovery code
router.post('/recovery', async (req, res) => {
  const { recoveryEmail } = req.body;

  const isValidEmail = validateUser.validateEmail(recoveryEmail);
  if(!isValidEmail) {
    res.status(401).json({ success: false, message: 'Invalid email address.' });
    return ;
  };

  const user = await User.findOne({ email: recoveryEmail });
  if(!user) {
    res.status(404).json({ success: false, message: 'No accounts found with this email address.' });
    return ;
  };

  if(!user.verified) {
    res.status(403).json({ success: false, message: 'Account is not yet verified. Recovery denied.'});
    return ;
  };

  const { latestRecoveryEmailTimestamp } = user;
  const fullDayMilliseconds = 86400000; // 24 hours
  
  if(Date.now() - latestRecoveryEmailTimestamp <= fullDayMilliseconds) {
    res.status(429).json({ success: false, message: 'Only one recovery email can be sent every 24 hours.' });
    return ;
  };

  const recoveryCode = generateEmailVerificationCode();

  const mailOptions = {
    from: process.env.TRANSPORTER_USER,
    to: recoveryEmail,
    subject: '[No Reply] Account Recovery - Bill Divider',
    text: `
    Dear ${user.username},
  
    Hope you're doing well!

    We've received an account recovery request from you. To recover your account, please click the following link: https://billdivider.fun/updatePassword.html?id=${user._id}&recoveryCode=${recoveryCode}.

    If this request wasn't made by you, please ignore this email.
    
    Best,
    Bill Divider Automated Email Service`,
  };

  try {
    const timeStamp = Date.now();
    
    await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          accountRecoveryCode: recoveryCode,
          latestRecoveryEmailTimestamp: timeStamp,
          failedRecoveryAttempts: 0,
        },
      },
      {
        new: true,
      }
    );
    
    transporter.sendMail(mailOptions, (error, info) => {
      if(error) {
        console.log(error);
      } else {
        console.log('Email sent:', info.response)
      };
    });
    
    res.json({ success: true, message: 'Recovery email sent.' });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'Something went wrong.' });
  };
});

// Update password
router.put('/recovery', async (req, res) => {
  const { userID, recoveryCode, newPassword } = req.body;
  const hash = await bcrypt.hash(newPassword, 10);

  if(!mongoose.Types.ObjectId.isValid(userID)) {
    res.status(404).json({ success: false, message: 'Invalid userID. Invalid recovery request.' });
    return ;
  };
  
  const user = await User.findById(userID);
  if(!user) {
    res.status(404).json({ success: false, message: 'User not found. Invalid recovery request.' });
    return ;
  };
  
  if(user.accountRecoveryCode !== recoveryCode) {
    res.status(401).json({ success: false, message: 'Incorrect recovery code.' });
    return ;
  };

  const isValidPassword = validateUser.validatePassword(newPassword);
  if(!isValidPassword) {
    res.status(409).json({ success: false, message: 'Invalid password.' });
    return ;
  };

  try {
    await User.findByIdAndUpdate(
      userID,
      {
        $set: {
          password: hash,
        },
        $unset: {
          accountRecoveryCode: '',
        },
      },
      {
        new: true,
      }
    );

    res.json({ success: true, loginToken: user.loginToken });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  };
});



// Session --- --- ---

// Get single session
router.get('/session/:sessionID', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const loginToken = authHeader.substring(7);

  const requestedSessionID = req.params.sessionID;

  const user = await User.findOne({ loginToken: loginToken });
  if(!user) {
    res.status(403).json({ success: false, message: 'Invalid login token. Please log in.' });
    return ;
  };

  const userSessions = user.history;
  const requestedSession = userSessions.find(({ sessionID }) => sessionID === requestedSessionID);

  if(!requestedSession) {
    res.status(404).json({ success: false, message: 'Session not found.' });
    return ;
  };

  try {
    res.json({ success: true, data: requestedSession });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

// Add session
router.post('/session', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const loginToken = authHeader.substring(7);

  const newSession = req.body;
  
  const user = await User.findOne({ loginToken: loginToken});
  if(!user) {
    res.status(403).json({ success: false, message: 'Invalid login token. Please login.' });
    return ;
  };

  let newSessionID;
  do {
    newSessionID = generateSessionID();
  } while (user.history.some(({ sessionID }) => sessionID === newSessionID));

  newSession.sessionID = newSessionID;
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
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

// Delete session
router.delete('/session/:sessionID', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const loginToken = authHeader.substring(7);
  
  const sessionID = req.params.sessionID;
  
  const user = await User.findOne({ loginToken: loginToken });
  if(!user) {
    res.status(403).json({ success: false, message: 'Invalid login token. Please sign in.' });
    return ;
  };

  const updatedHistory = user.history.filter((session) => session.sessionID !== sessionID);
  if(JSON.stringify(updatedHistory) === JSON.stringify(user.history)) { // Session doesn't exist if they're the same.
    res.status(404).json({ success: false, message: 'Session does not exist.' });
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
    res.json({ success: true, message: 'Session successfully deleted.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

// Update session
router.put('/session/:sessionID', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const loginToken = authHeader.substring(7);
  
  const requestSessionID = req.params.sessionID;
  const updatedSession = req.body;

  const user = await User.findOne({ loginToken: loginToken });
  if(!user) {
    res.status(403).json({ success: false, message: 'Invalid credentials.' });
    return ;
  };

  const sessionIndex = user.history.findIndex(({ sessionID }) => sessionID === requestSessionID );
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
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});



// History --- --- ---

// Retrieve user history 
router.get('/history', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const loginToken = authHeader.substring(7);

  const user = await User.findOne({ loginToken: loginToken });
  if(!user) {
    res.status(404).json({ success: false, message: 'Invalid credentials.' });
    return ;
  };

  userHistory = user.history;
  
  try {
    res.json({ success: true, data: userHistory });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

// Retrieve username
router.get('/username', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const loginToken = authHeader.substring(7);

  const user = await User.findOne({ loginToken: loginToken });
  if(!user) {
    res.status(404).json({ success: false, message: 'Invalid credentials.' });
    return ;
  };

  username = user.username;
  
  try {
    res.json({ success: true, data: username });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

module.exports = router;