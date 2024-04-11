import axios from 'axios';

class SessionAPI {
  constructor() {
    this._sessionURL = window.location.hostname === 'localhost'
    ? `http://${window.location.hostname}:5000/api/users/session`
    : `https://${window.location.hostname}/api/users/session`;
  };

  async addSession(loginToken, APIKey, session) {
    return axios.post(this._sessionURL, session, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
        'x-api-key': APIKey,
      },
    });
  };

  async getSession(loginToken, APIKey, sessionID) {
    return axios.get(`${this._sessionURL}/${sessionID}`, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
        'x-api-key': APIKey,
      },
    });
  };

  async deleteSession(loginToken, APIKey, sessionID) {
    return axios.delete(`${this._sessionURL}/${sessionID}`, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
        'x-api-key': APIKey,
      },
    });
  };

  async updateSession(loginToken, APIKey, sessionID, session) {
    return axios.put(`${this._sessionURL}/${sessionID}`, session, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
        'x-api-key': APIKey,
      },
    });
  };
};



export default SessionAPI;