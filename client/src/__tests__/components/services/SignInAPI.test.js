import SignInAPI from "../../../js/components/services/SignInAPI";
import axios from "axios";

jest.mock('axios');
let signInAPI;

beforeEach(() => {
  window.location.hostname = 'billdivider.fun';
  signInAPI = new SignInAPI();
});

afterEach(() => {
  signInAPI = null;
  jest.resetAllMocks();
});

describe('signIn(user)', () => {
  it('should call axios.post()', async () => {
    axios.post.mockImplementationOnce(() => { return { success: true, data: { loginToken: 'SomeToken' } } });
    const user = { username: 'someUsername', password: 'somePassword' };

    await signInAPI.signIn(user);
    expect(axios.post).toHaveBeenCalledWith(`http://${window.location.hostname}:5000/api/users/signin`, user);
  });
});

