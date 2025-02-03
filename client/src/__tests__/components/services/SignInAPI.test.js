import SignInAPI from "../../../js/components/services/SignInAPI";
import axios from "axios";

jest.mock('axios');
let signInAPI;

beforeEach(() => {
  delete window.location;
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      hostname: 'billdivider.cc'
    },
  });

  signInAPI = new SignInAPI();
});

afterEach(() => {
  signInAPI = null;
  jest.resetAllMocks();
});

describe('signIn(user)', () => {
  it('should call axios.post() with the appropriate parameters', async () => {
    axios.post.mockImplementationOnce(() => { return { success: true, data: { loginToken: 'SomeToken' } }; });
    const user = { username: 'someUsername', password: 'somePassword' };
    const mockAPIKey = 'a5tZAgqE8sbF7Ddar5h9FmeA9MQCY1hmgKW3UgKpjiGbqJHWNmT8P8genEPvkcuq';

    await signInAPI.signIn(mockAPIKey, user);
    expect(axios.post).toHaveBeenCalledWith(`https://${window.location.hostname}/api/users/signin`, user, {
      headers: {
        'x-api-key': mockAPIKey,
      },
    });
  });
});

