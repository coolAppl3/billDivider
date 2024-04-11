import axios from 'axios';

class HistoryAPI {
  constructor() {
    this._sessionHistoryURL = window.location.hostname === 'localhost'
    ? `http://${window.location.hostname}:5000/api/users/history`
    : `https://${window.location.hostname}/api/users/history`;
  };

  async getSessionHistory(loginToken, APIKey) {
    return axios.get(this._sessionHistoryURL, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
        'x-api-key': APIKey,
      },
    });
  };
};



export default HistoryAPI;