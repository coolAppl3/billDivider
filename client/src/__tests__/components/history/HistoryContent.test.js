import HistoryContent from "../../../js/components/history/HistoryContent";

import fetchUserHistory from "../../../js/components/history/fetchUserHistory";
import deleteSession from "../../../js/components/history/deleteSession";
import SessionElement from "../../../js/components/history/SessionElement";
import messagePopup from "../../../js/components/global/messagePopup";
import ConfirmModal from "../../../js/components/global/ConfirmModal";
import createDateString from "../../../js/components/global/createDateString";

jest.mock('../../../js/components/history/fetchUserHistory');
jest.mock('../../../js/components/history/deleteSession');
jest.mock('../../../js/components/history/SessionElement');
jest.mock('../../../js/components/global/messagePopup');
jest.mock('../../../js/components/global/ConfirmModal');
jest.mock('../../../js/components/global/createDateString');

const historyHTML = `
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
            >
              &#160;
            </p>
          </div>

          <div class="history-header-container-item">
            <p class="history-header-container-item-title">Total sessions</p>
            <p
              class="history-header-container-item-value"
              id="totalSessions"
            >
              &#160;
            </p>
          </div>

          <div class="history-header-container-item">
            <p class="history-header-container-item-title">Latest session</p>
            <p
              class="history-header-container-item-value"
              id="latestSessionDate"
            >
              &#160;
            </p>
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

let historyContent;

beforeEach(() => {
  document.body.innerHTML = historyHTML;
  historyContent = new HistoryContent();
});

afterEach(() => {
  document.body.innerHTML = '';
  historyContent = null;
  jest.resetAllMocks();
});

describe('_render()', () => {
  it('should call fetchUserHistory(), destructure sessions and username from it, call _clearSessions(), _renderSessions(sessions), and _renderHeaderInfo(sessions, username), then return undefined', async () => {
    fetchUserHistory.mockResolvedValueOnce({ sessions: [], username: 'mockUsername' });
    
    const _clearSessionsSpy = jest.spyOn(historyContent, '_clearSessions').mockImplementationOnce(() => {});
    const _renderSessionsSpy = jest.spyOn(historyContent, '_renderSessions').mockImplementationOnce(() => {});
    const _renderHeaderInfoSpy = jest.spyOn(historyContent, '_renderHeaderInfo').mockImplementationOnce(() => {});
    
    expect(await historyContent._render()).toBeUndefined();
    expect(fetchUserHistory).toHaveBeenCalled();
    
    expect(_clearSessionsSpy).toHaveBeenCalled();
    expect(_renderSessionsSpy).toHaveBeenCalledWith([]);
    expect(_renderHeaderInfoSpy).toHaveBeenCalledWith([], 'mockUsername');
  });
});

describe('_handleHistoryContentKeyEvents', () => {
  it('should, if a key that is not Enter is pressed, return undefined and not call _handleHistoryContentClickEVents(e)', () => {
    const mockEvent = { key: 'G' };
    const _handleHistoryContentClickEventsSpy = jest.spyOn(historyContent, '_handleHistoryContentClickEvents').mockImplementationOnce(() => {});

    expect(historyContent._handleHistoryContentKeyEvents(mockEvent)).toBeUndefined();
    expect(_handleHistoryContentClickEventsSpy).not.toHaveBeenCalled();
  });

  it('should, if Enter is pressed, return undefined and call _handleHistoryContentClickEVents(e)', () => {
    const mockEvent = { key: 'Enter' };
    const _handleHistoryContentClickEventsSpy = jest.spyOn(historyContent, '_handleHistoryContentClickEvents').mockImplementationOnce(() => {});

    expect(historyContent._handleHistoryContentKeyEvents(mockEvent)).toBeUndefined();
    expect(_handleHistoryContentClickEventsSpy).toHaveBeenCalledWith(mockEvent);
  });
});

describe('_handleHistoryContentClickEvents(e)', () => {
  it(`should, if the event target does not contain a class of "removeSessionBtn", not call _removeSession(e) then return undefined`, () => {
    const _removeSessionSpy = jest.spyOn(historyContent, '_removeSession').mockImplementationOnce(() => {});
    const mockEvent = {
      target: {
        classList: {
          contains: () => { return false; }
        },
      },
    };

    expect(historyContent._handleHistoryContentClickEvents(mockEvent)).toBeUndefined();
    expect(_removeSessionSpy).not.toHaveBeenCalled();
  });
  
  it(`should, if the event target contains a class of "removeSessionBtn", call _removeSession(e) then return undefined`, () => {
    const _removeSessionSpy = jest.spyOn(historyContent, '_removeSession').mockImplementationOnce(() => {});
    const mockEvent = {
      target: {
        classList: {
          contains: () => { return true; }
        },
      },
    };

    expect(historyContent._handleHistoryContentClickEvents(mockEvent)).toBeUndefined();
    expect(_removeSessionSpy).toHaveBeenCalledWith(mockEvent);
  });
});

describe('_renderSessions(sessions)', () => {
  it(`should, if the sessions array length is 0, call SessionElement.prototype.createNoSessionElement(), then dispatch a "sessionsLoaded" event`, async () => {
    const mockSession = [];
    
    const mockDiv = document.createElement('div');
    SessionElement.prototype.createNoSessionsElement.mockImplementationOnce(() => { return mockDiv; });

    expect(await historyContent._renderSessions(mockSession)).toBeUndefined();
    expect(SessionElement.prototype.createNoSessionsElement).toHaveBeenCalled();
  });

  it(`should, assuming the sessions array isn't of length 0, reverse it, loop through it and call SessionElement.prototype.create() with every session, and append the elements. It should then dispatch a "sessionsLoaded" and return undefined`, async () => {
    const mockSession = [{ mockProperty: 'mockValue' }, { mockProperty2: 'mockValue2' }];

    const mockDiv = document.createElement('div');
    SessionElement.prototype.create.mockImplementation(() => { return mockDiv; });

    expect(await historyContent._renderSessions(mockSession)).toBeUndefined();
    expect(SessionElement.prototype.create).toHaveBeenCalledTimes(2);
    expect(SessionElement.prototype.create).toHaveBeenCalledWith({ mockProperty2: 'mockValue2' });
    expect(SessionElement.prototype.create).toHaveBeenCalledWith({ mockProperty: 'mockValue' });
  });
});

describe('_removeSession()', () => {
  let mockEvent;
  let mockSessionElement;

  beforeEach(() => {
    ConfirmModal.prototype.display.mockImplementation(() => {
      const mockConfirmModal = document.createElement('div');
      mockConfirmModal.className = 'confirm-modal';
      document.body.appendChild(mockConfirmModal);
    });
    
    mockSessionElement = document.createElement('div');
    mockSessionElement.setAttribute('data-sessionID', 'mockSessionID');
    
    mockEvent = {
      target: {
        parentElement: {
          parentElement: mockSessionElement,
        },
      },
    };
  });

  afterEach(() => {
    mockEvent = null;
    mockSessionElement = null;
  });

  it(`should call ConfirmModal.prototype.display(), add an event listener to the confirmModal element, then return undefined. If the user makes an "exit click", it should call ConfirmModal.prototype.remove()`, async () => {
    expect(await historyContent._removeSession(mockEvent)).toBeUndefined();
    expect(ConfirmModal.prototype.display).toHaveBeenCalled();

    ConfirmModal.prototype.isExitClick.mockImplementationOnce(() => { return true; });
    ConfirmModal.prototype.remove.mockImplementationOnce(() => {});
    
    const isExitClickEvent = new MouseEvent('click');

    const confirmModalElement = document.querySelector('.confirm-modal');
    confirmModalElement.dispatchEvent(isExitClickEvent);

    expect(ConfirmModal.prototype.isExitClick).toHaveBeenCalledWith(isExitClickEvent);
    expect(ConfirmModal.prototype.remove).toHaveBeenCalled();
  });
  
  it(`should call ConfirmModal.prototype.display(), add an event listener to the confirmModal element, then return undefined. If the user clicks the confirmModalConfirmBtn, it should call deleteSession() with the sessionID, messagePopup(), and ConfirmModal.prototype.remove(). It should also dispatch a "render" event`, async () => {
    expect(await historyContent._removeSession(mockEvent)).toBeUndefined();
    expect(ConfirmModal.prototype.display).toHaveBeenCalled();

    deleteSession.mockImplementationOnce(() => {});
    ConfirmModal.prototype.isExitClick.mockImplementationOnce(() => { return false; });
    ConfirmModal.prototype.remove.mockImplementationOnce(() => {});
    
    const mockConfirmEvent = new MouseEvent('click');
    Object.defineProperty(mockConfirmEvent, 'target', {
      writable: false,
      value: {
        id: 'confirmModalConfirmBtn',
      },
    });

    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent').mockImplementationOnce(() => {});
    const mockRenderEvent = new Event('render');

    const confirmModalElement = document.querySelector('.confirm-modal');
    confirmModalElement.dispatchEvent(mockConfirmEvent);

    expect(await deleteSession).toHaveBeenCalledWith('mockSessionID');
    expect(messagePopup).toHaveBeenCalledWith('Session removed', 'success');
    expect(ConfirmModal.prototype.remove).toHaveBeenCalled();
    expect(dispatchEventSpy).toHaveBeenCalledWith(mockRenderEvent);
  });
  
});

describe('_renderHeaderInfo(sessions, username)', () => {
  it('should, call _getTotalSessions(sessions) and _getLatestSessionDate(sessions). Then, it should use that data, alongside the username, to fill up the information in the header, and return undefined', () => {
    const _getTotalSessionsSpy = jest.spyOn(historyContent, '_getTotalSessions').mockImplementationOnce(() => { return 4; });
    const _getLatestSessionDateSpy = jest.spyOn(historyContent, '_getLatestSessionDate').mockImplementationOnce(() => { return '7 April 2024'; });

    const mockSessions = [{ mockProperty: 'mockValue' }, { mockProperty: 'mockValue' }, { mockProperty: 'mockValue' }];
    const mockUsername = 'mockUsername';

    expect(historyContent._renderHeaderInfo(mockSessions, mockUsername)).toBeUndefined();
    expect(_getTotalSessionsSpy).toHaveBeenCalledWith(mockSessions);
    expect(_getLatestSessionDateSpy).toHaveBeenCalledWith(mockSessions);

    expect(historyContent._usernameElement.textContent).toBe('mockUsername');
    expect(historyContent._totalSessionsElement.textContent).toBe('4');
    expect(historyContent._latestSessionDateElement.textContent).toBe('7 April 2024');
  });
});

describe('_getTotalSessions(sessions)', () => {
  it('should return undefined if the passed in sessions object is falsy or not a type of array', () => {
    const falsySessionsObject = undefined;
    expect(historyContent._getTotalSessions(falsySessionsObject)).toBeUndefined();
  });
  
  it('should, assuming a valid sessions array is passed in, return the length of said array', () => {
    const mockSessions = [
      { mockProperty: 'mockValue' },
      { mockProperty: 'mockValue' },
    ];

    expect(historyContent._getTotalSessions(mockSessions)).toBe(2);
  });
});

describe('_getLatestSessionDate(sessions)', () => {
  it('should return undefined if the passed in sessions object is falsy or not a type of array', () => {
    const falsySessionsObject = undefined;
    expect(historyContent._getLatestSessionDate(falsySessionsObject)).toBeUndefined();
  });

  it('should return a hyphen if the length of the sessions array passed in is 0', () => {
    const mockSessions = [];
    expect(historyContent._getLatestSessionDate(mockSessions)).toBe('-');
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

    expect(historyContent._getLatestSessionDate(mockSessions)).toBe('10 Apr 2024');
    expect(createDateString).toHaveBeenCalledWith(1712704721094);
  });
});
