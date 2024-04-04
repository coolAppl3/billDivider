const mongoose = require('mongoose');

const unverifiedUserSchema = new mongoose.Schema({
  loginToken: {
    type: String,
    required: true,
  },
  createdOnTimestamp: {
    type: Number,
    required: true,
  },
  emailResendAttempts: {
    type: Number,
    default: 0,
  },
});

const UnverifiedUser = mongoose.model('UnverifiedUser', unverifiedUserSchema);

module.exports = UnverifiedUser;