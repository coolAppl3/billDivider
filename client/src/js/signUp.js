import '../scss/main.scss';
import SignUpAPI from './components/services/SignUpAPI';
import Cookies from './components/global/Cookies';

import messagePopup from './components/global/messagePopup';
import LoadingModal from './components/global/LoadingModal';
import locateLoginToken from './components/global/locateLoginToken';
import redirectAfterDelayMillisecond from './components/global/redirectAfterDelayMillisecond';

// Initializing imports
const signUpAPI = new SignUpAPI();
const cookies = new Cookies();


class SignUp {
  constructor() {
    this._signupContainerForm = document.querySelector('.sign-up-container-form');
    this._usernameInput = document.querySelector('#username');
    this._passwordInput = document.querySelector('#password');
    this._keepMeSignedInCheckBox = document.querySelector('#keepMeSignedIn');
    this._linksContainer = document.querySelector('.links-container');

    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('DOMContentLoaded', this._redirect.bind(this));
    this._signupContainerForm.addEventListener('submit', this._signupUser.bind(this));

    this._keepMeSignedInCheckBox.addEventListener('click', this._displayCheckBox.bind(this));
    this._keepMeSignedInCheckBox.addEventListener('keyup', this._handleCheckBoxKeyEvents.bind(this));
    
    this._linksContainer.addEventListener('click', this._handleFormLinks.bind(this));
  };

  async _signupUser(e) {
    e.preventDefault();

    const isValidUsername = this._validateUsername(this._usernameInput.value); // returns true if it is
    const isValidPassword = this._validatePassword(this._passwordInput.value); // returns true if it is

    if(!isValidUsername || !isValidPassword) {
      // Validation functions will take care of user feedback.
      return ;
    };

    const newUser = { username: this._usernameInput.value, password: this._passwordInput.value };
    
    try {
      const res = await signUpAPI.signUp(newUser);
      const loginToken = res.data.data.loginToken;

      if(this._keepMeSignedInCheckBox.classList.contains('checked')) {
        cookies.set('loginToken', loginToken);
      } else {
        cookies.set('loginToken', loginToken, 'no-age');
      };

      LoadingModal.display();
      redirectAfterDelayMillisecond('history.html', 1000, 'Signed up successfully!', 'success');
      
    } catch (err) {
      const statusCode = err.response.status;
      
      if(statusCode === 401) { // Invalid username or password - Just as an extra layer of safety.
        this._displayErrorSpan('username', 'Invalid username')

      } else if(statusCode === 409) { // Username taken
        this._displayErrorSpan('username', 'Username already taken.')
      };
      
    }
  };

  _validateUsername(username) {
    // Username must be 5-24 characters long (both inclusive) and:
    // Must include at least one letter
    // Must not include any special characters
    // Must not include any whitespace
    
    // Ensuring at least 1 letter is present, and that whitespace and special characters are not present
    const re = /^[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*$/;
    
    if(username.length < 5) {
      this._displayErrorSpan('username', 'Username must be at least 5 characters long.');
      return false;

    } else if(username.length > 24) {
      this._displayErrorSpan('username', 'Username can not be longer than 24 characters.');
      return false;

    } else if(!re.test(username)) {
      this._displayErrorSpan('username', 'Username must contain at least one letter, and must not contain any whitespace or special characters.');
      return false;

    } else {
      this._hideErrorSpan('username');
      return true;
    };
    
  };

  _validatePassword(password) {
    // Password must be 8-24 characters long (both inclusive) and:
    // Can accept dots and underscores
    // Must not include any other special characters
    // Must not include any whitespace

    // Ensuring that only letters (uppercase and lowercase), dots, and underscores are used.
    const re = /^[a-zA-Z0-9_.]+$/;
    
    if(password.length < 8) {
      this._displayErrorSpan('password', 'Password must be at least 8 characters long.');
      return false;

    } else if(password.length > 24) {
      this._displayErrorSpan('password', 'Password can not be longer than 24 characters.');
      return false;

    } else if(!re.test(password)) {
      this._displayErrorSpan('password', 'Whitespace and special characters, apart from dots and underscores, are not allowed.');
      return false;

    } else {
      this._hideErrorSpan('password');
      return true;
    };
  };

  _displayErrorSpan(inputType, message) {
    if(inputType === 'username') {
      this._usernameInput.nextElementSibling.textContent = message;
      this._usernameInput.parentElement.classList.add('error');

    } else if(inputType === 'password') {
      this._passwordInput.nextElementSibling.textContent = message;
      this._passwordInput.parentElement.classList.add('error');
    };
  };

  _hideErrorSpan(inputType) {
    if(inputType === 'username') {
      this._usernameInput.nextElementSibling.textContent = '';
      this._usernameInput.parentElement.classList.remove('error');
      
    } else if(inputType === 'password') {
      this._passwordInput.nextElementSibling.textContent = '';
      this._passwordInput.parentElement.classList.remove('error');
    };
  };

  _handleCheckBoxKeyEvents(e) {
    const pressedKey = e.key;

    if(pressedKey === 'Enter') {
      this._displayCheckBox(e);
    };
  };
  
  _displayCheckBox(e) {
    e.stopImmediatePropagation();

    if(!this._keepMeSignedInCheckBox.classList.contains('checked')) {
      this._keepMeSignedInCheckBox.classList.add('checked');
    } else {
      this._keepMeSignedInCheckBox.classList.remove('checked');
    };

  };

  _handleFormLinks(e) {
    e.stopImmediatePropagation();

    if(e.target.id === 'returnToPreviousPage') {
      history.back();
    } else if(e.target.id === 'returnToHomepage') {
      window.location.href = 'index.html';
    };
  };

  _redirect() {
    const loginToken = locateLoginToken();
    
    if(loginToken) { // already logged in and shouldn't be on this page - redirecting...
      window.location.href = 'index.html';
    };
  };
};

new SignUp();