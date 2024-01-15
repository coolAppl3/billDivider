import '../scss/main.scss';
import SignInAPI from './components/services/SignInAPI';
import Cookies from './components/global/Cookies';

import messagePopup from './components/global/messagePopup';
import LoadingModal from './components/global/LoadingModal';
import locateLoginToken from './components/global/locateLoginToken';

// Initializing imports
const signInAPI = new SignInAPI();
const cookies = new Cookies();

class SignIn {
  constructor() {
    this._signInContainerForm = document.querySelector('.sign-in-container-form');
    this._usernameInput = document.querySelector('#username');
    this._passwordInput = document.querySelector('#password');
    this._keepMeSignedInCheckBox = document.querySelector('#keepMeSignedIn');
    this._linksContainer = document.querySelector('.links-container');
    this._revealPasswordIcon = document.querySelector('#revealPassword');

    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('DOMContentLoaded', this._redirect.bind(this));
    this._signInContainerForm.addEventListener('submit', this._signIn.bind(this));
    this._keepMeSignedInCheckBox.addEventListener('click', this._displayCheckBox.bind(this));
    this._linksContainer.addEventListener('click', this._handleFormLinks.bind(this));
    this._revealPasswordIcon.addEventListener('click', this._revalPassword.bind(this));
  };

  async _signIn(e) {
    e.preventDefault();
    LoadingModal.display();

    // Ensuring neither inputs is empty
    this._usernameInputIsEmpty();
    this._passwordInputIsEmpty();
    
    if(this._usernameInputIsEmpty() || this._passwordInputIsEmpty()) {
      return ; // At least one field is empty - function will not continue.
    };

    const user = {
      username: this._usernameInput.value,
      password: this._passwordInput.value,
    }
    
    try {
      const res = await signInAPI.signIn(user);
      const loginToken = res.data.token;

      // Saving the loginToken depending on the user's preference.
      if(this._keepMeSignedInCheckBox.classList.contains('checked')) {
        cookies.set('loginToken', loginToken);
      } else {
        cookies.set('loginToken', loginToken, 'no-age');
      };

      messagePopup('Login successful!', 'success');
      setTimeout(() => window.location.href = 'index.html', 500);
      
    } catch (error) {
      console.log(error)
      const status = error.response.status;
      if(status === 404) { // username doesn't exist
        this._displayErrorSpan('username', `Username doesn't exist.`);
        LoadingModal.remove();
        return ;
      } else if(status === 401) { // incorrect password
        this._displayErrorSpan('password', 'Incorrect password.');
        LoadingModal.remove();
        return ;
      } else { // Will usually be 500
        messagePopup('Something went wrong.', 'danger');
        LoadingModal.remove();
        return ;
      };
    }
  };

  _usernameInputIsEmpty() {
    // Returns true.
    
    if(this._usernameInput.value === '') {
      this._displayErrorSpan('username', 'Please enter a username.');
      return true;
    } else {
      this._hideErrorSpan('username');
      return false;
    };
  };

  _passwordInputIsEmpty() {
    // Returns false if the input is empty.
    
    if(this._passwordInput.value === '') { // is empty
      this._displayErrorSpan('password', 'Please enter a password.');
      return true;
    } else { // is not empty
      this._hideErrorSpan('password');
      return false;
    };
  };

  _revalPassword(e) {
    e.stopImmediatePropagation();

    const inputType = this._passwordInput.getAttribute('type');
    if(inputType === 'password') {
      this._passwordInput.setAttribute('type', 'text');
      this._passwordInput.focus();
      this._revealPasswordIcon.className = 'fa-solid fa-eye-slash';
    } else {
      this._passwordInput.setAttribute('type', 'password');
      this._passwordInput.focus();
      this._revealPasswordIcon.className = 'fa-solid fa-eye';
    };
  };

  _redirect() {
    const loginToken = locateLoginToken();
    
    if(loginToken) { // already logged in and shouldn't be on this page - redirecting...
      window.location.href = 'index.html';
    };
  };

  _displayErrorSpan(inputType, message) {
    if(inputType === 'username') {
      this._usernameInput.nextElementSibling.textContent = message;
      this._usernameInput.parentElement.classList.add('error');

    } else if(inputType === 'password') {
      this._passwordInput.nextElementSibling.nextElementSibling.textContent = message;
      this._passwordInput.parentElement.classList.add('error');

      // Ensuring the revealPasswordBtn stays properly aligned
      document.querySelector('#revealPassword').style.bottom = '22px';
    };
  };

  _hideErrorSpan(inputType) {
    if(inputType === 'username') {
      this._usernameInput.nextElementSibling.textContent = '';
      this._usernameInput.parentElement.classList.remove('error');
      
    } else if(inputType === 'password') {
      this._passwordInput.nextElementSibling.nextElementSibling.textContent = '';
      this._passwordInput.parentElement.classList.remove('error');
      
      // Ensuring the revealPasswordBtn stays properly aligned
      document.querySelector('#revealPassword').style.bottom = '1px';
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

};

new SignIn();