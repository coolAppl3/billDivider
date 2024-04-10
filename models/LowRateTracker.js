const mongoose = require('mongoose');

const LowRateTrackerSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const LowRateTracker = mongoose.model('LowRateTracker', LowRateTrackerSchema);

module.exports = LowRateTracker;