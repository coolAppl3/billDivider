import SignUpAPI from "../../../js/components/services/SignUpAPI";
import axios from "axios";

jest.mock('axios');
let signUpAPI;

beforeEach(() => {
  window.location.hostname = 'billdivider.fun';
  signUpAPI = new SignUpAPI();
});

afterEach(() => {
  signUpAPI = null;
  jest.resetAllMocks();
});

describe('signUp(user)', () => {
  it('should call axios.post()', async () => {
    axios.post.mockImplementationOnce(() => { return { success: true, data: {} } });
    const newUser = { username: 'someUsername', password: 'somePassword' };

    await signUpAPI.signUp(newUser);
    expect(axios.post).toHaveBeenCalledWith(`http://${window.location.hostname}:5000/api/users/signup`, newUser);
  });
});
