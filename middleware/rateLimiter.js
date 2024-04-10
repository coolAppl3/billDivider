const LowRateTracker = require('../models/LowRateTracker');
const HighRateTracker = require('../models/HighRateTracker');

async function rateLimiter(req, res, next) {
  const highRateCountLimit = 45; // per minute
  const lowRateCountLimit = 15; // per minute
  const lowRateCountLimitEndpoints = ['/signup', '/verification', '/resendVerification', '/signin', '/recovery'];

  const { path, ip } = req;
  const requestEndpoint = path.substring(10); // removing /api/users from the path
  
  const isLowRateEndpoint = lowRateCountLimitEndpoints.some((endpoint) => endpoint === requestEndpoint);
  if(isLowRateEndpoint) {
    const document = await LowRateTracker.findOne({ ip: ip });

    if(!document) {
      await createRateTracker(LowRateTracker, ip, next);
      return ;
    };

    await updateRateTracker(LowRateTracker, lowRateCountLimit, document, res, next);
    return ;
  };

  const document = await HighRateTracker.findOne({ ip: ip });

  if(!document) {
    await createRateTracker(HighRateTracker, ip, next);
    return ;
  };

  updateRateTracker(HighRateTracker, highRateCountLimit, document, res, next);
};

async function createRateTracker(Model, ip, next) {
  const timestamp = Date.now();

  const newDocument = new Model({
    ip,
    timestamp,
    count: 1,
  });

  try {
    await newDocument.save(newDocument);

  } catch (err) {
    console.log(err);
  };

  next();
};

async function updateRateTracker(Model, rateCount, document, res, next) {
  if(document.count >= rateCount) {
    res.status(429).json({ success: false, message: 'Too many requests.' });
    return ;
  };

  try {
    await Model.findOneAndUpdate(
      { ip: document.ip},
      { $inc: { count: 1 } },
      { new: true }
    );

  } catch (err) {
    console.log(err)
  };

  next();
};

module.exports = rateLimiter;