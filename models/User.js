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
  loginToken: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  history: {
    type: Array,
    default: [],
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
