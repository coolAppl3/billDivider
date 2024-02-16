import HistoryAPI from "../../../js/components/services/HistoryAPI";
import axios from "axios";

jest.mock('axios');
let historyAPI;

beforeEach(() => {
  delete window.location;
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      hostname: 'billdivider.fun',
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
    axios.get.mockImplementationOnce(() => { return { success: true, data: {} } });
    const loginToken = 'someLoginToken';

    await historyAPI.getSessionHistory(loginToken);
    expect(axios.get).toHaveBeenCalledWith(`https://${window.location.hostname}/api/users/history`, {
      headers: { loginToken },
    });
  });
});

describe('getUsername(loginToken)', () => {
  it('should call axios.get() with the appropriate parameters', async () => {
    axios.get.mockImplementationOnce(() => { return { success: true, username: 'someUsername' } });
    const loginToken = 'someLoginToken';

    await historyAPI.getUsername(loginToken);
    expect(axios.get).toHaveBeenCalledWith(`https://${window.location.hostname}/api/users/username`, {
      headers: { loginToken },
    });
  });
});
