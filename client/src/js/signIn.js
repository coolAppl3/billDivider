import '../scss/main.scss';
import disableFBCache from './components/global/disableFBCache';
disableFBCache();
import locateLoginToken from './components/global/locateLoginToken';
import SignInForm from './components/signIn/SignInForm';

// Initializing imports
new SignInForm();


class SignIn {
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

new SignIn();