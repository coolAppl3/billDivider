import ErrorSpan from "../global/ErrorSpan";
import RevealPassword from "../signing/RevealPassword";
import LinksContainer from "../signing/LinksContainer";
import LoadingModal from "../global/LoadingModal";
import redirectAfterDelayMillisecond from "../global/redirectAfterDelayMillisecond";
import Cookies from "../global/Cookies";
import RecoveryAPI from "../services/RecoveryAPI";

// Initializing imports
const errorSpan = new ErrorSpan();
const cookies = new Cookies();
const recoveryAPI = new RecoveryAPI();

new RevealPassword('password', 'revealPassword');
new RevealPassword('confirmPassword', 'revealConfirmPassword');
new LinksContainer();


class UpdatePasswordForm {
  constructor() {
    this._form = document.querySelector('.updatePassword-container');
    this._passwordInput = document.querySelector('#password');
    this._confirmPasswordInput = document.querySelector('#confirmPassword');

    this._loadEventListeners();
  };

  _loadEventListeners() {
    this._form.addEventListener('submit', this._updatePassword.bind(this));
  };

  async _updatePassword(e) {
    e.preventDefault();
    LoadingModal.display();

    const isValidPassword = this._validatePassword(this._passwordInput);
    const isValidConfirmPassword = this._validateConfirmPassword(this._confirmPasswordInput);

    if(!isValidPassword || !isValidConfirmPassword) {
      LoadingModal.remove();
      return ;
    };

    const searchParams = new URL(window.location.href).searchParams;
    const userID = searchParams.get('id');
    const recoveryCode = searchParams.get('recoveryCode');

    const newPassword = this._passwordInput.value;
    const recoveryData = { userID, recoveryCode, newPassword };

    try {
      const res = await recoveryAPI.updatePassword(recoveryData);
      const loginToken = res.data.loginToken;

      cookies.set('loginToken', loginToken);
      redirectAfterDelayMillisecond('history.html', 1000, 'Account recovered successfully!', 'success');
      
    } catch (err) {
      err.response && console.log(err.response.data);

      if(!err.response) {
        redirectAfterDelayMillisecond(`updatePassword.html${window.location.search}`);
        return ;
      };

      const status = err.response.status;
      const passwordInputFormGroup = this._passwordInput.parentElement;

      if(status === 404) {
        errorSpan.display(passwordInputFormGroup, 'Invalid request. Please follow the link in the recovery email and do not amend it.');
        LoadingModal.remove();
        return ;
      };

      if(status === 401) {
        errorSpan.display(passwordInputFormGroup, 'Invalid recovery code. Please follow the link in the recovery email and do not amend it.');
        LoadingModal.remove();
        return ;

      };

      if(status === 409) {
        errorSpan.display(passwordInputFormGroup, 'Invalid password.');
        LoadingModal.remove();
        return ;
      };

      redirectAfterDelayMillisecond(`updatePassword.html${window.location.search}`);
    }
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

export default UpdatePasswordForm;