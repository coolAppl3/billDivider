import createDateString from "../global/createDateString";

class HistoryHeader {
  constructor() {
    this._usernameElement = document.querySelector('#username');
    this._totalSessionsElement = document.querySelector('#totalSessions');
    this._latestSessionDateElement = document.querySelector('#latestSessionDate');
    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('updateHeader', this._renderHeaderInfo.bind(this));
  };

  _renderHeaderInfo(e) {
    const username = e.detail.username;
    const sessions = e.detail.sessions;

    if(!sessions || !username) {
      return ;
    };
    
    this._usernameElement.textContent = username;
    
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

export default HistoryHeader;