import sessionInfo from "./SessionInfo";
import SessionAPi from "../services/SessionAPI";

import ConfirmModal from "../global/ConfirmModal";
import addThousandComma from '../global/addThousandComma';
import messagePopup from "../global/messagePopup";
import locateLoginToken from "../global/locateLoginToken";

// Initializing imports
const confirmModal = new ConfirmModal();
const sessionAPI = new SessionAPi();

class SessionHeader {
  constructor() {
    this._yourTotal = document.querySelector('#yourTotal');

    this._sharedWith = document.querySelector('#sharedWith');
    this._sharedWithTotal = document.querySelector('#sharedWithTotal');
    this._updateSharedWithBtn = document.querySelector('#updateSharedWith');

    this._debtResult = document.querySelector('#debtResult');
    this._debtResultValue = document.querySelector('#debtResultValue');

    this._currencySpans = document.querySelectorAll('.currency');
    this._sharedWithListHeader = document.querySelector('#sharedWithListHeader');

    this._sessionHeaderControls = document.querySelector('.session-header-controls');
    this._resetSessionBtn = document.querySelector('#resetSessionBtn');
    this._saveSessionBtn = document.querySelector('#saveSessionBtn');
    
    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('sessionStarted', this._setSharedWith.bind(this));
    window.addEventListener('sessionStarted', this._setCurrency.bind(this));
    window.addEventListener('render', this._render.bind(this));

    this._updateSharedWithBtn.addEventListener('click', this._updateSharedWith.bind(this));
    this._sessionHeaderControls.addEventListener('click', this._handleSessionHeaderControlsClickEvents.bind(this));
  };
c
  _render() {
    this._updateTotals();
    this._updateDebtResult();

    this._enableResetButton();
    this._enableSaveButton();
  };

  _updateTotals() {
    this._yourTotal.textContent = addThousandComma(sessionInfo.yourTotal);
    this._sharedWithTotal.textContent = addThousandComma(sessionInfo.sharedWithTotal);
  };

  _updateDebtResult() {
    const difference = sessionInfo.yourTotal - sessionInfo.sharedWithTotal;

    if(difference < 0) { // You owe something
      this._debtResult.textContent = 'You owe';
      this._debtResultValue.textContent = addThousandComma(Math.abs(difference));
    } else { // Either equal or are owed
      this._debtResult.textContent = `You're owed`;
      this._debtResultValue.textContent = addThousandComma(difference);
    };
  };

  _setSharedWith() {
    const sharedWithSpans = document.querySelectorAll('.sharedWithSpan');
    const sharedWithSpansArr = Array.from(sharedWithSpans);

    sharedWithSpansArr.forEach((span) => {
      span.textContent = sessionInfo.sharedWith;
    });
  };

  _updateSharedWith() {
    // InitSession will listen for this event, and call _displayStartModal()
    window.dispatchEvent(new Event('editSharedWith')); 
  };

  _setCurrency() {
    // This will set the currency throughout the page if they exist, not just the header.
    this._currencySpans.forEach((span) => span.textContent = sessionInfo.currency);
  };

  _handleSessionHeaderControlsClickEvents(e) {
    if(e.target.id === 'resetSessionBtn') {
      return this._resetSession();
    };

    if(e.target.id === 'saveSessionBtn') {
      return this._saveSession();
    };
  };

  _resetSession() {
    confirmModal.display('Are you sure you want to clear all the bills in this session?', 'danger');

    const confirmModalElement = document.querySelector('.confirm-modal');
    confirmModalElement.addEventListener('click', (e) => {
      if(confirmModal.isExitClick(e)) {
        confirmModal.removeModal();
        return ;
      };

      if(e.target.id === 'confirmModalConfirmBtn') {
        sessionInfo.reset();
        messagePopup('Session reset', 'success');
        window.dispatchEvent(new Event('render'));
        confirmModal.removeModal();
        return ;
      };
    });
  };

  async _saveSession() {
    // FIX - This should behave differently depending on similar conditions as in enableSaveButton.


    const session = sessionInfo;
    if(!session.createdOn) { // FIX - figure out how to make this work bug-free
      session.createdOn = Date.now();
    };
    
    const loginToken = locateLoginToken();

    try {
      const res = await sessionAPI.addSession(session, loginToken);
      const newSession = res.data.data;
    } catch (err) {
      console.log(err)
    }

    // NOT DONE - ONLY FOR TESTING SO FAR

  };

  _enableResetButton() {
    if(!sessionInfo.billsPaid[0] && !sessionInfo.billsToPay[0]) {
      this._resetSessionBtn.setAttribute('disabled', '');
      this._resetSessionBtn.classList.add('disabled');
    } else {
      this._resetSessionBtn.removeAttribute('disabled');
      this._resetSessionBtn.classList.remove('disabled');
    };
  };

  
  _enableSaveButton() {
    // const isLoggedIn = locateLoginToken();

    this._saveSessionBtn.removeAttribute('disabled');
    this._saveSessionBtn.classList.remove('disabled');
    
    
    // CHECK LATER ----

    // LOCAL AND SESSION STORAGE NO LONGER IN USE - CHANGE THE LOGIC BELOW ACCORDINGLY

    // ADD - If the user is logged in and the sessionInfo object is different than the one in the data base, which we'll store in session storage, then the button should be enabled.
    
    // This button should behave differently depending on whether or not the user is logged in.
    
    // If the user isn't logged in, and there's at least 1 bill, it should be enabled and ready to suggest saving the bill if the user creates an account. 

    // If the user is logged in, but there's no sessionInfo object in session storage, this means that a logged in user is working on a new session. In this case, it should be enabled if the session has at least one bill.

    // If the user is logged in AND there is a sessionInfo object in session storage, that means that the user is editing a session, and the button should be enabled AS LONG AS the sessionInfo object in session storage (from the database) is different than the resulting sessionInfo object.

    // Performance might be a concern with the last part. Also, perhaps having two sessionStorage items, one for the sessionInfo object, and one to confirm the session is being edited, is more ideal. Probably best to handle through a query string in the href from history.js.

  };
};

export default SessionHeader;