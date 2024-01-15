import axios from 'axios';

class SessionAPi {
  constructor() {
    this._apiURL = window.location.hostname === 'localhost'
    ? `http://${window.location.hostname}:5000/api/users/newSession`
    : `https://${window.location.hostname}/api/users/newSession`;

  };

  async addSession(session, loginToken) {
    return axios.post(this._apiURL, session, {
      headers: {
        loginToken,
      },
    });
  };
};



export default SessionAPi;