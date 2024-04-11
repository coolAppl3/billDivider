import VerificationAPI from "../../../js/components/services/VerificationAPI";
import axios from "axios";

jest.mock('axios');
let verificationAPI;

beforeEach(() => {
  delete window.location;
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      hostname: 'billdivider.fun',
    },
  });

  verificationAPI = new VerificationAPI();
});

afterEach(() => {
  verificationAPI = null;
  jest.resetAllMocks();
});

describe('verify(APIKey, mockVerificationData)', () => {
  it('should call axios.get() with the appropriate parameters', async () => {
    axios.get.mockImplementationOnce(() => { return { success: true, data: {} } });
    const APIKey = 'a5tZAgqE8sbF7Ddar5h9FmeA9MQCY1hmgKW3UgKpjiGbqJHWNmT8P8genEPvkcuq';
    const mockVerificationData = { mockProperty: 'mockValue' };

    await verificationAPI.verify(APIKey, mockVerificationData);
    expect(axios.post).toHaveBeenCalledWith(`https://${window.location.hostname}/api/users/verification`, mockVerificationData, {
      headers: {
        'x-api-key': APIKey,
      },
    });
  });
});

describe('resendVerificationEmail(APIKey, mockUnverifiedUserID)', () => {
  it('should call axios.get() with the appropriate parameters', async () => {
    axios.get.mockImplementationOnce(() => { return { success: true, data: {} } });
    const APIKey = 'a5tZAgqE8sbF7Ddar5h9FmeA9MQCY1hmgKW3UgKpjiGbqJHWNmT8P8genEPvkcuq';
    const mockUnverifiedUserID = 'mockUnverifiedUserID';

    await verificationAPI.resendVerificationEmail(APIKey, mockUnverifiedUserID);
    expect(axios.post).toHaveBeenCalledWith(`https://${window.location.hostname}/api/users/resendVerification`, mockUnverifiedUserID, {
      headers: {
        'x-api-key': APIKey,
      },
    });
  });
});