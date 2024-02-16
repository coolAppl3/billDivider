import deleteSession from "../../../js/components/history/deleteSession";

import SessionAPI from "../../../js/components/services/SessionAPI";
import locateLoginToken from "../../../js/components/global/locateLoginToken";
import redirectAfterDelayMillisecond from "../../../js/components/global/redirectAfterDelayMillisecond";
import Cookies from "../../../js/components/global/Cookies";

jest.mock('../../../js/components/services/SessionAPI');
jest.mock('../../../js/components/global/locateLoginToken');
jest.mock('../../../js/components/global/redirectAfterDelayMillisecond');
jest.mock('../../../js/components/global/Cookies');


afterEach(() => {
  jest.resetAllMocks();
});

describe('deleteSEssion(sessionID)', () => {
  it('should call locateLoginToken(), then call redirectAfterDelayMillisecond() and redirect to signIn.html if there is no loginToken', async () => {
    locateLoginToken.mockReturnValueOnce(null);
    const sessionID = 'mockSessionID';
    
    await deleteSession(sessionID);
    expect(locateLoginToken).toHaveBeenCalled();
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('signIn.html', 1000, 'Not logged in');
  });

  it('should call locateLoginToken(), then call sessionAPI.deleteSession() if there is a loginToken, and return undefined', async () => {
    SessionAPI.prototype.deleteSession.mockImplementationOnce(() => { return { success: true } });

    locateLoginToken.mockReturnValueOnce('mockLoginToken');
    const sessionID = 'mockSessionID';

    expect(await deleteSession(sessionID)).toBeUndefined();
    expect(locateLoginToken).toHaveBeenCalled();
    expect(SessionAPI.prototype.deleteSession).toHaveBeenCalledWith('mockLoginToken', sessionID);
  });
  
  it(`should, if the API request fails, console log the error, and if there is no error.response property, call cookies.remove('loginToken) and redirectAfterDelayMillisecond('signIn.html')`, async () => {
    const mockError = new Error('mock error');
    SessionAPI.prototype.deleteSession.mockRejectedValueOnce(mockError);
    const consoleSpy = jest.spyOn(console, 'log');
    
    locateLoginToken.mockReturnValueOnce('mockLoginToken');
    const sessionID = 'mockSessionID';

    await deleteSession(sessionID);
    expect(locateLoginToken).toHaveBeenCalled();;
    expect(SessionAPI.prototype.deleteSession).toHaveBeenCalledWith('mockLoginToken', sessionID);

    expect(consoleSpy).toHaveBeenCalledWith(mockError);
    expect(Cookies.prototype.remove).toHaveBeenCalledWith('loginToken');
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('signIn.html');
  });

  it(`should, if the API request fails, console log the error, and if error.response.status is equal to 403, call cookies.remove('loginToken') and redirectAfterDelayMillisecond('signIn.html', 1000, 'Not logged in')`, async () => {
    const mockError = new Error('mock error');
    mockError.response = {
      status: 403,
    };
    
    SessionAPI.prototype.deleteSession.mockRejectedValueOnce(mockError);
    const consoleSpy = jest.spyOn(console, 'log');
    
    locateLoginToken.mockReturnValueOnce('mockLoginToken');
    const sessionID = 'mockSessionID';

    await deleteSession(sessionID);
    expect(locateLoginToken).toHaveBeenCalled();;
    expect(SessionAPI.prototype.deleteSession).toHaveBeenCalledWith('mockLoginToken', sessionID);

    expect(consoleSpy).toHaveBeenCalledWith(mockError);
    expect(Cookies.prototype.remove).toHaveBeenCalledWith('loginToken');
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('signIn.html', 1000, 'Not logged in');
  });
  
  it(`should, if the API request fails, console log the error, and if error.response.status is equal to anything else (500 most likely), call cookies.remove('loginToken') and redirectAfterDelayMillisecond('signIn.html')`, async () => {
    const mockError = new Error('mock error');
    mockError.response = {
      status: 500,
    };
    
    SessionAPI.prototype.deleteSession.mockRejectedValueOnce(mockError);
    const consoleSpy = jest.spyOn(console, 'log');
    
    locateLoginToken.mockReturnValueOnce('mockLoginToken');
    const sessionID = 'mockSessionID';

    await deleteSession(sessionID);
    expect(locateLoginToken).toHaveBeenCalled();;
    expect(SessionAPI.prototype.deleteSession).toHaveBeenCalledWith('mockLoginToken', sessionID);

    expect(consoleSpy).toHaveBeenCalledWith(mockError);
    expect(Cookies.prototype.remove).toHaveBeenCalledWith('loginToken');
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('signIn.html');
  });
});
