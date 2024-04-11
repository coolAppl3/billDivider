import RecoveryAPI from "../services/RecoveryAPI";
import LinksContainer from "../signing/LinksContainer";
import ErrorSpan from "../global/ErrorSpan";
import redirectAfterDelayMillisecond from "../global/redirectAfterDelayMillisecond";
import LoadingModal from "../global/LoadingModal";
import messagePopup from "../global/messagePopup";
import generateAPIKey from "../global/generateAPIKey";

// Initializing imports
const recoveryAPI = new RecoveryAPI();
const errorSpan = new ErrorSpan();

new LinksContainer();

class RecoveryForm {
  constructor() {
    this._recoveryForm = document.querySelector('.recovery-container');
    this._recoveryInput = document.querySelector('#recoveryInput');

    this._loadEventListeners();
  };

  _loadEventListeners() {
    this._recoveryForm.addEventListener('submit', this._sendRecoveryCode.bind(this));
  };
  
  async _sendRecoveryCode(e) {
    e.preventDefault();
    LoadingModal.display();
    
    const isValidEmail = this._validateRecoveryEmail();
    if(!isValidEmail) {
      LoadingModal.remove();
      return ;
    };

    const recoveryEmail = this._recoveryInput.value;
    const APIKey = generateAPIKey();
    
    try {
      await recoveryAPI.sendRecoveryEmail(APIKey, { recoveryEmail });
      this._recoveryInput.value = '';
      redirectAfterDelayMillisecond('index.html', 5000, `Recovery email sent. Follow its instructions to continue.`, 'success');
      
    } catch (err) {
      err.response && console.log(err.response.data);

      if(!err.response) {
        redirectAfterDelayMillisecond('recovery.html');
        return ;
      };

      const status = err.response.status;
      const inputFormGroup = this._recoveryInput.parentElement;

      if(status === 401) {
        if(err.response.data.message === 'API key missing or invalid.') {
          redirectAfterDelayMillisecond('recovery.html');
          return ;
        };
        
        errorSpan.display(inputFormGroup, 'Invalid email address.');
        LoadingModal.remove();
        return ;
      };

      if(status === 404) {
        errorSpan.display(inputFormGroup, 'No accounts found with this email address.');
        LoadingModal.remove();
        return ;
      };

      if(status === 403) {
        errorSpan.display(inputFormGroup, 'Account not verified. Can not recover an unverified account.');
        LoadingModal.remove();
        return ;
      };

      if(status === 429) {
        if(err.response.data.message === 'Too many requests.') {
          messagePopup('Too many requests. Please try again in a few minutes.', 'danger', 5000);
          LoadingModal.remove();
          return ;
        };
        
        errorSpan.display(inputFormGroup, 'A recovery email has already been sent within the last 24 hours. Please try again later.');
        LoadingModal.remove();
        return ;
      };

      redirectAfterDelayMillisecond('recovery.html');
    };
  };

  _validateRecoveryEmail() {
    const value = this._recoveryInput.value;
    const inputFormGroup = this._recoveryInput.parentElement;

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
};

export default RecoveryForm;