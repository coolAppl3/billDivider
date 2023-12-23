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
      return ;
    };

    const newUser = { username: this._usernameInput.value, password: this._passwordInput.value };
    
    try {
      const data = await signUpAPI.signUp(newUser);
      // continue...
    } catch (error) {
      
      if(error.response) { // There's a response object
        const statusCode = error.response.status;

        if(statusCode === 401) { // Invalid username or password - Just as an extra layer of safety.
          messageDialog.display('Sign up failed. Invalid username or password.', 'danger');

        } else if(statusCode === 409) { // Username taken
          messageDialog.display('Sign up failed. Username is already taken.', 'danger');

          this._usernameInput.nextElementSibling.textContent = 'Username already taken.';
          this._usernameInput.parentElement.classList.add('error');
        };;

      } else { // There's no response object
        messageDialog.display('Username already exists.');
      };
      
    }
  };

  _validateUsername(username) {
    // Username must contain at least 5, but no more than 24, characters. It also must have at least 1 letter, and must not contain any special characters or whitespace.
    const re = /^[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*$/;
    
    if(username.length < 5) {
      this._usernameInput.nextElementSibling.textContent = 'Username must be at least 5 characters long.';
      this._usernameInput.parentElement.classList.add('error');
      return false;

    } else if(username.length > 24) {
      this._usernameInput.nextElementSibling.textContent = 'Username can not be longer than 24 characters.';
      this._usernameInput.parentElement.classList.add('error');
      return false;

    } else if(!re.test(username)) {
      this._usernameInput.nextElementSibling.textContent = 'Username must contain at least one letter, and must not contain any whitespace or special characters.';
      this._usernameInput.parentElement.classList.add('error');
      return false;

    } else {
      this._usernameInput.nextElementSibling.textContent = '';
      this._usernameInput.parentElement.classList.remove('error');
      return true;
    };
    
  };

  _validatePassword(password) {
    // Password must contain at least 8, but no more than 24, characters. It also must not contain any whitespace.
    const re = /^\S*$/;
    
    if(password.length < 8) {
      this._passwordInput.nextElementSibling.textContent = 'Password must be at least 8 characters long.';
      this._passwordInput.parentElement.classList.add('error');
      return false;

    } else if(password.length > 24) {
      this._passwordInput.nextElementSibling.textContent = 'Password can not be longer than 24 characters.';
      this._passwordInput.parentElement.classList.add('error');
      return false;

    } else if(!re.test(password)) {
      this._passwordInput.nextElementSibling.textContent = 'Password can not contain any whitespace.';
      this._passwordInput.parentElement.classList.add('error');
      return false;

    } else {
      this._passwordInput.nextElementSibling.textContent = '';
      this._passwordInput.parentElement.classList.remove('error');
      return true;
    };
  };

};

new SignUp();