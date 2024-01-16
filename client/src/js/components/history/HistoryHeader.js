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
  };

  _render() {
    this._renderHeaderInfo();
    this._renderUsername();
  };

  async _renderUsername() {
    const username = await fetchUsername(); 
    console.log(username)
    this._usernameElement.textContent = username;
  };

  async _renderHeaderInfo() {
    const sessions = await fetchUserHistory();
    
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
  
  _getLatestSessionDate(session) {
    const timestampArr = session.map((session) => session.createdOn);

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