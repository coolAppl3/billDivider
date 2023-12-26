import '../scss/main.scss';
import SignInAPI from './components/services/SignInAPI';
import messageDialog from './components/global/messageDialog';
import loadingModal from './components/global/loadingModal';

// Initializing imports
const signInAPI = new SignInAPI();

class SignIn {
  constructor() {
    this._signInContainerForm = document.querySelector('.sign-in-container-form');
    this._usernameInput = document.querySelector('#username');
    this._passwordInput = document.querySelector('#password');
    this._keepMeSignedInCheckBox = document.querySelector('#keepMeSignedIn');
    this._linksContainer = document.querySelector('.links-container');

    this._loadEventListeners();
  };

  _loadEventListeners() {
    this._signInContainerForm.addEventListener('submit', this._signIn.bind(this));
    this._keepMeSignedInCheckBox.addEventListener('click', this._displayCheckBox.bind(this));
    this._linksContainer.addEventListener('click', this._handleFormLinks.bind(this));
  };

  async _signIn(e) {
    e.preventDefault();

    // Ensuring neither inputs is empty
    this._usernameInputIsEmpty();
    this._passwordInputIsEmpty();
    
    if(this._usernameInputIsEmpty() || this._passwordInputIsEmpty()) {
      return ; // At least one field is empty - function will not continue.
    };

    // CONTINUE WHEN READY -----
    // const res = await signInAPI.signIn(user);
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