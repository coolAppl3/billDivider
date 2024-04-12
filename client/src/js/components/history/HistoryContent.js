import fetchUserHistory from "./fetchUserHistory";
import deleteSession from "./deleteSession";
import SessionElement from "./SessionElement";
import messagePopup from '../global/messagePopup';
import ConfirmModal from '../global/ConfirmModal';
import createDateString from "../global/createDateString";

// Initializing imports
const sessionElement = new SessionElement();
const confirmModal = new ConfirmModal();

class HistoryContent {
  constructor() {
    this._historyContentElement = document.querySelector('.history-content');

    this._usernameElement = document.querySelector('#username');
    this._totalSessionsElement = document.querySelector('#totalSessions');
    this._latestSessionDateElement = document.querySelector('#latestSessionDate');
    
    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('DOMContentLoaded', this._render.bind(this));
    window.addEventListener('render', this._render.bind(this));

    this._historyContentElement.addEventListener('click', this._handleHistoryContentClickEvents.bind(this));
    this._historyContentElement.addEventListener('keyup', this._handleHistoryContentKeyEvents.bind(this));
  };

  async _render() {
    const history = await fetchUserHistory();

    if(!history) {
      return ;
    };
    
    const { sessions, username } = history;
    
    this._clearSessions();
    this._renderSessions(sessions);
    this._renderHeaderInfo(sessions, username);
  };

  _handleHistoryContentKeyEvents(e) {
    const pressedKey = e.key;

    if(pressedKey === 'Enter') {
      this._handleHistoryContentClickEvents(e);
    };
  };

  _handleHistoryContentClickEvents(e) {
    if(e.target.classList.contains('removeSessionBtn')) {
      this._removeSession(e);
      return ;
    };
  };

  _renderSessions(sessions) {
    if(!sessions) {
      return ;
    };
    
    if(sessions.length === 0) {
      const noSessionsElement = sessionElement.createNoSessionsElement();
      this._historyContentElement.appendChild(noSessionsElement);

      window.dispatchEvent(new Event('sessionsLoaded'));
      return ;
    };

    const reversedSessions = sessions.toReversed();
    for(let session of reversedSessions) {
      const sessionItem = sessionElement.create(session);
      this._historyContentElement.appendChild(sessionItem);
    };

    window.dispatchEvent(new Event('sessionsLoaded'));
  };
  
  async _removeSession(e) {
    const sessionElement = e.target.parentElement.parentElement;
    const sessionID = sessionElement.getAttribute('data-sessionID');

    confirmModal.display('Are you sure you want to remove this session?', 'danger');
    sessionElement.style.boxShadow = '0px 0px 5px #bd2130 inset';
    
    const confirmModalElement = document.querySelector('.confirm-modal');
    confirmModalElement.addEventListener('click', async function eventHandler(e) {

      if(confirmModal.isExitClick(e)) {
        sessionElement.style.boxShadow = 'none';
        confirmModalElement.removeEventListener('click', eventHandler);
        confirmModal.remove();
        return ;
      };

      if(e.target.id === 'confirmModalConfirmBtn') {
        await deleteSession(sessionID);
        messagePopup('Session removed', 'success');
        confirmModalElement.removeEventListener('click', eventHandler);
        confirmModal.remove();
        
        window.dispatchEvent(new Event('render'));
      };
    }.bind(this));
  };

  _clearSessions() {
    const sessionElementsArray = Array.from(this._historyContentElement.childNodes);
    
    for(let session of sessionElementsArray) {
      session.remove();
    };
  };

  _renderHeaderInfo(sessions, username) {
    if(username) {
      this._usernameElement.textContent = username;
    };
    
    const totalSessions = this._getTotalSessions(sessions);
    this._totalSessionsElement.textContent = totalSessions;

    const latestSessionDate = this._getLatestSessionDate(sessions);
    this._latestSessionDateElement.textContent = latestSessionDate;
  };

  _getTotalSessions(sessions) {
    if(!sessions || !Array.isArray(sessions)) {
      return ;
    };
    
    let total = sessions.length;
    return total;
  };

  _getLatestSessionDate(sessions) {
    if(!sessions || !Array.isArray(sessions)) {
      return ;
    };
    
    if(sessions.length === 0) {
      const latestSessionDate = '-';
      return latestSessionDate;
    };
    
    const timestampArr = sessions.map((sessions) => sessions.createdOn);

    let latestTimestamp = timestampArr[0];
    timestampArr.forEach((timestamp) => {
      if(timestamp > latestTimestamp) {
        latestTimestamp = timestamp;
      };
    });

    const latestSessionDate = createDateString(latestTimestamp);
    return latestSessionDate;
  };
};

export default HistoryContent;