import sessionInfo from "./SessionInfo";
import addThousandComma from "./addThousandComma";

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
    
    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('sessionStarted', this._setSharedWith.bind(this));
    window.addEventListener('sessionStarted', this._setCurrency.bind(this));
    this._updateSharedWithBtn.addEventListener('click', this._updateSharedWith.bind(this));
    window.addEventListener('render', this._render.bind(this));
  };

  _render() {
    this._updateTotals();
  };

  _updateTotals() {
    this._yourTotal.textContent = addThousandComma(sessionInfo.yourTotal);
    this._sharedWithTotal.textContent = addThousandComma(sessionInfo.sharedWithTotal);
  };

  // CONTINUE HERE - add a function to update who owes who what in the header

  _setSharedWith() {
    this._sharedWith.textContent = sessionInfo.sharedWith;
    this._sharedWithListHeader.textContent = sessionInfo.sharedWith;
  };

  _updateSharedWith() {
    // InitSession will listen for this event, and call _displayStartModal()
    window.dispatchEvent(new Event('editSharedWith')); 
  };

  _setCurrency() {
    // This will set the currency throughout the page, not just the header.
    this._currencySpans.forEach((span) => span.textContent = sessionInfo.currency);
  };
};

export default SessionHeader;