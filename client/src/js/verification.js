import '../scss/main.scss';
import VerificationForm from './components/verification/VerificationForm';
import DisplayTerms from './components/global/DisplayTerms';
import locateLoginToken from './components/global/locateLoginToken';

// Initializing imports
new VerificationForm();
new DisplayTerms();

class Verification {
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

new Verification();