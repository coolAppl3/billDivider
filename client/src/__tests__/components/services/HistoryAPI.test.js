import HistoryAPI from "../../../js/components/services/HistoryAPI";
import axios from "axios";

jest.mock('axios');
let historyAPI;

beforeEach(() => {
  delete window.location;
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      hostname: 'billdivider.cc',
    },
  });

  historyAPI = new HistoryAPI();
});

afterEach(() => {
  historyAPI = null;
  jest.resetAllMocks();
});

describe('getSessionHistory(loginToken)', () => {
  it('should call axios.get() with the appropriate parameters', async () => {
    axios.get.mockImplementationOnce(() => { return { success: true, data: {} }; });
    const loginToken = 'someLoginToken';
    const APIKey = 'z5tZAgqE8sbF7Ddar5h9FmeA9MQCY1hmgKW3UgKpjiGbqJHWNmT8P8genEPvkcuq';

    await historyAPI.getSessionHistory(loginToken, APIKey);
    expect(axios.get).toHaveBeenCalledWith(`https://${window.location.hostname}/api/users/history`, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
        'x-api-key': APIKey,
      },
    });
  });
});