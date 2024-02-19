import HistoryHeader from "../../../js/components/history/HistoryHeader";

import fetchUserHistory from "../../../js/components/history/fetchUserHistory";
import fetchUsername from "../../../js/components/history/fetchUsername";
import createDateString from "../../../js/components/global/createDateString";

jest.mock('../../../js/components/history/fetchUserHistory');
jest.mock('../../../js/components/history/fetchUsername');
jest.mock('../../../js/components/global/createDateString');

let historyHeader;

beforeEach(() => {
  document.body.innerHTML = '<p id="username"></p> <p id="totalSessions"></p> <p id="latestSessionDate"></p>';
  historyHeader = new HistoryHeader();
});

afterEach(() => {
  historyHeader = null;
  document.body.innerHTML = '';
  jest.resetAllMocks();
});

describe('_render()', () => {
  it('should always return undefined', () => {
    jest.spyOn(historyHeader, '_renderHeaderInfo').mockImplementation(() => {});
    jest.spyOn(historyHeader, '_renderUsername').mockImplementation(() => {});
    
    expect(historyHeader._render()).toBeUndefined();
    expect(historyHeader._render(null)).toBeUndefined();
    expect(historyHeader._render(0)).toBeUndefined();
    expect(historyHeader._render('')).toBeUndefined();
    expect(historyHeader._render({})).toBeUndefined();
    expect(historyHeader._render([])).toBeUndefined();
    expect(historyHeader._render('some value')).toBeUndefined();
    expect(historyHeader._render(5)).toBeUndefined();
  });
  
  it('should call _renderHeaderInfoSpy() and _renderUsername()', () => {
    const _renderHeaderInfoSpy = jest.spyOn(historyHeader, '_renderHeaderInfo').mockImplementation();
    const _renderUsername = jest.spyOn(historyHeader, '_renderUsername').mockImplementation();

    historyHeader._render();

    expect(_renderHeaderInfoSpy).toHaveBeenCalled();
    expect(_renderUsername).toHaveBeenCalled();
  });
});

describe('_renderUsername()', () => {
  it('should always return undefined', async () => {
    expect(await historyHeader._renderUsername()).toBeUndefined();
    expect(await historyHeader._renderUsername(null)).toBeUndefined();
    expect(await historyHeader._renderUsername(0)).toBeUndefined();
    expect(await historyHeader._renderUsername('')).toBeUndefined();
    expect(await historyHeader._renderUsername({})).toBeUndefined();
    expect(await historyHeader._renderUsername([])).toBeUndefined();
    expect(await historyHeader._renderUsername('some value')).toBeUndefined();
    expect(await historyHeader._renderUsername(5)).toBeUndefined();
  });
  
  it('should return undefined, call fetchUsername(), and if if the API fails and returns a falsy value, stop the function without changing the userName element text content', async () => {
    fetchUsername.mockImplementationOnce(() => { return undefined; });
    historyHeader._usernameElement.textContent = 'some value';
    
    expect(await historyHeader._renderUsername()).toBeUndefined();
    expect(fetchUsername).toHaveBeenCalled();
    expect(historyHeader._usernameElement.textContent).toEqual('some value');
  });

  it('should return undefined, call fetchUsername(), and if the API request is successful, and change the username Element textContent to the value return from the API call', async () => {
    fetchUsername.mockImplementationOnce(() => { return 'new mock value'; });
    historyHeader._usernameElement.textContent = 'some value';
    
    expect(await historyHeader._renderUsername()).toBeUndefined();
    expect(fetchUsername).toHaveBeenCalled();
    expect(historyHeader._usernameElement.textContent).toEqual('new mock value');
  });
});

describe('_renderHeaderInfo(sessions)', () => {
  it('should always return undefined', async () => {
    jest.spyOn(historyHeader, '_getTotalSessions').mockImplementation(() => {});
    jest.spyOn(historyHeader, '_getLatestSessionDate').mockImplementation(() => {});
    
    expect(await historyHeader._renderHeaderInfo()).toBeUndefined();
    expect(await historyHeader._renderHeaderInfo(null)).toBeUndefined();
    expect(await historyHeader._renderHeaderInfo(0)).toBeUndefined();
    expect(await historyHeader._renderHeaderInfo('')).toBeUndefined();
    expect(await historyHeader._renderHeaderInfo({})).toBeUndefined();
    expect(await historyHeader._renderHeaderInfo([])).toBeUndefined();
    expect(await historyHeader._renderHeaderInfo('some value')).toBeUndefined();
    expect(await historyHeader._renderHeaderInfo(5)).toBeUndefined();
  });

  it('it should call fetchUserHistory(), and if the API call returns a falsy value, return undefined and stop the function', async () => {
    fetchUserHistory.mockImplementationOnce(() => { return undefined; });
    const _getTotalSessionsSpy = jest.spyOn(historyHeader, '_getTotalSessions').mockImplementationOnce(() => {});
    const _getLatestSessionDateSpy = jest.spyOn(historyHeader, '_getLatestSessionDate').mockImplementationOnce(() => {});
    
    historyHeader._totalSessionsElement.textContent = 'some value';
    historyHeader._latestSessionDateElement.textContent = 'some value';

    expect(await historyHeader._renderHeaderInfo()).toBeUndefined();
    expect(_getTotalSessionsSpy).not.toHaveBeenCalled();
    expect(_getLatestSessionDateSpy).not.toHaveBeenCalled();
    expect(historyHeader._totalSessionsElement.textContent).toEqual('some value');
    expect(historyHeader._latestSessionDateElement.textContent).toEqual('some value');
  });

  it('it should call fetchUserHistory(), and if the API call is successful, call _getTotalSessions() and getLatestSessionDate(), update the totalSessions and latestSessionDate elements with the data received from the API call, and return undefined', async () => {
    const mockSessions = [{ mockProperty: 'mockValue' }, { mockProperty: 'mockValue' }];
    fetchUserHistory.mockImplementationOnce(() => { return mockSessions; });

    const _getTotalSessionsSpy = jest.spyOn(historyHeader, '_getTotalSessions').mockImplementationOnce(() => { return '1' });
    const _getLatestSessionDateSpy = jest.spyOn(historyHeader, '_getLatestSessionDate').mockImplementationOnce(() => { return '20 Jan 2023'; });
    
    historyHeader._totalSessionsElement.textContent = 'some value';
    historyHeader._latestSessionDateElement.textContent = 'some value';

    expect(await historyHeader._renderHeaderInfo()).toBeUndefined();
    expect(_getTotalSessionsSpy).toHaveBeenCalledWith(mockSessions);
    expect(_getLatestSessionDateSpy).toHaveBeenCalledWith(mockSessions);

    expect(historyHeader._totalSessionsElement.textContent).toEqual('1');
    expect(historyHeader._latestSessionDateElement.textContent).toEqual('20 Jan 2023');
  });
});

describe('_getTotalSessions(sessions)', () => {
  it('should return undefined and stop the function, if the sessions argument is falsy or not an array', () => {
    expect(historyHeader._getTotalSessions()).toBeUndefined();
    expect(historyHeader._getTotalSessions(null)).toBeUndefined();
    expect(historyHeader._getTotalSessions(0)).toBeUndefined();
    expect(historyHeader._getTotalSessions('')).toBeUndefined();
    expect(historyHeader._getTotalSessions({})).toBeUndefined();
    expect(historyHeader._getTotalSessions('some value')).toBeUndefined();
    expect(historyHeader._getTotalSessions(5)).toBeUndefined();
  });

  it('should return the total number of sessions, by taking the length of the array', () => {
    let mockSessions = [{ mockProperty: 'mockValue' }, { mockProperty: 'mockValue' }];
    expect(historyHeader._getTotalSessions(mockSessions)).toEqual(2);

    mockSessions = [];
    expect(historyHeader._getTotalSessions(mockSessions)).toEqual(0);
  });
});

describe('_getLatestSessionDate(sessions)', () => {
  it('should return undefined and stop the function, if the sessions argument is falsy or not an array', () => {
    expect(historyHeader._getLatestSessionDate()).toBeUndefined();
    expect(historyHeader._getLatestSessionDate(null)).toBeUndefined();
    expect(historyHeader._getLatestSessionDate(0)).toBeUndefined();
    expect(historyHeader._getLatestSessionDate('')).toBeUndefined();
    expect(historyHeader._getLatestSessionDate({})).toBeUndefined();
    expect(historyHeader._getLatestSessionDate('some value')).toBeUndefined();
    expect(historyHeader._getLatestSessionDate(5)).toBeUndefined();
  });

  it(`should return "-" and stop the function, if the sessions array's length is 0 (no previous sessions)`, () => {
    const mockSessions = [];
    expect(historyHeader._getLatestSessionDate(mockSessions)).toEqual('-');
  });
  
  it(`should call createDateString() and return the latest session date in the user's session history in this format: 20 Jun 2023`, () => {
    const mockSessions = [
      { createdOn: 1708223713144 }, // 18 Feb 2024
      { createdOn: 1708302302253 }, // 19 Feb 2024 01:25:02
      { createdOn: 1708302522383 }, // 19 Feb 2024 01:28:42 (latest)
    ];

    createDateString.mockImplementationOnce(() => { return '19 Feb 2024'; });

    expect(historyHeader._getLatestSessionDate(mockSessions)).toEqual('19 Feb 2024');
    expect(createDateString).toHaveBeenCalledWith(1708302522383);
  });
});
