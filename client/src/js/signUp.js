import '../scss/main.scss';
import disableFBCache from './components/global/disableFBCache';
disableFBCache();

import SignUpAPI from './components/services/SignUpAPI';
import Cookies from './components/global/Cookies';

import RevealPassword from './components/signing/RevealPassword';
import LinksContainer from './components/signing/LinksContainer';

import LoadingModal from './components/global/LoadingModal';
import locateLoginToken from './components/global/locateLoginToken';
import redirectAfterDelayMillisecond from './components/global/redirectAfterDelayMillisecond';
import ErrorSpan from './components/global/ErrorSpan';
import FormCheckbox from './components/global/FormCheckbox';



// Initializing imports
const signUpAPI = new SignUpAPI();
const cookies = new Cookies();
const errorSpan = new ErrorSpan();

new FormCheckbox('keepMeSignedIn');
new RevealPassword('password');
new LinksContainer('links-container');

class SignUp {
  constructor() {
    this._signupContainerForm = document.querySelector('.sign-up-container-form');
    this._usernameInput = document.querySelector('#username');
    this._passwordInput = document.querySelector('#password');

    this._keepMeSignedInCheckBox = document.querySelector('#keepMeSignedIn');
    this._loginTokenAge = 1209600000; // 14 days

    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('DOMContentLoaded', this._redirectIfLoggedIn.bind(this));
    this._signupContainerForm.addEventListener('submit', this._signup.bind(this));
  };

  async _signup(e) {
    e.preventDefault();
    LoadingModal.display();

    const isValidUsername = this._validateUsername(this._usernameInput); // returns true if it is
    const isValidPassword = this._validatePassword(this._passwordInput); // returns true if it is

    if(!isValidUsername || !isValidPassword) {
      // Validation functions will take care of user feedback.
      LoadingModal.remove();
      return ;
    };

    const newUser = { username: this._usernameInput.value, password: this._passwordInput.value };
    
    try {
      const res = await signUpAPI.signUp(newUser);
      const loginToken = res.data.data.loginToken;

      if(this._keepMeSignedInCheckBox.classList.contains('checked')) {
        cookies.set('loginToken', loginToken, this._loginTokenAge);
      } else {
        cookies.set('loginToken', loginToken);
      };

      LoadingModal.display();
      redirectAfterDelayMillisecond('history.html', 1000, 'Signed up successfully!', 'success');
      
    } catch (err) {
      const statusCode = err.response.status;
      
      if(statusCode === 401) { // Invalid username or password - Just as an extra layer of safety.
        const inputFormGroup = this._usernameInput.parentElement;
        errorSpan.display(inputFormGroup, 'Invalid username.')
        LoadingModal.remove();

      } else if(statusCode === 409) { // Username taken
        const inputFormGroup = this._usernameInput.parentElement;
        errorSpan.display(inputFormGroup, 'Username already taken.')
        LoadingModal.remove();
      };
    }
  };

  _validateUsername(input) {
    const value = input.value;
    const inputFormGroup = input.parentElement;
    
    const re = /^[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*$/;
    
    if(value.length < 5) {
      errorSpan.display(inputFormGroup, 'Username must be at least 5 characters long.');
      return false;

    } else if(value.length > 24) {
      errorSpan.display(inputFormGroup, 'Username can not be longer than 24 characters.');
      return false;

    } else if(!re.test(value)) {
      errorSpan.display(inputFormGroup, 'Username must contain at least one letter, and must not contain any whitespace or special characters.');
      return false;

    } else {
      errorSpan.hide(inputFormGroup);
      return true;
    };
    
  };

  _validatePassword(input) {
    const value = input.value;
    const inputFormGroup = input.parentElement;

    const re = /^[a-zA-Z0-9_.]+$/;
    
    if(value.length < 8) {
      errorSpan.display(inputFormGroup, 'Password must be at least 8 characters long.');
      return false;

    } else if(value.length > 24) {
      errorSpan.display(inputFormGroup, 'Password can not be longer than 24 characters.');
      return false;

    } else if(!re.test(value)) {
      errorSpan.display(inputFormGroup, 'Whitespace and special characters, apart from dots and underscores, are not allowed.');
      return false;

    } else {
      errorSpan.hide(inputFormGroup);
      return true;
    };
  };

  _redirectIfLoggedIn() {
    const loginToken = locateLoginToken();
    
    if(loginToken) { // already logged in and shouldn't be on this page - redirecting...
      window.location.href = 'index.html';
    };
  };
};

new SignUp();