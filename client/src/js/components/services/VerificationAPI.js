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

  async verify(verificationData) {
    return axios.post(this._verificationURL, verificationData);
  };

  async resendVerificationEmail(unverifiedUserID) {
    return axios.post(this._resendVerificationURL, unverifiedUserID);
  };
};

export default VerificationAPI;