import axios from 'axios';

class HistoryAPI {
  constructor() {
    this._apiURL = window.location.hostname === 'localhost'
    ? `http://${window.location.hostname}:5000/api/users/history`
    : `https://${window.location.hostname}/api/users/history`;

  };

  async getUserHistory(loginToken) {
    return axios.post(this._apiURL, loginToken);
  };
};



export default HistoryAPI;