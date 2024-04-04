import axios from 'axios';

class RecoveryAPI {
  constructor() {
    this._recoveryURL = window.location.hostname === 'localhost'
    ? `http://${window.location.hostname}:5000/api/users/recovery`
    : `https://${window.location.hostname}/api/users/recovery`;
  };

  async sendRecoveryEmail(recoveryEmail) {
    return axios.post(this._recoveryURL, recoveryEmail);
  };

  async updatePassword(recoveryData) {
    return axios.put(this._recoveryURL, recoveryData);
  };
};

export default RecoveryAPI;