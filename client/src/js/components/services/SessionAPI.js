import axios from 'axios';

class SessionAPi {
  constructor() {
    this._addSessionURL = window.location.hostname === 'localhost'
    ? `http://${window.location.hostname}:5000/api/users/newSession`
    : `https://${window.location.hostname}/api/users/newSession`;

    this._getSessionURL = window.location.hostname === 'localhost'
    ? `http://${window.location.hostname}:5000/api/users/session`
    : `https://${window.location.hostname}/api/users/session`;

  };

  async addSession(loginToken, session) {
    return axios.post(this._addSessionURL, session, {
      headers: { loginToken },
    });
  };

  async getSession(loginToken, sessionID) {
    return axios.get(`${this._getSessionURL}/${sessionID}`, {
      headers: { loginToken },
    });
  };
};



export default SessionAPi;