import createDateString from "../global/createDateString";
import addThousandComma from '../global/addThousandComma';

class SessionElement {
  create(session) {
    const totals  = {
      yourTotal: session.yourTotal,
      sharedWithTotal: session.sharedWithTotal,
    };
    
    const sessionDiv = this._createSessionDiv(session.sessionID);

    const sessionDate = this._createSessionDate(session.createdOn);
    const sessionSharedWith = this._createSessionSharedWith(session.sharedWith);
    const sessionResult = this._createSessionResult(totals, session.currency);
    const sessionTotalBills = this._createSessionTotalBills(session.billsPaid, session.billsToPay);
    const sessionBtnContainer = this._createSessionBtnContainer(session.sessionID);

    sessionDiv.appendChild(sessionDate);
    sessionDiv.appendChild(sessionSharedWith);
    sessionDiv.appendChild(sessionResult);
    sessionDiv.appendChild(sessionTotalBills);
    sessionDiv.appendChild(sessionBtnContainer);

    return sessionDiv;
  };

  _createSessionDiv(sessionID) {
    const sessionDiv = document.createElement('div');
    sessionDiv.className = 'history-content-session';
    sessionDiv.setAttribute('data-sessionID', sessionID);
    return sessionDiv;
  };

  _createSessionDate(createdOn) {
    const dateString = createDateString(createdOn);
    
    const sessionDate = this._createSessionItem();
    sessionDate.appendChild(this._createTextElement('Created on:'));
    sessionDate.appendChild(this._createTextElement(dateString));
    return sessionDate;
  };

  _createSessionSharedWith(sharedWith) {
    const sessionSharedWith = this._createSessionItem();
    sessionSharedWith.appendChild(this._createTextElement('Shared with:'));
    sessionSharedWith.appendChild(this._createTextElement(sharedWith));
    return sessionSharedWith;
  };

  _createSessionResult(totals, currency) {
    const sessionResult = this._createSessionItem();
    const result = totals.yourTotal - totals.sharedWithTotal;
    
    if(result < 0) {
      sessionResult.appendChild(this._createTextElement('You owe:'));
      sessionResult.appendChild(this._createTextElement(`${addThousandComma(Math.abs(result))} ${currency}`));
      return sessionResult;
    };

    sessionResult.appendChild(this._createTextElement(`You're owed:`));
    sessionResult.appendChild(this._createTextElement(`${addThousandComma(result)} ${currency}`));
    return sessionResult;
  };

  _createSessionTotalBills(billsPaid, billsToPay) {
    let totalBills = 0;
    totalBills += billsPaid.length;
    totalBills += billsToPay.length;

    const sessionTotalBills = this._createSessionItem();
    sessionTotalBills.appendChild(this._createTextElement('Total bills:'));
    sessionTotalBills.appendChild(this._createTextElement(totalBills));
    return sessionTotalBills;
  };

  _createSessionBtnContainer(sessionID) {
    const sessionBtnContainer = this._createSessionItem();
    sessionBtnContainer.appendChild(this._createSessionDisplayBtn(sessionID));
    sessionBtnContainer.appendChild(this._createSessionRemoveBtn());
    return sessionBtnContainer;
  };

  createNoSessionsElement() {
    const noSessionsElement = document.createElement('p');
    noSessionsElement.className = 'no-sessions';
    noSessionsElement.appendChild(document.createTextNode('No previous sessions'));
    return noSessionsElement;
  };

  // Util
  
  _createSessionItem() {
    const sessionItem = document.createElement('div');
    sessionItem.className = 'history-content-session-item';
    return sessionItem;
  };

  _createTextElement(text) {
    const textElement = document.createElement('p');
    textElement.appendChild(document.createTextNode(text));
    return textElement;
  };

  _createSessionDisplayBtn(sessionID) {
    const btn = document.createElement('a');
    btn.href = `session.html?${sessionID}`;
    btn.classList = 'btn btn-border-cta displaySessionBtn';
    btn.appendChild(document.createTextNode('Display session'));
    return btn;
  };

  _createSessionRemoveBtn() {
    const btn = document.createElement('p');
    btn.setAttribute('tabindex', 0);
    btn.classList = 'delete-session text-danger removeSessionBtn';
    btn.appendChild(document.createTextNode('Remove session'));
    return btn;
  };
};

export default SessionElement;