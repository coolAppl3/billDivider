import axios from 'axios';

class RecoveryAPI {
  constructor() {
    this._recoveryURL = window.location.hostname === 'localhost'
    ? `http://${window.location.hostname}:5000/api/users/recovery`
    : `https://${window.location.hostname}/api/users/recovery`;
  };

  async sendRecoveryEmail(APIKey, recoveryEmail) {
    return axios.post(this._recoveryURL, recoveryEmail, {
      headers: {
        'x-api-key': APIKey,
      },
    });
  };

  async updatePassword(APIKey, recoveryData) {
    return axios.put(this._recoveryURL, recoveryData, {
      headers: {
        'x-api-key': APIKey,
      },
    });
  };
};

export default RecoveryAPI;