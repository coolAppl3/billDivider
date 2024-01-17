import axios from 'axios';

class HistoryAPI {
  constructor() {
    this._sessionHistoryURL = window.location.hostname === 'localhost'
    ? `http://${window.location.hostname}:5000/api/users/history`
    : `https://${window.location.hostname}/api/users/history`;

    this._usernameURL = window.location.hostname === 'localhost'
    ? `http://${window.location.hostname}:5000/api/users/username`
    : `https://${window.location.hostname}/api/users/username`;

    this._deleteSessionURL = window.location.hostname === 'localhost'
    ? `http://${window.location.hostname}:5000/api/users/delete-session`
    : `https://${window.location.hostname}/api/users/delete-session`;
  };

  async getSessionHistory(loginToken) {
    return axios.post(this._sessionHistoryURL, loginToken);
  };

  async getUsername(loginToken) {
    return axios.post(this._usernameURL, loginToken);
  };

  async deleteSession(loginToken, sessionID) {
    return axios.delete(`${this._deleteSessionURL}/${sessionID}`, {
      headers: { loginToken },
    });
  };

};



export default HistoryAPI;