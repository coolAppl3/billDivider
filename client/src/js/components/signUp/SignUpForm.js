import SignUpAPI from "../services/SignUpAPI";
import RevealPassword from "../signing/RevealPassword";
import LinksContainer from "../signing/LinksContainer";
import LoadingModal from "../global/LoadingModal";
import redirectAfterDelayMillisecond from "../global/redirectAfterDelayMillisecond";
import ErrorSpan from "../global/ErrorSpan";
import FormCheckbox from "../global/FormCheckbox";
import messagePopup from "../global/messagePopup";
import generateAPIKey from "../global/generateAPIKey";

// Initializing imports
const signUpAPI = new SignUpAPI();
const errorSpan = new ErrorSpan();

new FormCheckbox('keepMeSignedIn');
new RevealPassword('password', 'revealPassword');
new RevealPassword('confirmPassword', 'revealConfirmPassword');
new LinksContainer();

class SignUpForm {
  constructor() {
    this._signUpContainerForm = document.querySelector('.sign-up-container-form');
    this._emailInput = document.querySelector('#email');
    this._usernameInput = document.querySelector('#username');
    this._passwordInput = document.querySelector('#password');
    this._confirmPasswordInput = document.querySelector('#confirmPassword');

    this._keepMeSignedInCheckbox = document.querySelector('#keepMeSignedIn');
    this._loginTokenAge = 1209600000; // 14 days

    this._loadEventListeners();
  };

  _loadEventListeners() {
    this._signUpContainerForm.addEventListener('submit', this._signUp.bind(this));
  };

  async _signUp(e) {
    e.preventDefault();
    LoadingModal.display();

    const isValidEmail = this._validateEmail(this._emailInput);
    const isValidUsername = this._validateUsername(this._usernameInput);
    const isValidPassword = this._validatePassword(this._passwordInput);
    const isValidConfirmPassword = this._validateConfirmPassword(this._confirmPasswordInput);

    if(!isValidEmail || !isValidUsername || !isValidPassword || !isValidConfirmPassword) {
      LoadingModal.remove();
      return ;
    };

    const newUser = {
      email: this._emailInput.value.toLowerCase(),
      username: this._usernameInput.value,
      password: this._passwordInput.value,
    };
    
    const APIKey = generateAPIKey();
    
    try {
      const res = await signUpAPI.signUp(APIKey, newUser);
      const unverifiedUserID = res.data.unverifiedUserID;

      let keepMeSignedIn;
      if(this._keepMeSignedInCheckbox.classList.contains('checked')) {
        keepMeSignedIn = true;
      } else {
        keepMeSignedIn = '';
      };

      const redirectLink = `verification.html?id=${unverifiedUserID}&keepMeSignedIn=${keepMeSignedIn}`;
      redirectAfterDelayMillisecond(redirectLink, 2000, 'Account created!', 'success');
      
    } catch (err) {
      err.response && console.log(err.response.data);

      if(!err.response) {
        redirectAfterDelayMillisecond('signUp.html');
        return ;
      };

      const status = err.response.status;
      
      if(status === 401) {
        if(err.response.data.message === 'API key missing or invalid.') {
          redirectAfterDelayMillisecond('signUp.html');
          return ;
        };
        
        // Invalid username or password - The validation functions should prevent HTTP requests with an invalid username or password. However, as an extra layer of security, the page will be reloaded if a malicious user attempts to force an HTTP request with invalid credentials
        redirectAfterDelayMillisecond('signUp.html');
        return ;
      };
      
      if(status === 409) { // Username taken
        if(err.response.data.message === 'Email address already in use.') {
          const inputFormGroup = this._emailInput.parentElement;
          errorSpan.display(inputFormGroup, 'Email address already in use.');
          LoadingModal.remove();
          return ;
        };
        
        const inputFormGroup = this._usernameInput.parentElement;
        errorSpan.display(inputFormGroup, 'Username already taken.');
        LoadingModal.remove();
        return ;
      };

      if(status === 429) { // Too many requests
        messagePopup('Too many requests. Please try again in a few minutes.', 'danger', 5000);
        LoadingModal.remove();
        return ;
      };

      redirectAfterDelayMillisecond('signUp.html');
    };
  };

  _validateEmail(input) {
    const value = input.value;
    const inputFormGroup = input.parentElement;

    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

    if(value.length > 150) {
      errorSpan.display(inputFormGroup, 'Email address can not be longer than 150 characters.');
      return false;
    };

    if(value.indexOf(' ') !== -1) {
      errorSpan.display(inputFormGroup, 'Email address can not contain any whitespace.');
      return false;
    };
    
    if(!re.test(value)) {
      errorSpan.display(inputFormGroup, 'Invalid email address.');
      return false;
    };

    errorSpan.hide(inputFormGroup);
    return true;
  };

  _validateUsername(input) {
    const value = input.value;
    const inputFormGroup = input.parentElement;
    
    const re = /^[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*$/;
    
    if(value.length < 5) {
      errorSpan.display(inputFormGroup, 'Username must be at least 5 characters long.');
      return false;
    };
    
    if(value.length > 24) {
      errorSpan.display(inputFormGroup, 'Username can not be longer than 24 characters.');
      return false;
    };
    
    if(value.indexOf(' ') !== -1) {
      errorSpan.display(inputFormGroup, 'Whitespace is not allowed.');
      return false;
    };
    
    if(!re.test(value)) {
      errorSpan.display(inputFormGroup, 'Username must contain at least one English letter, and must not special characters or non-English letters.');
      return false;
    };
    
    errorSpan.hide(inputFormGroup);
    return true;
  };

  _validatePassword(input) {
    const value = input.value;
    const inputFormGroup = input.parentElement;

    const re = /^[a-zA-Z0-9_.]+$/;
    
    if(value.length < 8) {
      errorSpan.display(inputFormGroup, 'Password must be at least 8 characters long.');
      return false;
    };
    
    if(value.length > 40) {
      errorSpan.display(inputFormGroup, 'Password can not be longer than 40 characters.');
      return false;
    };
    
    if(value.indexOf(' ') !== -1) {
      errorSpan.display(inputFormGroup, 'Whitespace is not allowed.');
      return false;
    };
    
    if(!re.test(value)) {
      errorSpan.display(inputFormGroup, 'Special characters, apart from dots and underscores, are not allowed.');
      return false;
    };
    
    errorSpan.hide(inputFormGroup);
    return true;
  };

  _validateConfirmPassword(input) {
    const value = input.value;
    const inputFormGroup = input.parentElement;

    const passwordValue = this._passwordInput.value;

    if(value !== passwordValue) {
      errorSpan.display(inputFormGroup, 'Passwords are not identical.');
      return false;
    };

    errorSpan.hide(inputFormGroup);
    return true;
  };
};

export default SignUpForm;