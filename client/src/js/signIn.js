import '../scss/main.scss';
import SignInAPI from './components/services/SignInAPI';
import Cookies from './components/global/Cookies';

import LoadingModal from './components/global/LoadingModal';
import locateLoginToken from './components/global/locateLoginToken';
import redirectAfterDelayMillisecond from './components/global/redirectAfterDelayMillisecond';
import ErrorSpan from './components/global/ErrorSpan';

// Initializing imports
const signInAPI = new SignInAPI();
const cookies = new Cookies();
const errorSpan = new ErrorSpan();

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
    window.addEventListener('DOMContentLoaded', this._redirectIfLoggedIn.bind(this));
    this._signInContainerForm.addEventListener('submit', this._signIn.bind(this));

    this._keepMeSignedInCheckBox.addEventListener('click', this._displayCheckBox.bind(this));
    this._keepMeSignedInCheckBox.addEventListener('keyup', this._handleCheckBoxKeyEvents.bind(this));

    
    this._linksContainer.addEventListener('click', this._handleFormLinksClickEvents.bind(this));
    this._linksContainer.addEventListener('keyup', this._handleFormLinkKeyEvents.bind(this));
    this._revealPasswordIcon.addEventListener('click', this._revalPassword.bind(this));
  };

  async _signIn(e) {
    e.preventDefault();
    LoadingModal.display();

    // Ensuring neither inputs is empty
    this._usernameInputIsEmpty();
    this._passwordInputIsEmpty();
    
    if(this._usernameInputIsEmpty() || this._passwordInputIsEmpty()) {
      LoadingModal.remove();
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

      redirectAfterDelayMillisecond('history.html', 1000, 'Login successful!', 'success');
      
    } catch (err) {
      console.log(err)
      
      if(!err.response) {
        cookies.remove('loginToken');
        return redirectAfterDelayMillisecond('signIn.html');
      };
      
      const status = err.response.status;

      if(status === 404) { // username doesn't exist
        const inputFormGroup = this._usernameInput.parentElement;
        errorSpan.display(inputFormGroup, `Username doesn't exist.`);
        LoadingModal.remove();

      } else if(status === 401) { // incorrect password
        const inputFormGroup = this._passwordInput.parentElement;
        errorSpan.display(inputFormGroup, `Incorrect password.`);
        LoadingModal.remove();

      } else { // Internal server error (500)
        redirectAfterDelayMillisecond('signUp.html', 1000, 'Something went wrong');
      };
    }
  };

  _usernameInputIsEmpty() {
    const value = this._usernameInput.value;
    const inputFormGroup = this._usernameInput.parentElement;
    
    if(value === '') {
      errorSpan.display(inputFormGroup, 'Please enter a username.');
      return true;
    }

    errorSpan.hide(inputFormGroup);
    return false;
  };

  _passwordInputIsEmpty() {
    const value = this._passwordInput.value;
    const inputFormGroup = this._passwordInput.parentElement;
    
    if(value === '') {
      errorSpan.display(inputFormGroup, 'Please enter a password.');
      return true;
    }

    errorSpan.hide(inputFormGroup);
    return false;
  };

  _revalPassword() {
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

  _handleCheckBoxKeyEvents(e) {
    const pressedKey = e.key;

    if(pressedKey === 'Enter') {
      this._displayCheckBox(e);
    };
  };

  _displayCheckBox() {
    if(!this._keepMeSignedInCheckBox.classList.contains('checked')) {
      this._keepMeSignedInCheckBox.classList.add('checked');
    } else {
      this._keepMeSignedInCheckBox.classList.remove('checked');
    };
  };

  _handleFormLinkKeyEvents(e) {
    const pressedKey = e.key;

    if(pressedKey === 'Enter') {
      this._handleFormLinksClickEvents(e);
    };
  };

  _handleFormLinksClickEvents(e) {
    if(e.target.id === 'returnToPreviousPage') {
      history.back();
    } else if(e.target.id === 'returnToHomepage') {
      window.location.href = 'index.html';
    };
  };

  _redirectIfLoggedIn() {
    const loginToken = locateLoginToken();
    
    if(loginToken) { // already logged in and shouldn't be on this page - redirecting...
      window.location.href = 'index.html';
    };
  };


};

new SignIn();