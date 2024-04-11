import '../scss/main.scss';
import disableFBCache from './components/global/disableFBCache';
disableFBCache();
import locateLoginToken from './components/global/locateLoginToken';
import SignInForm from './components/signIn/SignInForm';
import DisplayTerms from './components/global/DisplayTerms';
import generateAPIKey from './components/global/generateAPIKey';

// Initializing imports
new SignInForm();
new DisplayTerms();
generateAPIKey();

class SignIn {
  constructor() {
    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('DOMContentLoaded', this._redirectIfSignedIn.bind(this));
  };

  _redirectIfSignedIn() {
    const loginToken = locateLoginToken();
    
    if(loginToken) {
      window.location.href = 'index.html';
    };
  };
};

new SignIn();