import axios from 'axios';

class SignUpAPI {
  constructor() {
    this._apiURL = window.location.hostname === 'localhost'
    ? `http://${window.location.hostname}:5000/api/users/signup`
    : `https://${window.location.hostname}/api/users/signup`;
  };

  async signUp(user) {
    return axios.post(this._apiURL, user);
  };
};

export default SignUpAPI;