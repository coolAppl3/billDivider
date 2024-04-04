const cron = require('node-cron');
const User = require('../models/User');
const UnverifiedUser = require('../models/UnverifiedUser');


function verificationPeriodExpired(createdOnTimestamp) {
  const verificationPeriod = 900000; // 15 minutes

  if(Date.now() - createdOnTimestamp >= verificationPeriod) {
    return true;
  };

  return false;
};

async function removeUnverifiedUsers() {
  cron.schedule('*/15 * * * *', async () => {
    const unverifiedUsers = await UnverifiedUser.find({});
  
    for(const user of unverifiedUsers) {
      if(verificationPeriodExpired(user.createdOnTimestamp)) {
        try {
          await UnverifiedUser.findOneAndDelete({ loginToken: user.loginToken });
          await User.findOneAndDelete({ loginToken: user.loginToken });
          console.log(`User ${user._id} has been deleted due to not verifying their email address.`);
        } catch (err) {
          console.log(err);
        };
      };
    };
  });
};

module.exports = removeUnverifiedUsers;