import fetchUsername from "../../../js/components/history/fetchUsername";

import HistoryAPI from "../../../js/components/services/HistoryAPI";
import locateLoginToken from "../../../js/components/global/locateLoginToken";
import Cookies from "../../../js/components/global/Cookies";
import redirectAfterDelayMillisecond from "../../../js/components/global/redirectAfterDelayMillisecond";

jest.mock('../../../js/components/services/HistoryAPI');
jest.mock('../../../js/components/global/locateLoginToken');
jest.mock('../../../js/components/global/Cookies');
jest.mock('../../../js/components/global/redirectAfterDelayMillisecond');

afterEach(() => {
  jest.resetAllMocks();
});

describe('fetchUsername()', () => {
  it('should call locateLoginToken(), then call redirectAfterDelayMillisecond() and redirect to signIn.html if there is no loginToken', async () => {
    locateLoginToken.mockReturnValueOnce(null);
    await fetchUsername();

    expect(locateLoginToken).toHaveBeenCalled();
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('signIn.html');
  });

  it('should call locateLoginToken(), and if one exists, call historyAPI.getSessionHistory(loginToken) then return the username', async () => {
    const mockResponse = {
      status: 200,
      data: {
        success: true,
        data: 'mockUsername',
      },
    };

    HistoryAPI.prototype.getUsername.mockResolvedValueOnce(mockResponse);
    locateLoginToken.mockReturnValueOnce('mockLoginToken');

    expect(await fetchUsername()).toBe('mockUsername');
    expect(locateLoginToken).toHaveBeenCalled();
    expect(HistoryAPI.prototype.getUsername).toHaveBeenCalledWith('mockLoginToken');
  });

  it(`should, if the API request fails, console log the error, and if there is no error.response property, call cookies.remove('loginToken) and redirectAfterDelayMillisecond('signIn.html)`, async() => {
    const mockError = new Error('mock error');
    HistoryAPI.prototype.getUsername.mockRejectedValueOnce(mockError);
    
    locateLoginToken.mockReturnValueOnce('mockLoginToken');
    const consoleSpy = jest.spyOn(console, 'log');

    await fetchUsername();
    expect(locateLoginToken).toHaveBeenCalled();
    expect(HistoryAPI.prototype.getUsername).toHaveBeenCalledWith('mockLoginToken');
    
    expect(consoleSpy).toHaveBeenCalledWith(mockError);
    expect(Cookies.prototype.remove).toHaveBeenCalledWith('loginToken');
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('signIn.html');
  });
  
  it(`should, if the API request fails, console log the error, and if error.response.status is equal to 404, call cookies.remove('loginToken') and redirectAfterDelayMillisecond('signIn.html', 1000, 'Not logged in')`, async() => {
    const mockError = new Error('mock error');
    mockError.response = {
      status: 404,
    };
    HistoryAPI.prototype.getUsername.mockRejectedValueOnce(mockError);
    
    locateLoginToken.mockReturnValueOnce('mockLoginToken');
    const consoleSpy = jest.spyOn(console, 'log');

    await fetchUsername();
    expect(locateLoginToken).toHaveBeenCalled();
    expect(HistoryAPI.prototype.getUsername).toHaveBeenCalledWith('mockLoginToken');
    
    expect(consoleSpy).toHaveBeenCalledWith(mockError);
    expect(Cookies.prototype.remove).toHaveBeenCalledWith('loginToken');
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('signIn.html', 1000, 'Not logged in');
  });

  it(`should, if the API request fails, console log the error, and if error.response.status is equal to anything else (most likely 500), call cookies.remove('loginToken') and redirectAfterDelayMillisecond('signIn.html', 1000, 'Not logged in')`, async() => {
    const mockError = new Error('mock error');
    mockError.response = {
      status: 500,
    };
    HistoryAPI.prototype.getUsername.mockRejectedValueOnce(mockError);
    
    locateLoginToken.mockReturnValueOnce('mockLoginToken');
    const consoleSpy = jest.spyOn(console, 'log');

    await fetchUsername();
    expect(locateLoginToken).toHaveBeenCalled();
    expect(HistoryAPI.prototype.getUsername).toHaveBeenCalledWith('mockLoginToken');
    
    expect(consoleSpy).toHaveBeenCalledWith(mockError);
    expect(Cookies.prototype.remove).toHaveBeenCalledWith('loginToken');
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('signIn.html');
  });
});
