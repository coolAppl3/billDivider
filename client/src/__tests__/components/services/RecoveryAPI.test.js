import RecoveryAPI from "../../../js/components/services/RecoveryAPI";
import axios from "axios";

jest.mock('axios');
let recoveryAPI;

beforeEach(() => {
  delete window.location;
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      hostname: 'billdivider.fun',
    },
  });

  recoveryAPI = new RecoveryAPI();
});

afterEach(() => {
  recoveryAPI = null;
  jest.resetAllMocks();
});

describe('sendRecoveryEmail(APIKey, mockRecoveryEmail)', () => {
  it('should call axios.get() with the appropriate parameters', async () => {
    axios.get.mockImplementationOnce(() => { return { success: true, data: {} } });
    const APIKey = 'a5tZAgqE8sbF7Ddar5h9FmeA9MQCY1hmgKW3UgKpjiGbqJHWNmT8P8genEPvkcuq';
    const mockRecoveryEmail = 'mockRecoveryEmail'

    await recoveryAPI.sendRecoveryEmail(APIKey, mockRecoveryEmail);
    expect(axios.post).toHaveBeenCalledWith(`https://${window.location.hostname}/api/users/recovery`, mockRecoveryEmail, {
      headers: {
        'x-api-key': APIKey,
      },
    });
  });
});

describe('updatePassword(APIKey, mockRecoveryData)', () => {
  it('should call axios.get() with the appropriate parameters', async () => {
    axios.get.mockImplementationOnce(() => { return { success: true, data: {} } });
    const APIKey = 'a5tZAgqE8sbF7Ddar5h9FmeA9MQCY1hmgKW3UgKpjiGbqJHWNmT8P8genEPvkcuq';
    const mockRecoveryData = { mockNewPassword: 'mockPassword', mockUserID: 'mockUserID' };

    await recoveryAPI.updatePassword(APIKey, mockRecoveryData);
    expect(axios.put).toHaveBeenCalledWith(`https://${window.location.hostname}/api/users/recovery`, mockRecoveryData, {
      headers: {
        'x-api-key': APIKey,
      },
    });
  });
});