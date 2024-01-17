import fetchUserHistory from "./fetchUserHistory";
import fetchUsername from "./fetchUsername";
import createDateString from "../global/createDateString";

class HistoryHeader {
  constructor() {
    this._usernameElement = document.querySelector('#username');
    this._totalSessionsElement = document.querySelector('#totalSessions');
    this._latestSessionDateElement = document.querySelector('#latestSessionDate');
    
    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('DOMContentLoaded', this._render.bind(this));
    window.addEventListener('render', this._render.bind(this));
  };

  _render() {
    this._renderHeaderInfo();
    this._renderUsername();
  };

  async _renderUsername() {
    const username = await fetchUsername(); 

    if(!username) {
      return ;
    };
    
    this._usernameElement.textContent = username;
  };

  async _renderHeaderInfo() {
    const sessions = await fetchUserHistory();

    if(!sessions) {
      return ;
    };
    
    const totalSessions = this._getTotalSessions(sessions);
    this._totalSessionsElement.textContent = totalSessions;

    const latestSessionDate = this._getLatestSessionDate(sessions);
    this._latestSessionDateElement.textContent = latestSessionDate;
  };

  _getTotalSessions(sessions) {
    let total = 0;

    for(let session of sessions) {
      total++;
    };

    return total;
  };
  
  _getLatestSessionDate(sessions) {
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

export default HistoryHeader;