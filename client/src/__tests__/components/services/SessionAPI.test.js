import SessionAPI from "../../../js/components/services/SessionAPI";
import axios from "axios";

jest.mock('axios');
let sessionAPI;

beforeEach(() => {
  delete window.location;
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      hostname: 'billdivider.cc'
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
    axios.post.mockImplementationOnce(() => { return { success: true, data: {} }; });
    const loginToken = 'someLoginToken';
    const APIKey = 'z5tZAgqE8sbF7Ddar5h9FmeA9MQCY1hmgKW3UgKpjiGbqJHWNmT8P8genEPvkcuq';
    const session = { someKey: 'mockValue' };

    await sessionAPI.addSession(loginToken, APIKey, session);
    expect(axios.post).toHaveBeenCalledWith(`https://${window.location.hostname}/api/users/session`, session, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
        'x-api-key': APIKey,
      },
    });
  });
});

describe('getSession(loginToken, sessionID)', () => {
  it('should call axios.get() with the appropriate parameters', async () => {
    axios.get.mockImplementationOnce(() => { return { success: true, data: {} }; });
    const loginToken = 'someLoginToken';
    const APIKey = 'z5tZAgqE8sbF7Ddar5h9FmeA9MQCY1hmgKW3UgKpjiGbqJHWNmT8P8genEPvkcuq';
    const sessionID = 'someSessionID';

    await sessionAPI.getSession(loginToken, APIKey, sessionID);
    expect(axios.get).toHaveBeenCalledWith(`https://${window.location.hostname}/api/users/session/${sessionID}`, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
        'x-api-key': APIKey,
      },
    });
  });
});

describe('deleteSession(loginToken, sessionID)', () => {
  it('should call axios.delete() with the appropriate parameters', async () => {
    axios.delete.mockImplementationOnce(() => { return { success: true, data: {} }; });
    const loginToken = 'someLoginToken';
    const APIKey = 'z5tZAgqE8sbF7Ddar5h9FmeA9MQCY1hmgKW3UgKpjiGbqJHWNmT8P8genEPvkcuq';
    const sessionID = 'someSessionID';

    await sessionAPI.deleteSession(loginToken, APIKey, sessionID);
    expect(axios.delete).toHaveBeenCalledWith(`https://${window.location.hostname}/api/users/session/${sessionID}`, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
        'x-api-key': APIKey,
      },
    });
  });
});

describe('updateSession(loginToken, sessionID)', () => {
  it('should call axios.put() with the appropriate parameters', async () => {
    axios.put.mockImplementationOnce(() => { return { success: true, data: {} }; });
    const loginToken = 'someLoginToken';
    const APIKey = 'z5tZAgqE8sbF7Ddar5h9FmeA9MQCY1hmgKW3UgKpjiGbqJHWNmT8P8genEPvkcuq';
    const sessionID = 'someSessionID';
    const session = { someKey: 'mockValue' };

    await sessionAPI.updateSession(loginToken, APIKey, sessionID, session);
    expect(axios.put).toHaveBeenCalledWith(`https://${window.location.hostname}/api/users/session/${sessionID}`, session, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
        'x-api-key': APIKey,
      },
    });
  });
});
