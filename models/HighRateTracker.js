const mongoose = require('mongoose');

const HighRateTrackerSchema = new mongoose.Schema({
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

const HighRateTracker = mongoose.model('HighRateTracker', HighRateTrackerSchema);

module.exports = HighRateTracker;