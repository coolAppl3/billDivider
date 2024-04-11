import SignInAPI from '../services/SignInAPI';
import Cookies from '../global/Cookies';
import RevealPassword from '../signing/RevealPassword';
import LinksContainer from '../signing/LinksContainer';
import LoadingModal from '../global/LoadingModal';
import redirectAfterDelayMillisecond from '../global/redirectAfterDelayMillisecond';
import ErrorSpan from '../global/ErrorSpan';
import FormCheckbox from '../global/FormCheckbox';
import messagePopup from '../global/messagePopup';
import generateAPIKey from "../global/generateAPIKey";

// Initializing imports
const signInAPI = new SignInAPI();
const cookies = new Cookies();
const errorSpan = new ErrorSpan();

new FormCheckbox('keepMeSignedIn');
new RevealPassword('password', 'revealPassword');
new LinksContainer();

class SignInForm {
  constructor() {
    this._signInContainerForm = document.querySelector('.sign-in-container-form');
    this._usernameInput = document.querySelector('#username');
    this._passwordInput = document.querySelector('#password');

    this._keepMeSignedInCheckBox = document.querySelector('#keepMeSignedIn');
    this._loginTokenAge = 1209600000; // 14 days

    this._recoveryBtn = document.querySelector('#recovery');
    
    this._loadEventListeners();
  };

  _loadEventListeners() {
    this._signInContainerForm.addEventListener('submit', this._signIn.bind(this));

    this._recoveryBtn.addEventListener('keyup', this._handleRecoveryBtnKeyEvents.bind(this));
    this._recoveryBtn.addEventListener('click', this._startAccountRecovery.bind(this));
  };

  async _signIn(e) {
    e.preventDefault();
    LoadingModal.display();

    const isValidUsername = this._validateUsername();
    const isValidPassword = this._validatePassword();
    
    if(!isValidUsername || !isValidPassword) {
      LoadingModal.remove();
      return ;
    };

    const user = {
      username: this._usernameInput.value,
      password: this._passwordInput.value,
    }
    
    const APIKey = generateAPIKey();
    
    try {
      const res = await signInAPI.signIn(APIKey, user);
      const loginToken = res.data.loginToken;

      // Saving the loginToken depending on the user's preference.
      if(this._keepMeSignedInCheckBox.classList.contains('checked')) {
        cookies.set('loginToken', loginToken, this._loginTokenAge);
      } else {
        cookies.set('loginToken', loginToken);
      };

      redirectAfterDelayMillisecond('history.html', 1000, 'Signed in successfully!', 'success');
      
    } catch (err) {
      err.response && console.log(err.response.data);

      if(!err.response) {
        cookies.remove('loginToken');
        redirectAfterDelayMillisecond('signIn.html');
        return ;
      };
      
      const status = err.response.status;

      if(status === 404) { // username doesn't exist
        const inputFormGroup = this._usernameInput.parentElement;
        errorSpan.display(inputFormGroup, `Username doesn't exist.`);
        LoadingModal.remove();
        return ;
      };
      
      if(status === 401) {
        if(err.response.data.message === 'API key missing or invalid.') {
          redirectAfterDelayMillisecond('signIn.html');
          return ;
        };

        const inputFormGroup = this._passwordInput.parentElement;
        errorSpan.display(inputFormGroup, 'Incorrect password.');
        LoadingModal.remove();
        return ;
      };

      if(status === 403) { // email not verified or account locked
        if(err.response.data.message === 'Email not verified.') {
          const inputFormGroup = this._passwordInput.parentElement;
          errorSpan.display(inputFormGroup, 'Email not verified. Please check your email to complete the verification process.');
          LoadingModal.remove();
          return ;
        };
        
        const inputFormGroup = this._passwordInput.parentElement;
        errorSpan.display(inputFormGroup, 'Account locked due to many failed sign in attempts. Click "Forgot my password" above to recover your account.');
        LoadingModal.remove();
        return ;
      };

      if(status === 429) { // Too many requests
        messagePopup('Too many requests. Please try again in a few minutes.', 'danger', 5000);
        LoadingModal.remove();
        return ;
      };

      redirectAfterDelayMillisecond('signIn.html');
    }
  };

  _validateUsername() {
    const value = this._usernameInput.value;
    const inputFormGroup = this._usernameInput.parentElement;
    
    if(value.length < 5) {
      errorSpan.display(inputFormGroup, 'Usernames can not be less than 5 characters long');
      return false;

    } else if(value.length > 24) {
      errorSpan.display(inputFormGroup, 'Usernames can not be more than 24 characters long');
      return false;
      
    } else if(value.indexOf(' ') !== -1) {
      errorSpan.display(inputFormGroup, 'Usernames can not contain whitespace.');
      return false;
    };

    errorSpan.hide(inputFormGroup);
    return true;
  };

  _validatePassword() {
    const value = this._passwordInput.value;
    const inputFormGroup = this._passwordInput.parentElement;
    
    if(value.length < 8) {
      errorSpan.display(inputFormGroup, 'Passwords can not be less than 8 characters long');
      return false;

    } else if(value.length > 40) {
      errorSpan.display(inputFormGroup, 'Passwords can not be more than 40 characters long');
      return false;

    } else if(value.indexOf(' ') !== -1) {
      errorSpan.display(inputFormGroup, 'Passwords can not contain whitespace.');
      return false;
    };

    errorSpan.hide(inputFormGroup);
    return true;
  };

  _handleRecoveryBtnKeyEvents(e) {
    if(e.key === 'Enter') {
      this._startAccountRecovery();
    };
  };

  _startAccountRecovery() {
    LoadingModal.display();
    redirectAfterDelayMillisecond('recovery.html', 1000, 'Starting account recovery process.', 'cta');
  };
};

export default SignInForm;