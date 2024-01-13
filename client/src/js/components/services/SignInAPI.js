import axios from 'axios';

class SignInAPI {
  constructor() {
    this._apiURL = window.location.hostname === 'localhost'
    ? `http://${window.location.hostname}:5000/api/users/login`
    : `https://${window.location.hostname}/api/users/login`;

  };

  async signIn(user) {
    return axios.post(this._apiURL, user);
  };
};



export default SignInAPI;