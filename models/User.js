const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  emailVerificationCode: {
    type: String,
  },
  accountRecoveryCode: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  loginToken: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  failedLoginAttempts: {
    type: Number,
    default: 0,
  },
  latestRecoveryEmailTimestamp: {
    type: Number,
    default: 1,
  },
  history: {
    type: Array,
    default: [],
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;