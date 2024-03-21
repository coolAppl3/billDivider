import SignUpForm from "../../../js/components/signUp/SignUpForm";

import SignUpAPI from "../../../js/components/services/SignUpAPI";
import Cookies from "../../../js/components/global/Cookies";
import RevealPassword from "../../../js/components/signing/RevealPassword";
import LinksContainer from "../../../js/components/signing/LinksContainer";
import LoadingModal from "../../../js/components/global/LoadingModal";
import redirectAfterDelayMillisecond from "../../../js/components/global/redirectAfterDelayMillisecond";
import ErrorSpan from "../../../js/components/global/ErrorSpan";
import FormCheckbox from "../../../js/components/global/FormCheckbox";

jest.mock('../../../js/components/services/SignUpAPI');
jest.mock('../../../js/components/global/Cookies');
jest.mock('../../../js/components/signing/RevealPassword');
jest.mock('../../../js/components/signing/LinksContainer');
jest.mock('../../../js/components/global/LoadingModal');
jest.mock('../../../js/components/global/redirectAfterDelayMillisecond');
jest.mock('../../../js/components/global/ErrorSpan');
jest.mock('../../../js/components/global/FormCheckbox');

const signUpFormHTML = `
  <section class="sign-up">
    <div class="container">
      <div class="sign-up-container">
        <form class="sign-up-container-form">
          <h3 class="content-t">Create a new account</h3>
          <p class="content-p">Quick and simple. No email needed!</p>

          <div class="h-line"></div>

          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              autocomplete="off"
            />
            <span class="error-span"></span>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              autocomplete="on"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              class="svg-icon"
              id="revealPassword"
              tabindex="0"
            >
              <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
              <path
                d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
              />
            </svg>
            <span class="error-span"></span>
          </div>

          <div class="form-group checkbox-group">
            <div
              class="checkbox"
              id="keepMeSignedIn"
              tabindex="0"
            >
              <span class="check-icon"></span>
            </div>
            <p>Keep me signed in</p>
          </div>

          <div class="btn-div">
            <button
              type="submit"
              class="btn btn-cta"
            >
              Sign up
            </button>
          </div>

          <p>
            Already have an account?
            <a href="signIn.html">Sign in here</a>. Alternatively, you can
            <a href="session.html">start an anonymous session</a>.
          </p>

          <div class="links-container">
            <p
              id="returnToPreviousPage"
              tabindex="0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                class="svg-icon"
              >
                <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                  d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
                />
              </svg>
              Return to previous page
            </p>
            <p
              id="returnToHomepage"
              tabindex="0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                class="svg-icon"
              >
                <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                  d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                />
              </svg>
              Homepage
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
`;

let signUpForm;

beforeEach(() => {
  document.body.innerHTML = signUpFormHTML;
  signUpForm = new SignUpForm();
});

afterEach(() => {
  document.body.innerHTML = '';
  signUpForm = null;
  jest.resetAllMocks();
});

describe('_signUp(e)', () => {
  let mockEvent;

  beforeEach(() => {
    mockEvent = { preventDefault: () => {}, };
  });

  afterEach(() => {
    mockEvent = null;
  });

  it('should always call e.preventDefault() and LoadingModal.display()', async () => {
    signUpForm._usernameInput.value = ''; // ensuring an invalid value to force an early return for this test
    const mockEVentSpy = jest.spyOn(mockEvent, 'preventDefault');
    
    await signUpForm._signUp(mockEvent);

    expect(mockEVentSpy).toHaveBeenCalled();
    expect(LoadingModal.remove).toHaveBeenCalled();
  });
  
  it('should, if either the username or password are invalid, call LoadingModal.remove() and return undefined ', async () => {
    signUpForm._usernameInput.value = '';

    expect(await signUpForm._signUp(mockEvent)).toBeUndefined();
    expect(LoadingModal.remove).toHaveBeenCalled();
  });

  it(`should, if both inputs are valid, create a newUser object with the name and password, call SignUpAPI.prototype.signUp(newUser). If the API request is successful, it should receive a loginToken, add it to the browser's cookies, call LoadingModal.display(), redirect the user to history.html, then return undefined. If _keepMeSignedInCheckBox contains a class of "contains", the loginToken cookie should have an age equal to the value of _loginTokenAge`, async () => {
    signUpForm._usernameInput.value = 'JohnDoe';
    signUpForm._passwordInput.value = 'JohnDoe123';
    signUpForm._keepMeSignedInCheckBox.classList.add('checked');

    const mockNewUserObject = {
      username: 'JohnDoe',
      password: 'JohnDoe123',
    };
    
    const mockResolvedResponse = {
      data: {
        loginToken: 'mockLoginToken',
      },
    };
    
    SignUpAPI.prototype.signUp.mockResolvedValueOnce(mockResolvedResponse);
    Cookies.prototype.set.mockImplementationOnce(() => {});

    expect(await signUpForm._signUp(mockEvent)).toBeUndefined();
    expect(SignUpAPI.prototype.signUp).toHaveBeenCalledWith(mockNewUserObject);
    expect(Cookies.prototype.set).toHaveBeenCalledWith('loginToken', 'mockLoginToken', signUpForm._loginTokenAge);
    expect(LoadingModal.display).toHaveBeenCalled();
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('history.html', 1000, 'Signed up successfully!', 'success');
  });

  it(`should, if both inputs are valid, create a newUser object with the name and password, call SignUpAPI.prototype.signUp(newUser). If the API request is successful, it should receive a loginToken, add it to the browser's cookies, call LoadingModal.display(), redirect the user to history.html, then return undefined. If _keepMeSignedInCheckBox does not contain a class of "checked", the cookie shouldn't have an age, and will be automatically removed when the browser is closed`, async () => {
    signUpForm._usernameInput.value = 'JohnDoe';
    signUpForm._passwordInput.value = 'JohnDoe123';
    signUpForm._keepMeSignedInCheckBox.classList.remove('checked');

    const mockNewUserObject = {
      username: 'JohnDoe',
      password: 'JohnDoe123',
    };
    
    const mockResolvedResponse = {
      data: {
        loginToken: 'mockLoginToken',
      },
    };
    
    SignUpAPI.prototype.signUp.mockResolvedValueOnce(mockResolvedResponse);
    Cookies.prototype.set.mockImplementationOnce(() => {});

    expect(await signUpForm._signUp(mockEvent)).toBeUndefined();
    expect(SignUpAPI.prototype.signUp).toHaveBeenCalledWith(mockNewUserObject);
    expect(Cookies.prototype.set).toHaveBeenCalledWith('loginToken', 'mockLoginToken');
    expect(LoadingModal.display).toHaveBeenCalled();
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('history.html', 1000, 'Signed up successfully!', 'success');
  });

  it('should catch any potential error in the API request. If the error does not have a response property, it should redirect the user to signUp.html and return undefined', async () => {
    signUpForm._usernameInput.value = 'JohnDoe';
    signUpForm._passwordInput.value = 'JohnDoe123';

    const mockNewUserObject = {
      username: 'JohnDoe',
      password: 'JohnDoe123',
    };
    
    const mockRejectedResponse = {}; 
    
    SignUpAPI.prototype.signUp.mockRejectedValueOnce(mockRejectedResponse);
    Cookies.prototype.set.mockImplementationOnce(() => {});

    expect(await signUpForm._signUp(mockEvent)).toBeUndefined();
    expect(SignUpAPI.prototype.signUp).toHaveBeenCalledWith(mockNewUserObject);

    expect(Cookies.prototype.set).not.toHaveBeenCalled();
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('signUp.html');
  });

  it('should catch any potential error in the API request and log it. If error.response.status is equal to 401, it should redirect the user to signUp.html and return undefined', async () => {
    signUpForm._usernameInput.value = 'JohnDoe';
    signUpForm._passwordInput.value = 'JohnDoe123';

    const mockNewUserObject = {
      username: 'JohnDoe',
      password: 'JohnDoe123',
    };
    
    const mockRejectedResponse = {
      response: {
        status: 401,
        data: { mockValue: 'mockProperty' },
      },
    }; 
    
    SignUpAPI.prototype.signUp.mockRejectedValueOnce(mockRejectedResponse);
    Cookies.prototype.set.mockImplementationOnce(() => {});

    const consoleSpy = jest.spyOn(window.console, 'log');

    expect(await signUpForm._signUp(mockEvent)).toBeUndefined();
    expect(SignUpAPI.prototype.signUp).toHaveBeenCalledWith(mockNewUserObject);

    expect(Cookies.prototype.set).not.toHaveBeenCalled();

    expect(consoleSpy).toHaveBeenCalledWith(mockRejectedResponse.response.data);
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('signUp.html');
  });

  it('should catch any potential error in the API request and log it. If error.response.status is equal to 409, it should call ErrorSpan.prototype.display() with the parent element of _usernameInput, call LoadingModal.remove(), then return undefined', async () => {
    signUpForm._usernameInput.value = 'JohnDoe';
    signUpForm._passwordInput.value = 'JohnDoe123';

    const usernameFormGroup = signUpForm._usernameInput.parentElement;

    const mockNewUserObject = {
      username: 'JohnDoe',
      password: 'JohnDoe123',
    };
    
    const mockRejectedResponse = {
      response: {
        status: 409,
        data: { mockValue: 'mockProperty' },
      },
    }; 
    
    SignUpAPI.prototype.signUp.mockRejectedValueOnce(mockRejectedResponse);
    Cookies.prototype.set.mockImplementationOnce(() => {});

    const consoleSpy = jest.spyOn(window.console, 'log');

    expect(await signUpForm._signUp(mockEvent)).toBeUndefined();
    expect(SignUpAPI.prototype.signUp).toHaveBeenCalledWith(mockNewUserObject);

    expect(Cookies.prototype.set).not.toHaveBeenCalled();

    expect(consoleSpy).toHaveBeenCalledWith(mockRejectedResponse.response.data);

    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(usernameFormGroup, 'Username already taken.');
    expect(LoadingModal.remove).toHaveBeenCalled();
  });

  it('should catch any potential error in the API request and log it. If error.response.status is not equal to 409 (most likely 500), it should redirect the user to signUp.html, then return undefined', async () => {
    signUpForm._usernameInput.value = 'JohnDoe';
    signUpForm._passwordInput.value = 'JohnDoe123';

    const mockNewUserObject = {
      username: 'JohnDoe',
      password: 'JohnDoe123',
    };
    
    const mockRejectedResponse = {
      response: {
        status: 500,
        data: { mockValue: 'mockProperty' },
      },
    }; 
    
    SignUpAPI.prototype.signUp.mockRejectedValueOnce(mockRejectedResponse);
    Cookies.prototype.set.mockImplementationOnce(() => {});

    const consoleSpy = jest.spyOn(window.console, 'log');

    expect(await signUpForm._signUp(mockEvent)).toBeUndefined();
    expect(SignUpAPI.prototype.signUp).toHaveBeenCalledWith(mockNewUserObject);

    expect(Cookies.prototype.set).not.toHaveBeenCalled();

    expect(consoleSpy).toHaveBeenCalledWith(mockRejectedResponse.response.data);
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('signUp.html');
  });
});

describe('_validateUsername(input)', () => {
  let usernameFormGroup;

  beforeEach(() => {
    usernameFormGroup = signUpForm._usernameInput.parentElement;
  });

  afterEach(() => {
    usernameFormGroup = null;
  });
  
  it('should check the value of the value of _usernameInput, and if its length is less than 5 characters, call ErrorSpan.prototype.display() with the parent element of _usernameInput, then return false', () => {
    signUpForm._usernameInput.value = 'Jay';
    
    expect(signUpForm._validateUsername(signUpForm._usernameInput)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(usernameFormGroup, 'Username must be at least 5 characters long.');
  });

  it('should check the value of the value of _usernameInput, and if its length is greater than 24 characters, call ErrorSpan.prototype.display() with the parent element of _usernameInput, then return false', () => {
    signUpForm._usernameInput.value = 'extremelyLongUsernameForSomeReason';
    
    expect(signUpForm._validateUsername(signUpForm._usernameInput)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(usernameFormGroup, 'Username can not be longer than 24 characters.');
  });

  it('should check the value of the value of _usernameInput, and does not match the regex in the function, call ErrorSpan.prototype.display() with the parent element of _usernameInput, then return false', () => {
    signUpForm._usernameInput.value = 'invalid_username';
    
    expect(signUpForm._validateUsername(signUpForm._usernameInput)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(usernameFormGroup, 'Username must contain at least one English letter, and must not special characters or non-English letters.');
  });

  it('should check the value of the value of _usernameInput, and if it is a valid value, call ErrorSpan.prototype.hide() with the parent element of _usernameInput, then return true', () => {
    signUpForm._usernameInput.value = 'validUsername';
    
    expect(signUpForm._validateUsername(signUpForm._usernameInput)).toBe(true);
    expect(ErrorSpan.prototype.hide).toHaveBeenCalled()
  });
});


describe('_validatePassword(input)', () => {
  let passwordFormGroup;

  beforeEach(() => {
    passwordFormGroup = signUpForm._passwordInput.parentElement;
  });

  afterEach(() => {
    passwordFormGroup = null;
  });
  
  it('should check the value of the value of _passwordInput, and if its length is less than 8 characters, call ErrorSpan.prototype.display() with the parent element of _passwordInput, then return false', () => {
    signUpForm._passwordInput.value = '12345';
    
    expect(signUpForm._validatePassword(signUpForm._passwordInput)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(passwordFormGroup, 'Password must be at least 8 characters long.');
  });

  it('should check the value of the value of _passwordInput, and if its length is greater than 40 characters, call ErrorSpan.prototype.display() with the parent element of _passwordInput, then return false', () => {
    signUpForm._passwordInput.value = 'iCareSoMuchAboutSecuritySoMyPasswordIsVeryLong';
    
    expect(signUpForm._validatePassword(signUpForm._passwordInput)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(passwordFormGroup, 'Password can not be longer than 40 characters.');
  });

  it('should check the value of the value of _passwordInput, and does not match the regex in the function, call ErrorSpan.prototype.display() with the parent element of _passwordInput, then return false', () => {
    signUpForm._passwordInput.value = 'invalid password!';
    
    expect(signUpForm._validatePassword(signUpForm._passwordInput)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(passwordFormGroup, 'Whitespace is not allowed.');
  });

  it('should check the value of the value of _passwordInput, and does not match the regex in the function, call ErrorSpan.prototype.display() with the parent element of _passwordInput, then return false', () => {
    signUpForm._passwordInput.value = 'invalid-password!';
    
    expect(signUpForm._validatePassword(signUpForm._passwordInput)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(passwordFormGroup, 'Special characters, apart from dots and underscores, are not allowed.');
  });

  it('should check the value of the value of _passwordInput, and if it is a valid value, call ErrorSpan.prototype.hide() with the parent element of _passwordInput, then return true', () => {
    signUpForm._passwordInput.value = 'validPassword';
    
    expect(signUpForm._validatePassword(signUpForm._passwordInput)).toBe(true);
    expect(ErrorSpan.prototype.hide).toHaveBeenCalled()
  });
});