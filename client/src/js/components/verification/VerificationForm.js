import ErrorSpan from "../global/ErrorSpan";
import LoadingModal from "../global/LoadingModal";
import redirectAfterDelayMillisecond from "../global/redirectAfterDelayMillisecond";
import Cookies from "../global/Cookies";
import VerificationAPI from "../services/VerificationAPI";
import messagePopup from "../global/messagePopup";
import LinksContainer from "../signing/LinksContainer";
import generateAPIKey from "../global/generateAPIKey";

// Initializing imports
const errorSpan = new ErrorSpan();
const cookies = new Cookies();
const verificationAPI = new VerificationAPI();
new LinksContainer();

class VerificationForm {
  constructor() {
    this._verificationForm = document.querySelector('.verification-container');
    this._verificationInput = document.querySelector('#verificationInput');
    this._loginTokenAge = 1209600000; // 14 days

    this._resendEmailBtn = document.querySelector('#resendEmailBtn');
    
    this._loadEventListeners();
  };

  _loadEventListeners() {
    this._verificationForm.addEventListener('submit', this._verify.bind(this));

    this._resendEmailBtn.addEventListener('keyup', this._handleResendEmailBtnKeyEvents.bind(this));
    this._resendEmailBtn.addEventListener('click', this._resendVerificationEmail.bind(this));

    window.addEventListener('DOMContentLoaded', this._detectAutoVerification.bind(this));
  };
  
  _detectAutoVerification() {
    const searchParams = new URL(window.location.href).searchParams;
    const verificationCodeInURL = searchParams.get('verificationCode');

    if(!verificationCodeInURL) {
      return ;
    };

    if(verificationCodeInURL.length > 6) {
      return ;
    };

    const verifyEvent = new SubmitEvent('submit', {
      bubbles: true,
      cancelable: true,
    });

    this._verificationInput.value = verificationCodeInURL;
    this._verificationForm.dispatchEvent(verifyEvent);
  };

  async _verify(e) {
    e.preventDefault();
    LoadingModal.display();

    const isValidCode = this._validateCode();
    if(!isValidCode) {
      LoadingModal.remove();
      return ;
    };

    const searchParams = new URL(window.location.href).searchParams;
    const unverifiedUserID = searchParams.get('id');
    const keepMeSignedIn = searchParams.get('keepMeSignedIn'); // Either a "true" string or an empty string
    
    const verificationCode = this._verificationInput.value.toUpperCase();
    const verificationData = { unverifiedUserID, verificationCode };
  
    const APIKey = generateAPIKey();

    try {
      const res = await verificationAPI.verify(APIKey, verificationData);
      const loginToken = await res.data.loginToken;

      if(keepMeSignedIn) {
        cookies.set('loginToken', loginToken, this._loginTokenAge);
      } else {
        cookies.set('loginToken', loginToken);
      };

      redirectAfterDelayMillisecond('history.html', 1000, 'Email verified!', 'success');
      
    } catch (err) {
      err.response && console.log(err.response.data)

      if(!err.response) {
        const pathname = window.location.pathname.substring(1);
        const search = window.location.search;
        
        const redirectLink = `${pathname}${search}`;
        redirectAfterDelayMillisecond(redirectLink);
        
        return ;
      };

      const status = err.response.status;

      if(status === 404) {
        const inputFormGroup = this._verificationInput.parentElement;
        errorSpan.display(inputFormGroup, 'Account does not exist or has already been validated.');
        LoadingModal.remove();
        return ;
      };

      if(status === 401) {
        if(err.response.data.message === 'API key missing or invalid.') {
          const pathname = window.location.pathname.substring(1);
          const search = window.location.search;
          
          const redirectLink = `${pathname}${search}`;
          redirectAfterDelayMillisecond(redirectLink);
          return ;
        };

        const inputFormGroup = this._verificationInput.parentElement;
        errorSpan.display(inputFormGroup, 'Incorrect verification code.');
        LoadingModal.remove();
        return ;
      };

      if(status === 429) { // Too many requests
        messagePopup('Too many requests. Please try again in a few minutes.', 'danger', 5000);
        LoadingModal.remove();
        return ;
      };
     
      const pathname = window.location.pathname.substring(1);
      const search = window.location.search;
      
      const redirectLink = `${pathname}${search}`;
      redirectAfterDelayMillisecond(redirectLink);
    };
  };

  _validateCode() {
    const value = this._verificationInput.value.toUpperCase();
    const inputFormGroup = this._verificationInput.parentElement;

    const re = /^[A-Z0-9]+$/;
    
    if(value.length !== 6) {
      errorSpan.display(inputFormGroup, 'Verification code must be 6 characters long.');
      return false;
    };

    if(value.indexOf(' ') !== -1) {
      errorSpan.display(inputFormGroup, 'Verification code can not contain any whitespace.');
      return false;
    };

    if(!re.test(value)) {
      errorSpan.display(inputFormGroup, 'Verification code can only contain uppercase letters and numbers. Special characters are not possible.');
      return false;
    };
    
    errorSpan.hide(inputFormGroup);
    return true;
  };

  _handleResendEmailBtnKeyEvents(e) {
    if(e.key === 'Enter') {
      this._resendVerificationEmail();
    };
  };

  async _resendVerificationEmail() {
    const searchParams = new URL(window.location.href).searchParams;
    const unverifiedUserID = searchParams.get('id');

    const APIKey = generateAPIKey();
    
    try {
      await verificationAPI.resendVerificationEmail(APIKey, { unverifiedUserID });
      messagePopup('Verification email resent.', 'success');
      
    } catch (err) {
      err.response && console.log(err.response.data);

      if(!err.response) {
        const pathname = window.location.pathname.substring(1);
        const search = window.location.search;
        
        const redirectLink = `${pathname}${search}`;
        redirectAfterDelayMillisecond(redirectLink);
        return ;
      };

      const status = err.response.status;

      

      if(status === 404) {
        messagePopup('Account does not exist or has already been validated.', 'danger', 3000);
        return ;
      };

      if(status === 403) {
        messagePopup('Email resend limit exceeded.', 'danger', 3000);
        return ;
      };

      if(status === 401) {
        if(err.response.data.message === 'API key missing or invalid.') {
          const pathname = window.location.pathname.substring(1);
          const search = window.location.search;
          
          const redirectLink = `${pathname}${search}`;
          redirectAfterDelayMillisecond(redirectLink);
          return ;
        };

        return ;
      };

      if(status === 429) { // Too many requests
        messagePopup('Too many requests. Please try again in a few minutes.', 'danger', 5000);
        LoadingModal.remove();
        return ;
      };
      
      const pathname = window.location.pathname.substring(1);
      const search = window.location.search;
      
      const redirectLink = `${pathname}${search}`;
      redirectAfterDelayMillisecond(redirectLink);
    };
  };
};

export default VerificationForm;