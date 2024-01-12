import sessionInfo from "./SessionInfo";

import ConfirmModal from "../global/ConfirmModal";
import addThousandComma from "./addThousandComma";
import messagePopup from "../global/messagePopup";

// Initializing imports
const confirmModal = new ConfirmModal();

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
      this._resetSession();
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
  
};

export default SessionHeader;