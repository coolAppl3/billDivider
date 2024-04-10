const cron = require('node-cron');
const LowRateTracker = require('../models/LowRateTracker');
const HighRateTracker = require('../models/HighRateTracker');

async function updateLimitTrackers() {
  cron.schedule('*/1 * * * *', async () => {
    await updateTracker(HighRateTracker);
    await updateTracker(LowRateTracker);
  });
};


async function updateTracker(Model) {
  try {
    const highRateCollection = await Model.find({});
    const ipAddressesToDelete = [];

    for(const document of highRateCollection) {
      if(Date.now() - document.timestamp >= (60 * 1000)) {
        ipAddressesToDelete.push(document.ip);
      };
    };

    await Model.deleteMany({ ip: { $in: ipAddressesToDelete } });
    
  } catch (err) {
    console.log(err);
  }
};

module.exports = updateLimitTrackers;