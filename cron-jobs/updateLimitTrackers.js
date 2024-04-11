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
    const collection = await Model.find({});
    const APIKeysToDelete = [];

    for(const document of collection) {
      if(Date.now() - document.timestamp >= (60 * 1000)) {
        APIKeysToDelete.push(document.token);
      };
    };

    await Model.deleteMany({ token: { $in: APIKeysToDelete } });
    
  } catch (err) {
    console.log(err);
  };
};

module.exports = updateLimitTrackers;