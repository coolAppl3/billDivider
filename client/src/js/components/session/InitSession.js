import SessionAPI from "../services/SessionAPI";
import sessionInfo from "./SessionInfo";
import Cookies from "../global/Cookies";

import messagePopup from "../global/messagePopup";
import ErrorSpan from "./ErrorSpan";
import LoadingModal from '../global/LoadingModal';
import locateLoginToken from "../global/locateLoginToken";
import SessionReference from "./SessionReference";

// Initializing imports
const sessionAPI = new SessionAPI();
const cookies = new Cookies();
const errorSpan = new ErrorSpan();

class InitSession {

  constructor() {
    this._startModal = document.querySelector('.start-modal');
    this._startModalForm = document.querySelector('.start-modal-form');
    this._sharedWithInput = document.querySelector('#sharingWith');
    this._optionsContainer = document.querySelector('.options-container');
    this._optionsContainerItems = document.querySelectorAll('.options-container-item');


    this._loadEventListeners();
  };

  _loadEventListeners() {
    this._startModalForm.addEventListener('submit', this._start.bind(this));
    this._optionsContainer.addEventListener('click', this._changeCurrency.bind(this));

    window.addEventListener('editSharedWith', this._editSharedWith.bind(this));
    window.addEventListener('DOMContentLoaded', this._checkUrlForSessionID.bind(this));
  };

  async _checkUrlForSessionID() {
    LoadingModal.display();
    const searchString = window.location.search;
    const sessionID = searchString.substring(1);

    if(!sessionID) {
      LoadingModal.remove();
      return ;
    };

    const loginToken = locateLoginToken();
    if(!loginToken) { // Not logged in. Removing the query string.
      window.location.href = 'session.html';
    };
    
    try {
      const res = await sessionAPI.getSession(loginToken, sessionID);
      const session = await res.data.data;

      sessionInfo.set(session);
      SessionReference.set(session);

      dispatchEvent(new Event('sessionStarted'));
      setTimeout(() => dispatchEvent(new Event('render')), 100);

      this._collapseStartModal();
      this._displayMainSessionElement();
      LoadingModal.remove();

    } catch (err) {
      console.log(err)

      if(!err.response) {
        cookies.remove('loginToken');
        messagePopup('Something went wrong', 'danger');
        setTimeout(() => window.location.href = 'session.html', 500);
        return ;
      };
      
      const status = err.response.status;

      if(status === 403) { // Invalid loginToken
        cookies.remove('loginToken');
        messagePopup('Not logged in. Redirecting...', 'danger');
        setTimeout(() => window.location.href = 'session.html', 500);

      } else if(status === 404) { // Session ID not found
        messagePopup('Session not found', 'danger');
        setTimeout(() => window.location.href = 'session.html', 500);

      } else { // Most likely 500
        cookies.remove('loginToken');
        messagePopup('Something went wrong', 'danger');
        setTimeout(() => window.location.href = 'session.html', 500);
      };
    }
  };

  _start(e) {
    e.preventDefault();

    const validSharedWithInputValue = this._validateSharedWithInput();
    if(!validSharedWithInputValue) {
      return ;
    };

    sessionInfo.sharedWith = this._sharedWithInput.value || 'Friend';
    sessionInfo.currency = this._getSelectedCurrency() || 'RSD';

    this._collapseStartModal();
    this._displayMainSessionElement();
    dispatchEvent(new Event('sessionStarted'));
  };

  _validateSharedWithInput() {
    // Ensuring at least 1 letter is present, and that special characters are not present.
    const re = /^[a-zA-Z0-9\s]*[a-zA-Z][a-zA-Z0-9\s]*$/;

    const inputValue = this._sharedWithInput.value;
    const inputFormGroup = this._sharedWithInput.parentElement;
    
    if(inputValue.length === 0) {
      errorSpan.display(inputFormGroup, 'This field is required.');
      return false;

    } else if(inputValue.length > 15) {
      errorSpan.display(inputFormGroup, 'Can not be longer than 15 characters');
      return false;

    } else if(!re.test(inputValue)) {
      errorSpan.display(inputFormGroup, 'This field must contain at least 1 letter, and must not contain special characters.');
      return false;

    } else {
      errorSpan.hide(inputFormGroup);
      return true;
    };
    
  };

  _editSharedWith() {
    this._displayStartModal();
    const formBtn = this._startModalForm.lastElementChild.firstElementChild;
    formBtn.textContent = 'Update';
  };

  _changeCurrency(e) {
    if(e.target.classList.contains('options-container-item') && !e.target.classList.contains('selected')) {
      this._optionsContainerItems.forEach((item) => item.classList.remove('selected'));
    };

    e.target.classList.add('selected');
  };

  _getSelectedCurrency() {
    let currency;
    
    this._optionsContainerItems.forEach((item) => {
      if(item.classList.contains('selected')) {
        currency = item.getAttribute('data-currency');
      }
    });

    return currency;
  };

  _displayStartModal() {
    if(sessionInfo.sharedWith) {
      this._sharedWithInput.value = sessionInfo.sharedWith;
    };
    
    this._startModal.style.display = 'block';
    setTimeout(() => this._startModal.style.display = 'block', 210);
    this._hideMainSessionElement();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this._startModal.style.transform = 'scale(1)';
        this._sharedWithInput.focus();
      });
    });
  };

  _collapseStartModal() {
    this._startModal.style.transform = 'scale(0)';
    setTimeout(() => this._startModal.style.display = 'none', 200);

    const formBtn = this._startModalForm.lastElementChild.firstElementChild;
    formBtn.textContent = 'Start session';
  };

  _displayMainSessionElement() {
    const sessionElement = document.querySelector('.session');
    sessionElement.style.display = 'block';
    setTimeout(() => sessionElement.style.display = 'block', 210);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        sessionElement.style.opacity = '1';
      });
    });
  };

  _hideMainSessionElement() {
    const sessionElement = document.querySelector('.session');
    sessionElement.style.opacity = '0';
    setTimeout(() => sessionElement.style.display = 'none', 200);
  };
};

export default InitSession;

