import axios from 'axios';

class HistoryAPI {
  constructor() {
    this._sessionHistoryURL = window.location.hostname === 'localhost'
    ? `http://${window.location.hostname}:5000/api/users/history`
    : `https://${window.location.hostname}/api/users/history`;

    this._usernameURL = window.location.hostname === 'localhost'
    ? `http://${window.location.hostname}:5000/api/users/username`
    : `https://${window.location.hostname}/api/users/username`;
  };

  async getSessionHistory(loginToken) {
    return axios.get(this._sessionHistoryURL, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    });
  };

  async getUsername(loginToken) {
    return axios.get(this._usernameURL, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    });
  };

};



export default HistoryAPI;