import SignInForm from "../../../js/components/signIn/SignInForm";

import SignInAPI from "../../../js/components/services/SignInAPI";
import Cookies from "../../../js/components/global/Cookies";
import RevealPassword from "../../../js/components/signing/RevealPassword";
import LinksContainer from "../../../js/components/signing/LinksContainer";
import LoadingModal from "../../../js/components/global/LoadingModal";
import redirectAfterDelayMillisecond from "../../../js/components/global/redirectAfterDelayMillisecond";
import ErrorSpan from "../../../js/components/global/ErrorSpan";
import FormCheckbox from "../../../js/components/global/FormCheckbox";

jest.mock('../../../js/components/services/SignInAPI');
jest.mock('../../../js/components/global/Cookies');
jest.mock('../../../js/components/signing/RevealPassword');
jest.mock('../../../js/components/signing/LinksContainer');
jest.mock('../../../js/components/global/LoadingModal');
jest.mock('../../../js/components/global/locateLoginToken');
jest.mock('../../../js/components/global/redirectAfterDelayMillisecond');
jest.mock('../../../js/components/global/ErrorSpan');
jest.mock('../../../js/components/global/FormCheckbox');

const signInFormHTML = `
  <section class="sign-in">
    <div class="container">
      <div class="sign-in-container">
        <form class="sign-in-container-form">
          <h3 class="content-t">Sign in to your account</h3>

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
              Sign in
            </button>
          </div>

          <p>
            Don't have an account?
            <a href="signUp.html">Sign up here</a>. Alternatively, you can
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

let signInForm;

beforeEach(() => {
  document.body.innerHTML = signInFormHTML;
  signInForm = new SignInForm();
});

afterEach(() => {
  document.body.innerHTML = '';
  signInForm = null;
  jest.resetAllMocks();
});

describe('_signIn(e)', () => {
  let mockEvent;

  beforeEach(() => {
    mockEvent = { preventDefault: () => {} };
  });

  afterEach(() => {
    mockEvent = null;
  });
  
  it('should always call e.preventDefault() and LoadingModal.display()', async () => {
    signInForm._usernameInput.value = ''; // ensuring an input is empty to force an early return for this test
    const preventDefaultSpy = jest.spyOn(mockEvent, 'preventDefault');
    
    await signInForm._signIn(mockEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(LoadingModal.display).toHaveBeenCalled();
  });
  
  it('should call LoadingModal.remove() and return undefined, if either of the username or password inputs are empty', async () => {
    signInForm._usernameInput.value = '';
    
    expect(await signInForm._signIn(mockEvent)).toBeUndefined();
    expect(LoadingModal.remove).toHaveBeenCalled();
  });
  
  it(`should, if neither inputs are empty, create a user object of both input values, call SignInAPI.prototype.signIn() to obtain the loginToken, add the loginToken to the browser cookies, redirect the user to history.html after 1 second, then return undefined. If _keepMeSignedInCheckBox contains a class of "checked", the cookie should have an age equal to _loginTokenAge`, async () => {
    signInForm._usernameInput.value = 'mockUsername';
    signInForm._passwordInput.value = 'mockPassword';
    
    const mockUserObject = {
      username: 'mockUsername',
      password: 'mockPassword',
    };
    
    signInForm._keepMeSignedInCheckBox.classList.add('checked');
    
    const mockResolvedResponse = {
      data: {
        token: 'mockLoginToken',
      },
    };

    jest.spyOn(SignInAPI.prototype, 'signIn').mockResolvedValueOnce(mockResolvedResponse);
    Cookies.prototype.set.mockImplementationOnce(() => {});

    expect(await signInForm._signIn(mockEvent)).toBeUndefined();
    expect(SignInAPI.prototype.signIn).toHaveBeenCalledWith(mockUserObject);
    expect(Cookies.prototype.set).toHaveBeenCalledWith('loginToken', 'mockLoginToken', signInForm._loginTokenAge);
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('history.html', 1000, 'Signed in successfully!', 'success');
  });

  it(`should, if neither inputs are empty, create a user object of both input values, call SignInAPI.prototype.signIn() to obtain the loginToken, add the loginToken to the browser cookies, redirect the user to history.html after 1 second, then return undefined. If _keepMeSignedInCheckBox does not contain a class of "checked", the cookie shouldn't have an age, and will be automatically removed when the browser is closed`, async () => {
    signInForm._usernameInput.value = 'mockUsername';
    signInForm._passwordInput.value = 'mockPassword';
    
    const mockUserObject = {
      username: 'mockUsername',
      password: 'mockPassword',
    };
    
    signInForm._keepMeSignedInCheckBox.classList.remove('checked');
    
    const mockResolvedResponse = {
      data: {
        token: 'mockLoginToken',
      },
    };

    SignInAPI.prototype.signIn.mockResolvedValueOnce(mockResolvedResponse);
    Cookies.prototype.set.mockImplementationOnce(() => {});

    expect(await signInForm._signIn(mockEvent)).toBeUndefined();
    expect(SignInAPI.prototype.signIn).toHaveBeenCalledWith(mockUserObject);
    expect(Cookies.prototype.set).toHaveBeenCalledWith('loginToken', 'mockLoginToken');
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('history.html', 1000, 'Signed in successfully!', 'success');
  });

  it('should catch any potential error in the API request and log it. If the error does not have a response property, it should remove the loginToken from the cookies, redirect the user to signIn.html, and return undefined', async () => {
    signInForm._usernameInput.value = 'mockUsername';
    signInForm._passwordInput.value = 'mockPassword';
    
    const mockUserObject = {
      username: 'mockUsername',
      password: 'mockPassword',
    };
    
    const mockRejectedResponse = {};

    SignInAPI.prototype.signIn.mockRejectedValueOnce(mockRejectedResponse);
    Cookies.prototype.set.mockImplementationOnce(() => {});

    const consoleSpy = jest.spyOn(window.console, 'log').mockImplementationOnce(() => {});

    expect(await signInForm._signIn(mockEvent)).toBeUndefined();
    expect(SignInAPI.prototype.signIn).toHaveBeenCalledWith(mockUserObject);

    expect(consoleSpy).toHaveBeenCalledWith({});
    
    expect(Cookies.prototype.remove).toHaveBeenCalledWith('loginToken');
    expect(Cookies.prototype.set).not.toHaveBeenCalled();
    
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('signIn.html');
  });
  
  it('should catch any potential error in the API request and log it. if error.response.status is equal to 404, it should call ErrorSpan.prototype.display() with the parent element of _usernameInput, call LoadingModal.remove(), then return undefined', async () => {
    signInForm._usernameInput.value = 'mockUsername';
    signInForm._passwordInput.value = 'mockPassword';
    
    const usernameFormGroup = signInForm._usernameInput.parentElement;
    
    const mockUserObject = {
      username: 'mockUsername',
      password: 'mockPassword',
    };
    
    const mockRejectedResponse = {
      response: {
        status: 404,
      },
    };

    SignInAPI.prototype.signIn.mockRejectedValueOnce(mockRejectedResponse);
    Cookies.prototype.set.mockImplementationOnce(() => {});

    const consoleSpy = jest.spyOn(window.console, 'log').mockImplementationOnce(() => {});

    expect(await signInForm._signIn(mockEvent)).toBeUndefined();
    expect(SignInAPI.prototype.signIn).toHaveBeenCalledWith(mockUserObject);

    expect(consoleSpy).toHaveBeenCalledWith(mockRejectedResponse);
    
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(usernameFormGroup, `Username doesn't exist.`);
    expect(LoadingModal.remove).toHaveBeenCalled();
  });

  it('should catch any potential error in the API request and log it. if error.response.status is equal to 401, it should call ErrorSpan.prototype.display() with the parent element of _passwordInput, call LoadingModal.remove(), then return undefined', async () => {
    signInForm._usernameInput.value = 'mockUsername';
    signInForm._passwordInput.value = 'mockPassword';
    
    const passwordFormGroup = signInForm._passwordInput.parentElement;
    
    const mockUserObject = {
      username: 'mockUsername',
      password: 'mockPassword',
    };
    
    const mockRejectedResponse = {
      response: {
        status: 401,
      },
    };

    SignInAPI.prototype.signIn.mockRejectedValueOnce(mockRejectedResponse);
    Cookies.prototype.set.mockImplementationOnce(() => {});

    const consoleSpy = jest.spyOn(window.console, 'log').mockImplementationOnce(() => {});

    expect(await signInForm._signIn(mockEvent)).toBeUndefined();
    expect(SignInAPI.prototype.signIn).toHaveBeenCalledWith(mockUserObject);

    expect(consoleSpy).toHaveBeenCalledWith(mockRejectedResponse);
    
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(passwordFormGroup, 'Incorrect password.');
    expect(LoadingModal.remove).toHaveBeenCalled();
  });

  it('should catch any potential error in the API request and log it. if error.response.status is not equal to 404 or 401 (most likely 500), it should redirect the user to signUp.html', async () => {
    signInForm._usernameInput.value = 'mockUsername';
    signInForm._passwordInput.value = 'mockPassword';
    
    const mockUserObject = {
      username: 'mockUsername',
      password: 'mockPassword',
    };
    
    const mockRejectedResponse = {
      response: {
        status: 500,
      },
    };

    SignInAPI.prototype.signIn.mockRejectedValueOnce(mockRejectedResponse);
    Cookies.prototype.set.mockImplementationOnce(() => {});

    const consoleSpy = jest.spyOn(window.console, 'log').mockImplementationOnce(() => {});

    expect(await signInForm._signIn(mockEvent)).toBeUndefined();
    expect(SignInAPI.prototype.signIn).toHaveBeenCalledWith(mockUserObject);

    expect(consoleSpy).toHaveBeenCalledWith(mockRejectedResponse);
    
    expect(ErrorSpan.prototype.display).not.toHaveBeenCalled();
    expect(LoadingModal.remove).not.toHaveBeenCalled();

    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('signUp.html', 1000, 'Something went wrong');
  });
});

describe('_usernameInputIsEmpty()', () => {
  it('should, if the _usernameInput is empty, call ErrorSpan.prototype.display() with the parent element of the input, then return true', () => {
    signInForm._usernameInput.value = '';
    const usernameFormGroup = signInForm._usernameInput.parentElement;

    expect(signInForm._usernameInputIsEmpty()).toBe(true);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(usernameFormGroup, 'Please enter a username.');
  });
  
  it('should, if the _usernameInput is not empty, call ErrorSpan.prototype.hide() with the parent element of the input, then return false', () => {
    signInForm._usernameInput.value = 'mockValue';
    const usernameFormGroup = signInForm._usernameInput.parentElement;

    expect(signInForm._usernameInputIsEmpty()).toBe(false);
    expect(ErrorSpan.prototype.hide).toHaveBeenCalledWith(usernameFormGroup);
  });
});


describe('_passwordInputIsEmpty()', () => {
  it('should, if the _passwordInput is empty, call ErrorSpan.prototype.display() with the parent element of the input, then return true', () => {
    signInForm._passwordInput.value = '';
    const usernameFormGroup = signInForm._passwordInput.parentElement;

    expect(signInForm._passwordInputIsEmpty()).toBe(true);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(usernameFormGroup, 'Please enter a password.');
  });
  
  it('should, if the _passwordInput is not empty, call ErrorSpan.prototype.hide() with the parent element of the input, then return false', () => {
    signInForm._passwordInput.value = 'mockValue';
    const usernameFormGroup = signInForm._passwordInput.parentElement;

    expect(signInForm._passwordInputIsEmpty()).toBe(false);
    expect(ErrorSpan.prototype.hide).toHaveBeenCalledWith(usernameFormGroup);
  });
});
