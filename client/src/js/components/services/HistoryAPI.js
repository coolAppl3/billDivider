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
    return axios.post(this._sessionHistoryURL, loginToken);
  };

  async getUsername(loginToken) {
    return axios.post(this._usernameURL, loginToken);
  };

};



export default HistoryAPI;