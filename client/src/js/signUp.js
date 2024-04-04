import '../scss/main.scss';
import disableFBCache from './components/global/disableFBCache';
disableFBCache();
import locateLoginToken from './components/global/locateLoginToken';
import SignUpForm from './components/signUp/SignUpForm';
import DisplayTerms from './components/global/DisplayTerms';

// Initializing imports
new SignUpForm();
new DisplayTerms();

class SignUp {
  constructor() {
    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('DOMContentLoaded', this._redirectIfSignedIn.bind(this));
  };

  _redirectIfSignedIn() {
    const loginToken = locateLoginToken();
    
    if(loginToken) { // already logged in and shouldn't be on this page - redirecting...
      window.location.href = 'index.html';
    };
  };
};

new SignUp();