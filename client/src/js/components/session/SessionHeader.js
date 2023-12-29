import sessionInfo from "./SessionInfo";

class SessionHeader {
  constructor() {
    this._yourTotal = document.querySelector('#yourTotal');

    this._sharedWith = document.querySelector('#sharedWith');
    this._sharedWithTotal = document.querySelector('#sharedWithTotal');
    this._updateSharedWithBtn = document.querySelector('#updateSharedWith');

    this._debtResult = document.querySelector('#debtResult');
    this._debtResultValue = document.querySelector('#debtResultValue');

    this._currencySpans = document.querySelectorAll('.currency');
    
    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('sessionStarted', this._setSharedWith.bind(this));
    window.addEventListener('sessionStarted', this._setCurrency.bind(this));
    
    this._updateSharedWithBtn.addEventListener('click', this._updateSharedWith.bind(this));
  };

  _setSharedWith() {
    this._sharedWith.textContent = sessionInfo.sharedWith;
  };

  _updateSharedWith(e) {
    // InitSession will listen for this event, and call _displayStartModal()
    window.dispatchEvent(new Event('editSharedWith')); 
  };

  _setCurrency() {
    // This will set the currency throughout the page, not just the header.
    this._currencySpans.forEach((span) => span.textContent = sessionInfo.currency);
  };
};

export default SessionHeader;