import '../scss/main.scss';
import disableFBCache from './components/global/disableFBCache';
disableFBCache();
import locateLoginToken from './components/global/locateLoginToken';
import SignUpForm from './components/signUp/SignUpForm';

// Initializing imports
new SignUpForm();

class SignUp {
  constructor() {
    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('DOMContentLoaded', this._redirectIfLoggedIn.bind(this));
  };

  _redirectIfLoggedIn() {
    const loginToken = locateLoginToken();
    
    if(loginToken) { // already logged in and shouldn't be on this page - redirecting...
      window.location.href = 'index.html';
    };
  };
};

new SignUp();