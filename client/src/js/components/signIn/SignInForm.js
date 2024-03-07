import SignInAPI from '../services/SignInAPI';
import Cookies from '../global/Cookies';
import RevealPassword from '../signing/RevealPassword';
import LinksContainer from '../signing/LinksContainer';
import LoadingModal from '../global/LoadingModal';
import redirectAfterDelayMillisecond from '../global/redirectAfterDelayMillisecond';
import ErrorSpan from '../global/ErrorSpan';
import FormCheckbox from '../global/FormCheckbox';

// Initializing imports
const signInAPI = new SignInAPI();
const cookies = new Cookies();
const errorSpan = new ErrorSpan();

new FormCheckbox('keepMeSignedIn');
new RevealPassword('password');
new LinksContainer();

class SignInForm {
  constructor() {
    this._signInContainerForm = document.querySelector('.sign-in-container-form');
    this._usernameInput = document.querySelector('#username');
    this._passwordInput = document.querySelector('#password');

    this._keepMeSignedInCheckBox = document.querySelector('#keepMeSignedIn');
    this._loginTokenAge = 1209600000; // 14 days
    
    this._loadEventListeners();
  };

  _loadEventListeners() {
    this._signInContainerForm.addEventListener('submit', this._signIn.bind(this));
  };

  async _signIn(e) {
    e.preventDefault();
    LoadingModal.display();

    const emptyUsername = this._usernameInputIsEmpty();
    const emptyPassword = this._passwordInputIsEmpty();
    
    if(emptyPassword || emptyUsername) {
      LoadingModal.remove();
      return ;
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
        cookies.set('loginToken', loginToken, this._loginTokenAge);
      } else {
        cookies.set('loginToken', loginToken);
      };

      redirectAfterDelayMillisecond('history.html', 1000, 'Signed in successfully!', 'success');
      
    } catch (err) {
      console.log(err)
      
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
      
      if(status === 401) { // incorrect password
        const inputFormGroup = this._passwordInput.parentElement;
        errorSpan.display(inputFormGroup, 'Incorrect password.');
        LoadingModal.remove();
        return ;
      };

      redirectAfterDelayMillisecond('signUp.html', 1000, 'Something went wrong');
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
};

export default SignInForm;