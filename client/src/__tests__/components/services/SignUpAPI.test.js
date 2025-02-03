import SignUpAPI from "../../../js/components/services/SignUpAPI";
import axios from "axios";

jest.mock('axios');
let signUpAPI;

beforeEach(() => {
  delete window.location;
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      hostname: 'billdivider.cc'
    },
  });

  signUpAPI = new SignUpAPI();
});

afterEach(() => {
  signUpAPI = null;
  jest.resetAllMocks();
});

describe('signUp(user)', () => {
  it('should call axios.post() with the appropriate parameters', async () => {
    axios.post.mockImplementationOnce(() => { return { success: true, data: {} }; });
    const newUser = { username: 'someUsername', password: 'somePassword' };
    const mockAPIKey = 'a5tZAgqE8sbF7Ddar5h9FmeA9MQCY1hmgKW3UgKpjiGbqJHWNmT8P8genEPvkcuq';

    await signUpAPI.signUp(mockAPIKey, newUser);
    expect(axios.post).toHaveBeenCalledWith(`https://${window.location.hostname}/api/users/signup`, newUser, {
      headers: {
        'x-api-key': mockAPIKey,
      },
    });
  });
});
