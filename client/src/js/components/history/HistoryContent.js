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
  };

  _render() {
    this._clearSessions();
    this._renderSessions();
  };

  _handleHistoryContentClickEvents(e) {
    e.preventDefault();
    
    if(e.target.classList.contains('displaySessionBtn')) {
      this._displaySession(e);
    };

    if(e.target.classList.contains('removeSessionBtn')) {
      return this._removeSession(e);
    };
  };

  async _renderSessions() {
    const sessions = await fetchUserHistory();

    if(!sessions) {
      return ;
    };

    if(sessions.length === 0) {
      const noSessionsElement = sessionElement.createNoSessionsElement();
      this._historyContentElement.appendChild(noSessionsElement);

      dispatchEvent(new Event('sessionsLoaded'));
      return ;
    };
    
    for(let session of sessions) {
      const sessionItem = sessionElement.create(session);
      this._historyContentElement.appendChild(sessionItem);
    };

    dispatchEvent(new Event('sessionsLoaded'));
  };
  
  async _removeSession(e) {
    const sessionElement = e.target.parentElement.parentElement;
    const sessionID = sessionElement.getAttribute('data-sessionID');

    confirmModal.display('Are you sure you want to remove this session?', 'danger');
    sessionElement.style.boxShadow = '0px 0px 5px #bd2130 inset';
    
    const confirmModalElement = document.querySelector('.confirm-modal');
    confirmModalElement.addEventListener('click', async (e) => {

      if(confirmModal.isExitClick(e)) {
        sessionElement.style.boxShadow = 'none';
        confirmModal.remove();
        return ;
      };

      if(e.target.id === 'confirmModalConfirmBtn') {
        await deleteSession(sessionID);
        messagePopup('Session removed', 'success');
        confirmModal.remove();
        
        dispatchEvent(new Event('render'));
      };
    });
    
  };

  _displaySession(e) {
    const link = e.target.href;
    window.location.href = link;
  };

  _clearSessions() {
    const sessionElementsArray = Array.from(this._historyContentElement.childNodes);

    // Not really needed, but here for safety if more functionality is added in the future.
    if(sessionElementsArray.length === 0) { 
      return ;
    };
    
    for(let session of sessionElementsArray) {
      session.remove();
    };
  };
};

export default HistoryContent;