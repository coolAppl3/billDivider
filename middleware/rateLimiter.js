const LowRateTracker = require('../models/LowRateTracker');
const HighRateTracker = require('../models/HighRateTracker');
const User = require('../models/User');

async function rateLimiter(req, res, next) {
  const highRateCountLimit = 45; // per minute
  const lowRateCountLimit = 15; // per minute
  const lowRateCountLimitEndpoints = ['/signup', '/verification', '/resendVerification', '/signin', '/recovery'];

  const userAPIKey = req.headers['x-api-key'];
  if(!userAPIKey || userAPIKey.length !== 64 || !userAPIKey.startsWith('a')) {
    res.status(401).json({ success: false, message: 'API key missing or invalid...' });
    return ;
  };
  
  const { path } = req;
  const requestEndpoint = path.substring(10); // removing /api/users from the path
  
  const isLowRateEndpoint = lowRateCountLimitEndpoints.some((endpoint) => endpoint === requestEndpoint);
  if(isLowRateEndpoint) {
    const document = await LowRateTracker.findOne({ token: userAPIKey });

    if(!document) {
      await createRateTracker(LowRateTracker, userAPIKey, next);
      return ;
    };

    await updateRateTracker(LowRateTracker, lowRateCountLimit, document, res, next);
    return ;
  };

  const authHeader = req.headers['authorization'];
  if(!authHeader) {
    res.status(401).json({ success: false, message: 'Invalid credentials. Request denied.' });
    return ;
  };

  const loginToken = authHeader.substring(7);
  const document = await HighRateTracker.findOne({ token: loginToken });

  if(!document) {
    await createRateTracker(HighRateTracker, loginToken, next);
    return ;
  };

  updateRateTracker(HighRateTracker, highRateCountLimit, document, res, next);
};

async function createRateTracker(Model, userToken, next) {
  const timestamp = Date.now();
  
  const newDocument = new Model({
    token: userToken,
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
    if(document.token.length === 32) { // loginToken
      await User.findOneAndUpdate(
        { loginToken: document.token },
        { $inc: { rateLimitReachedCount: 1 } },
        { new: true }
      );
    };
    
    res.status(429).json({ success: false, message: 'Too many requests.' });
    return ;
  };

  try {
    await Model.findOneAndUpdate(
      { token: document.token},
      { $inc: { count: 1 } },
      { new: true }
    );

  } catch (err) {
    console.log(err)
  };

  next();
};

module.exports = rateLimiter;