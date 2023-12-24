import '../scss/main.scss';
import SignUpAPI from './components/services/SignUpAPI';
import MessageDialog from './components/global/MessageDialog';

// Initializing imports
const signUpAPI = new SignUpAPI();
const messageDialog = new MessageDialog();


class SignUp {
  constructor() {
    this._signupContainerForm = document.querySelector('.sign-up-container-form');
    this._usernameInput = document.querySelector('#username');
    this._passwordInput = document.querySelector('#password');

    this._loadEventListeners();
  };

  _loadEventListeners() {
    this._signupContainerForm.addEventListener('submit', this._signupUser.bind(this));
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
      const data = await signUpAPI.signUp(newUser);
      // continue.........
    } catch (error) {
      
      if(error.response) { // There's a response object
        const statusCode = error.response.status;

        if(statusCode === 401) { // Invalid username or password - Just as an extra layer of safety.
          // messageDialog.display('Sign up failed. Invalid username or password.', 'danger');
          this._displayErrorSpan('username', 'Invalid username')

        } else if(statusCode === 409) { // Username taken
          this._displayErrorSpan('username', 'Username already taken.')
        };;

      } else { // There's no response object
        messageDialog.display('Username already exists.');
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
};

new SignUp();