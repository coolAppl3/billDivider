import axios from 'axios';

class SessionAPI {
  constructor() {
    this._sessionURL = window.location.hostname === 'localhost'
    ? `http://${window.location.hostname}:5000/api/users/session`
    : `https://${window.location.hostname}/api/users/session`;
  };

  async addSession(loginToken, session) {
    return axios.post(this._sessionURL, session, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    });
  };

  async getSession(loginToken, sessionID) {
    return axios.get(`${this._sessionURL}/${sessionID}`, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    });
  };

  async deleteSession(loginToken, sessionID) {
    return axios.delete(`${this._sessionURL}/${sessionID}`, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    });
  };

  async updateSession(loginToken, sessionID, session) {
    return axios.put(`${this._sessionURL}/${sessionID}`, session, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    });
  };
};



export default SessionAPI;