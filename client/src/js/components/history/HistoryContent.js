import fetchUserHistory from "./fetchUserHistory";
import deleteSession from "./deleteSession";
import SessionElement from "./SessionElement";
import messagePopup from '../global/messagePopup';
import ConfirmModal from '../global/ConfirmModal';

// Initializing imports
const sessionElement = new SessionElement();
const confirmModal = new ConfirmModal();

class HistoryContent {
  constructor() {
    this._historyContentElement = document.querySelector('.history-content');
    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('DOMContentLoaded', this._render.bind(this));
    window.addEventListener('render', this._render.bind(this));

    this._historyContentElement.addEventListener('click', this._handleHistoryContentClickEvents.bind(this));
    this._historyContentElement.addEventListener('keyup', this._handleHistoryContentKeyEvents.bind(this));
  };

  _render() {
    this._clearSessions();
    this._renderSessions();
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

  async _renderSessions() {
    const history = await fetchUserHistory();
    const { sessions } = history;

    const historyEvent = new CustomEvent('updateHeader', { detail: history });
    window.dispatchEvent(historyEvent);

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
};

export default HistoryContent;