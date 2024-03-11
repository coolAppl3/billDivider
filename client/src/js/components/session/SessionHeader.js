import sessionInfo from "./SessionInfo";
import SessionAPI from "../services/SessionAPI";
import ConfirmModal from "../global/ConfirmModal";
import addThousandComma from '../global/addThousandComma';
import messagePopup from "../global/messagePopup";
import locateLoginToken from "../global/locateLoginToken";
import SessionReference from "./SessionReference";
import LoadingModal from "../global/LoadingModal";
import redirectAfterDelayMillisecond from "../global/redirectAfterDelayMillisecond";

// Initializing imports
const confirmModal = new ConfirmModal();
const sessionAPI = new SessionAPI();

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
    window.addEventListener('sessionStarted', this._handleSessionStartedEvents.bind(this));
    window.addEventListener('render', this._render.bind(this));

    this._updateSharedWithBtn.addEventListener('click', this._updateSharedWith.bind(this));
    this._updateSharedWithBtn.addEventListener('keyup', this._handleUnsharedWithBtnKeyEvents.bind(this));
    this._sessionHeaderControls.addEventListener('click', this._handleSessionHeaderControlsClickEvents.bind(this));
  };

  _render() {
    this._updateTotals();
    this._updateDebtResult();
    this._enableResetButton();
    this._handleSaveButtonStatus();
  };

  _handleSessionStartedEvents() {
    this._setSharedWith();
    this._setCurrency();
    this._handleSaveButtonStatus();
  };

  _updateTotals() {
    this._yourTotal.textContent = addThousandComma(sessionInfo.yourTotal);
    this._sharedWithTotal.textContent = addThousandComma(sessionInfo.sharedWithTotal);
  };

  _updateDebtResult() {
    const difference = sessionInfo.yourTotal - sessionInfo.sharedWithTotal;

    if(difference < 0) {
      this._debtResult.textContent = 'You owe';
      this._debtResultValue.textContent = addThousandComma(Math.abs(difference));
      return ;
    };

    this._debtResult.textContent = `You're owed`;
    this._debtResultValue.textContent = addThousandComma(difference);
  };

  _setSharedWith() {
    const sharedWithSpans = document.querySelectorAll('.sharedWithSpan');
    
    for(const span of sharedWithSpans) {
      span.textContent = sessionInfo.sharedWith;
      span.setAttribute('title', sessionInfo.sharedWith);
    };
  };

  _handleUnsharedWithBtnKeyEvents(e) {
    if(e.key === 'Enter') {
      this._updateSharedWith();
    };
  };
  
  _updateSharedWith() {
    // InitSession will listen for this event, and call _displayStartModal()
    window.dispatchEvent(new Event('editSharedWith')); 
  };

  _setCurrency() {
    // This will set the currency throughout the page if they exist, not just the header.
    for(const span of this._currencySpans) {
      span.textContent = sessionInfo.currency
    };
  };

  _handleSessionHeaderControlsClickEvents(e) {
    if(e.target.id === 'resetSessionBtn') {
      this._resetSession();
      return ;
    };

    if(e.target.id === 'saveSessionBtn') {
      this._saveSession();
      return ;
    };
  };

  _resetSession() {
    confirmModal.display('Are you sure you want to clear all the bills in this session?', 'danger');

    const confirmModalElement = document.querySelector('.confirm-modal');
    confirmModalElement.addEventListener('click', (e) => {
      if(confirmModal.isExitClick(e)) {
        confirmModal.remove();
        return ;
      };

      if(e.target.id === 'confirmModalConfirmBtn') {
        sessionInfo.reset();
        messagePopup('Session reset', 'success');
        window.dispatchEvent(new Event('render'));
        confirmModal.remove();
        return ;
      };
    });
  };

  async _saveSession() {
    LoadingModal.display();

    // If the save button was somehow clicked despite not having any unsaved changes, then it was enabled by DOM manipulation. The code below protects against that situation
    const unsavedSessionChanges = JSON.parse(sessionStorage.getItem('unsavedSessionChanges'));
    if(!unsavedSessionChanges) {
      SessionReference.referenceExists()
        ? redirectAfterDelayMillisecond('history.html')
        : redirectAfterDelayMillisecond('session.html')
      ;

      return ;
    };
    
    const loginToken = locateLoginToken();
    if(!loginToken) {
      redirectAfterDelayMillisecond('session.html');
      return ;
    };
    
    if(SessionReference.referenceExists() && SessionReference.changesMade()) {
      try {
        await sessionAPI.updateSession(loginToken, sessionInfo.sessionID, sessionInfo);
        redirectAfterDelayMillisecond('history.html', 1000, 'Session successfully updated', 'success');

      } catch (err) {
        console.log(err);
        redirectAfterDelayMillisecond('history.html');
      };

      return ;
    };

    // User logged in, but not editing a session
    try {
      const timestamp = Date.now();
      sessionInfo.createdOn = timestamp;

      await sessionAPI.addSession(loginToken, sessionInfo);
      redirectAfterDelayMillisecond('history.html', 1000, 'Session saved', 'success');

    } catch (err) {
      console.log(err);
      redirectAfterDelayMillisecond('session.html');
    };
  };

  _enableResetButton() {
    if(sessionInfo.billsPaid.length === 0 && sessionInfo.billsToPay.length === 0) {
      this._resetSessionBtn.setAttribute('disabled', '');
      this._resetSessionBtn.classList.add('disabled');
      return ;
    };

    this._resetSessionBtn.removeAttribute('disabled');
    this._resetSessionBtn.classList.remove('disabled');
  };
  
  _handleSaveButtonStatus() {
    const loginToken = locateLoginToken();
    
    if(!loginToken) {
      this._saveSessionBtn.setAttribute('title', 'Available when logged in');
      this._disableSaveBtn();
      return ;
    };
    
    if(SessionReference.referenceExists()) {
      if(SessionReference.changesMade()) {
        this._enableSaveBtn();
        return ;
      };

      this._disableSaveBtn();
      return ;
    };
    
    if(sessionInfo.isEmpty()) {
      this._disableSaveBtn();
      return ;
    };

    this._enableSaveBtn();
  };

  _enableSaveBtn() {
    sessionStorage.setItem('unsavedSessionChanges', true);
    
    this._saveSessionBtn.removeAttribute('disabled');
    this._saveSessionBtn.classList.remove('disabled');
  };

  _disableSaveBtn() {
    sessionStorage.setItem('unsavedSessionChanges', false);
    
    this._saveSessionBtn.setAttribute('disabled', 'true');
    this._saveSessionBtn.classList.add('disabled');
  };
};

export default SessionHeader;