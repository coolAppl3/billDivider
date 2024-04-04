import '../scss/main.scss';
import UpdatePasswordForm from './components/updatePassword/UpdatePasswordForm';
import DisplayTerms from './components/global/DisplayTerms';
import locateLoginToken from './components/global/locateLoginToken';

// Initializing imports
new UpdatePasswordForm();
new DisplayTerms();

class UpdatePassword {
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

new UpdatePassword();