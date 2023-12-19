import axios from 'axios';


class LoginTokenAPI {
  constructor() {
    this._apiURL = window.location.hostname === 'localhost'
    ? `http://${window.location.hostname}:5000/api/ideas`
    : `https://${window.location.hostname}/api/ideas`;

  };

  
  
};



export default LoginTokenAPI;