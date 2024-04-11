import axios from 'axios';

class VerificationAPI {
  constructor() {
    this._verificationURL = window.location.hostname === 'localhost'
    ? `http://${window.location.hostname}:5000/api/users/verification`
    : `https://${window.location.hostname}/api/users/verification`;

    this._resendVerificationURL = window.location.hostname === 'localhost'
    ? `http://${window.location.hostname}:5000/api/users/resendVerification`
    : `https://${window.location.hostname}/api/users/resendVerification`;
  };

  async verify(APIKey, verificationData) {
    return axios.post(this._verificationURL, verificationData, {
      headers: {
        'x-api-key': APIKey,
      },
    });
  };

  async resendVerificationEmail(APIKey, unverifiedUserID) {
    return axios.post(this._resendVerificationURL, unverifiedUserID , {
      headers: {
        'x-api-key': APIKey,
      },
    });
  };
};

export default VerificationAPI;