import SessionAPI from "../../../js/components/services/SessionAPI";
import axios from "axios";

jest.mock('axios');
let sessionAPI;

beforeEach(() => {
  delete window.location
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      hostname: 'billdivider.fun'
    },
  });

  sessionAPI = new SessionAPI();
});

afterEach(() => {
  sessionAPI = null;
  jest.resetAllMocks();
});

describe('addSession(loginToken, session)', () => {
  it('should call axios.post() with the appropriate parameters', async () => {
    axios.post.mockImplementationOnce(() => { return { success: true, data: {} } });
    const loginToken = 'someLoginToken';
    const session = { someKey: 'mockValue' };

    await sessionAPI.addSession(loginToken, session);
    expect(axios.post).toHaveBeenCalledWith(`https://${window.location.hostname}/api/users/session`, session, {
      headers: { loginToken },
    });
  });
});

describe('getSession(loginToken, sessionID)', () => {
  it('should call axios.get() with the appropriate parameters', async () => {
    axios.get.mockImplementationOnce(() => { return { success: true, data: {} } });
    const loginToken = 'someLoginToken';
    const sessionID = 'someSessionID';

    await sessionAPI.getSession(loginToken, sessionID);
    expect(axios.get).toHaveBeenCalledWith(`https://${window.location.hostname}/api/users/session/${sessionID}`, {
      headers: { loginToken },
    });
  });
});

describe('deleteSession(loginToken, sessionID)', () => {
  it('should call axios.delete() with the appropriate parameters', async () => {
    axios.delete.mockImplementationOnce(() => { return { success: true, data: {} } });
    const loginToken = 'someLoginToken';
    const sessionID = 'someSessionID';

    await sessionAPI.deleteSession(loginToken, sessionID);
    expect(axios.delete).toHaveBeenCalledWith(`https://${window.location.hostname}/api/users/session/${sessionID}`, {
      headers: { loginToken },
    });
  });
});

describe('updateSession(loginToken, sessionID)', () => {
  it('should call axios.put() with the appropriate parameters', async () => {
    axios.put.mockImplementationOnce(() => { return { success: true, data: {} } });
    const loginToken = 'someLoginToken';
    const sessionID = 'someSessionID';
    const session = { someKey: 'mockValue' };

    await sessionAPI.updateSession(loginToken, sessionID, session);
    expect(axios.put).toHaveBeenCalledWith(`https://${window.location.hostname}/api/users/session/${sessionID}`, session, {
      headers: { loginToken },
    });
  });
});
