import HistoryHeader from "../../../js/components/history/HistoryHeader";

import createDateString from "../../../js/components/global/createDateString";
jest.mock('../../../js/components/global/createDateString');

let historyHeaderHTML = `
  <section class="history section-p">
    <div class="container">
      <!-- History Header -->
      <div class="history-header">
        <div class="history-header-container">
          <div class="history-header-container-item">
            <p class="history-header-container-item-title">Username</p>
            <p
              class="history-header-container-item-value"
              id="username"
            ></p>
          </div>

          <div class="history-header-container-item">
            <p class="history-header-container-item-title">Total sessions</p>
            <p
              class="history-header-container-item-value"
              id="totalSessions"
            ></p>
          </div>

          <div class="history-header-container-item">
            <p class="history-header-container-item-title">Latest session</p>
            <p
              class="history-header-container-item-value"
              id="latestSessionDate"
            ></p>
          </div>
        </div>

        <div class="history-header-controls">
          <div class="btn-div">
            <a
              href="session.html"
              class="btn btn-cta"
            >
              Start a new session
            </a>
          </div>
        </div>
      </div>

      <h3 class="content-t">Session History</h3>

      <!-- History Content -->
      <div class="history-content"></div>
    </div>
  </section>
`;

let historyHeader;

beforeEach(() => {
  document.body.innerHTML = historyHeaderHTML;
  historyHeader = new HistoryHeader();
});

afterEach(() => {
  historyHeader = null;
  document.body.innerHTML = '';
  jest.resetAllMocks();
});

describe('_renderHeaderInfo(e)', () => {
  it('should return undefined and stop the function if the event does not contain either the username or sessions array', () => {
    const mockEvent = { detail: {} };
    const _getTotalSessionsSpy = jest.spyOn(historyHeader, '_getTotalSessions');
    const _getLatestSessionDateSpy = jest.spyOn(historyHeader, '_getLatestSessionDate');

    expect(historyHeader._renderHeaderInfo(mockEvent)).toBeUndefined();
    expect(_getTotalSessionsSpy).not.toHaveBeenCalled();
    expect(_getLatestSessionDateSpy).not.toHaveBeenCalled();
  });
  
  it('should, assuming the event contains the username and sessions array, update the header and call _getTotalSessions() and _getLatestSessionDate()', () => {
    const mockEvent = {
      detail: {
        username: 'mockUsername',
        sessions: [
          { mockProperty: 'mockValue' },
          { mockProperty: 'mockValue' },
        ],
      },
    };

    const _getTotalSessionsSpy = jest.spyOn(historyHeader, '_getTotalSessions').mockImplementationOnce(() => { return 7; });
    const _getLatestSessionDateSpy = jest.spyOn(historyHeader, '_getLatestSessionDate').mockImplementationOnce(() => { return '7 Apr 2024'; });

    expect(historyHeader._renderHeaderInfo(mockEvent)).toBeUndefined();
    
    expect(_getTotalSessionsSpy).toHaveBeenCalledWith(mockEvent.detail.sessions);
    expect(_getLatestSessionDateSpy).toHaveBeenCalledWith(mockEvent.detail.sessions);

    expect(historyHeader._usernameElement.textContent).toBe('mockUsername');
    expect(historyHeader._totalSessionsElement.textContent).toBe('7');
    expect(historyHeader._latestSessionDateElement.textContent).toBe('7 Apr 2024');
  });
  
});

describe('_getTotalSessions(sessions)', () => {
  it('should return undefined if the passed in sessions object is falsy or not a type of array', () => {
    const falsySessionsObject = undefined;
    expect(historyHeader._getTotalSessions(falsySessionsObject)).toBeUndefined();
  });
  
  it('should, assuming a valid sessions array is passed in, return the length of said array', () => {
    const mockSessions = [
      { mockProperty: 'mockValue' },
      { mockProperty: 'mockValue' },
    ];

    expect(historyHeader._getTotalSessions(mockSessions)).toBe(2);
  });
});

describe('_getLatestSessionDate(sessions)', () => {
  it('should return undefined if the passed in sessions object is falsy or not a type of array', () => {
    const falsySessionsObject = undefined;
    expect(historyHeader._getLatestSessionDate(falsySessionsObject)).toBeUndefined();
  });

  it('should return a hyphen if the length of the sessions array passed in is 0', () => {
    const mockSessions = [];
    expect(historyHeader._getLatestSessionDate(mockSessions)).toBe('-');
  });
  
  it('should, assuming a valid sessions array with a length greater than 0, find the highest timestamp and convert it to a date, using createDateString()', () => {
    createDateString.mockImplementationOnce((timestampMilliseconds) => {
      const dateObj = new Date(timestampMilliseconds);

      const day = dateObj.getDate();
      const month = Intl.DateTimeFormat('en-GB', { month: 'short' }).format(dateObj);
      const year = dateObj.getFullYear();
    
      const dateString = `${day} ${month} ${year}`;
      return dateString;
    });


    const mockSessions = [
      { createdOn: 1712704721094 }, // most recent timestamp
      { createdOn: 1702104721094 },
      { createdOn: 1707104721094 },
    ];

    expect(historyHeader._getLatestSessionDate(mockSessions)).toBe('10 Apr 2024');
    expect(createDateString).toHaveBeenCalledWith(1712704721094);
  });
});
