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
          <p class="content-p">Just a few quick and simple steps!</p>

          <div class="h-line"></div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="text"
              id="email"
              autocomplete="email"
              autocapitalize="off"
            />
            <span class="error-span"></span>
          </div>

          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              autocomplete="username"
              autocapitalize="off"
            />
            <span class="error-span"></span>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              autocomplete="new-password"
            />
            <div
              class="svg-div"
              id="revealPassword"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                class="svg-icon"
                tabindex="0"
              >
                <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                  d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                />
              </svg>
            </div>
            <span class="error-span"></span>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              autocomplete="new-password"
            />
            <div
              class="svg-div"
              id="revealConfirmPassword"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                class="svg-icon"
                tabindex="0"
              >
                <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                  d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                />
              </svg>
            </div>
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

          <div class="form-group description-group">
            <p>
              By signing up to Bill Divider, you are agreeing to our
              <a
                href="termsOfService.html"
                target="_blank"
                >Terms of Service</a
              >.
            </p>
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
            <a href="signIn.html">Sign in here</a>. Alternatively, you can <a href="session.html">start an anonymous session</a>.
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

describe('_signUp', () => {
  it('should always call e.preventDefault() and LoadingModal.display()', async () => {
    const mockEvent = { preventDefault: () => {} };
    const mockEventSpy = jest.spyOn(mockEvent, 'preventDefault');

    await signUpForm._signUp(mockEvent);
    expect(mockEventSpy).toHaveBeenCalled();
    expect(LoadingModal.display).toHaveBeenCalled();
  });
  
  it('should call 4 validation functions for the form inputs', async () => {
    const _validateEmailSpy = jest.spyOn(signUpForm, '_validateEmail');
    const _validateUsernameSpy = jest.spyOn(signUpForm, '_validateUsername');
    const _validatePasswordSpy = jest.spyOn(signUpForm, '_validatePassword');
    const _validateConfirmPasswordSpy = jest.spyOn(signUpForm, '_validateConfirmPassword');

    const mockEvent = { preventDefault: () => {} };
    await signUpForm._signUp(mockEvent);

    expect(_validateEmailSpy).toHaveBeenCalledWith(signUpForm._emailInput);
    expect(_validateUsernameSpy).toHaveBeenCalledWith(signUpForm._usernameInput);
    expect(_validatePasswordSpy).toHaveBeenCalledWith(signUpForm._passwordInput);
    expect(_validateConfirmPasswordSpy).toHaveBeenCalledWith(signUpForm._confirmPasswordInput);
  });

  it('should, if the email provided is invalid, call LoadingModal.remove(), stop the function, and return undefined', async () => {
    signUpForm._emailInput.value = 'invalidEmail.com';
    signUpForm._usernameInput.value = 'validUsername';
    signUpForm._passwordInput.value = 'validPassword';
    signUpForm._confirmPasswordInput.value = 'validPassword';
    
    const mockEvent = { preventDefault: () => {} };
    expect(await signUpForm._signUp(mockEvent)).toBeUndefined();
    expect(LoadingModal.remove).toHaveBeenCalled();
  });

  it('should, if the username provided is invalid, call LoadingModal.remove(), stop the function, and return undefined', async () => {
    signUpForm._emailInput.value = 'validEmail@example.com';
    signUpForm._usernameInput.value = 'invalid-username!';
    signUpForm._passwordInput.value = 'validPassword';
    signUpForm._confirmPasswordInput.value = 'validPassword';
    
    const mockEvent = { preventDefault: () => {} };
    expect(await signUpForm._signUp(mockEvent)).toBeUndefined();
    expect(LoadingModal.remove).toHaveBeenCalled();
  });

  it('should, if the password provided is invalid, call LoadingModal.remove(), stop the function, and return undefined', async () => {
    signUpForm._emailInput.value = 'validEmail@example.com';
    signUpForm._usernameInput.value = 'validUsername';
    signUpForm._passwordInput.value = 'invalid->password';
    signUpForm._confirmPasswordInput.value = 'invalid->password';
    
    const mockEvent = { preventDefault: () => {} };
    expect(await signUpForm._signUp(mockEvent)).toBeUndefined();
    expect(LoadingModal.remove).toHaveBeenCalled();
  });
  
  it('should, if the confirm password input value is not identical to the password input value, call LoadingModal.remove(), stop the function, and return undefined', async () => {
    signUpForm._emailInput.value = 'validEmail@example.com';
    signUpForm._usernameInput.value = 'validUsername';
    signUpForm._passwordInput.value = 'validPassword';
    signUpForm._confirmPasswordInput.value = 'nonIdenticalPassword';
    
    const mockEvent = { preventDefault: () => {} };
    expect(await signUpForm._signUp(mockEvent)).toBeUndefined();
    expect(LoadingModal.remove).toHaveBeenCalled();
  });

  it(`should, if all inputs are valid, call SignUpAPI.prototype.signUp, and assuming the request was successful, redirect the user to verification.html and return undefined. The link should also include the user's unverifiedUserID and a query regarding whether or not they would like to stay signed in`, async () => {
    signUpForm._emailInput.value = 'validEmail@example.com';
    signUpForm._usernameInput.value = 'validUsername';
    signUpForm._passwordInput.value = 'validPassword';
    signUpForm._confirmPasswordInput.value = 'validPassword';

    const newUser = {
      email: signUpForm._emailInput.value,
      username: signUpForm._usernameInput.value,
      password: signUpForm._passwordInput.value,
    };

    SignUpAPI.prototype.signUp.mockResolvedValueOnce({ data: { unverifiedUserID: 'mockUnverifiedUserID' } });
    signUpForm._keepMeSignedInCheckbox.classList.add('checked');

    const mockEvent = { preventDefault: () => {} };
    expect(await signUpForm._signUp(mockEvent)).toBeUndefined();

    expect(SignUpAPI.prototype.signUp).toHaveBeenCalledWith(newUser);
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('verification.html?id=mockUnverifiedUserID&keepMeSignedIn=true', 2000, 'Signed up successfully!', 'success');
  });
  
  it(`should, if all inputs are valid, call SignUpAPI.prototype.signUp, and if the request fails without a response object, it should call redirectAfterDelayMillisecond('signUp.html')`, async () => {
    signUpForm._emailInput.value = 'validEmail@example.com';
    signUpForm._usernameInput.value = 'validUsername';
    signUpForm._passwordInput.value = 'validPassword';
    signUpForm._confirmPasswordInput.value = 'validPassword';

    const newUser = {
      email: signUpForm._emailInput.value,
      username: signUpForm._usernameInput.value,
      password: signUpForm._passwordInput.value,
    };

    SignUpAPI.prototype.signUp.mockRejectedValueOnce('mockError');

    const mockEvent = { preventDefault: () => {} };
    expect(await signUpForm._signUp(mockEvent)).toBeUndefined();

    expect(SignUpAPI.prototype.signUp).toHaveBeenCalledWith(newUser);
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('signUp.html');
  });

  it(`should, if all inputs are valid, call SignUpAPI.prototype.signUp, and if the request fails with a status of 401, it should call redirectAfterDelayMillisecond('signUp.html')`, async () => {
    signUpForm._emailInput.value = 'validEmail@example.com';
    signUpForm._usernameInput.value = 'validUsername';
    signUpForm._passwordInput.value = 'validPassword';
    signUpForm._confirmPasswordInput.value = 'validPassword';

    const newUser = {
      email: signUpForm._emailInput.value,
      username: signUpForm._usernameInput.value,
      password: signUpForm._passwordInput.value,
    };

    SignUpAPI.prototype.signUp.mockRejectedValueOnce('mockError');

    const mockEvent = { preventDefault: () => {} };
    expect(await signUpForm._signUp(mockEvent)).toBeUndefined();

    expect(SignUpAPI.prototype.signUp).toHaveBeenCalledWith(newUser);
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('signUp.html');
  });

  it(`should, if all inputs are valid, call SignUpAPI.prototype.signUp, and if the request fails with a status of 409 and res.data.message is equal to "Email address already in use.", it should call ErrorSpan.prototype.display() and LoadingModal.remove(), then return undefined`, async () => {
    signUpForm._emailInput.value = 'validEmail@example.com';
    signUpForm._usernameInput.value = 'validUsername';
    signUpForm._passwordInput.value = 'validPassword';
    signUpForm._confirmPasswordInput.value = 'validPassword';

    const newUser = {
      email: signUpForm._emailInput.value,
      username: signUpForm._usernameInput.value,
      password: signUpForm._passwordInput.value,
    };

    const mockRejectedValue = {
      response: {
        status: 409,
        data: { success: false, message: 'Email address already in use.' },
      },
    };
    SignUpAPI.prototype.signUp.mockRejectedValueOnce(mockRejectedValue);

    const mockEvent = { preventDefault: () => {} };
    const inputFormGroup = signUpForm._emailInput.parentElement;
    
    expect(await signUpForm._signUp(mockEvent)).toBeUndefined();
    expect(SignUpAPI.prototype.signUp).toHaveBeenCalledWith(newUser);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(inputFormGroup, 'Email address already in use.');
    expect(LoadingModal.remove).toHaveBeenCalled();
  });

  it(`should, if all inputs are valid, call SignUpAPI.prototype.signUp, and if the request fails with a status of 409 and res.data.message is equal to "Username already taken.", it should call ErrorSpan.prototype.display() and LoadingModal.remove(), then return undefined`, async () => {
    signUpForm._emailInput.value = 'validEmail@example.com';
    signUpForm._usernameInput.value = 'validUsername';
    signUpForm._passwordInput.value = 'validPassword';
    signUpForm._confirmPasswordInput.value = 'validPassword';

    const newUser = {
      email: signUpForm._emailInput.value,
      username: signUpForm._usernameInput.value,
      password: signUpForm._passwordInput.value,
    };

    const mockRejectedValue = {
      response: {
        status: 409,
        data: { success: false, message: 'Username already taken.' },
      },
    };
    SignUpAPI.prototype.signUp.mockRejectedValueOnce(mockRejectedValue);

    const mockEvent = { preventDefault: () => {} };
    const inputFormGroup = signUpForm._usernameInput.parentElement;
    
    expect(await signUpForm._signUp(mockEvent)).toBeUndefined();
    expect(SignUpAPI.prototype.signUp).toHaveBeenCalledWith(newUser);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(inputFormGroup, 'Username already taken.');
    expect(LoadingModal.remove).toHaveBeenCalled();
  });

  it(`should, if all inputs are valid, call SignUpAPI.prototype.signUp, and if the request fails with a response object, but not a status of 401 or 409 (most likely 500), it should call redirectAfterDelayMillisecond('signUp.html')`, async () => {
    signUpForm._emailInput.value = 'validEmail@example.com';
    signUpForm._usernameInput.value = 'validUsername';
    signUpForm._passwordInput.value = 'validPassword';
    signUpForm._confirmPasswordInput.value = 'validPassword';

    const newUser = {
      email: signUpForm._emailInput.value,
      username: signUpForm._usernameInput.value,
      password: signUpForm._passwordInput.value,
    };

    SignUpAPI.prototype.signUp.mockRejectedValueOnce({ response: { status: 500 } });

    const mockEvent = { preventDefault: () => {} };
    expect(await signUpForm._signUp(mockEvent)).toBeUndefined();

    expect(SignUpAPI.prototype.signUp).toHaveBeenCalledWith(newUser);
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('signUp.html');
  });
});

describe('_validateEmail(input)', () => {
  let inputFormGroup;

  beforeEach(() => {
    inputFormGroup = signUpForm._emailInput.parentElement;
  });
  
  afterEach(() => {
    signUpForm._emailInput.value = '';
    inputFormGroup = null;
  });

  it('should, if the length of the email is above 150 characters, call ErrorSpan.prototype.display() then return false', () => {
    signUpForm._emailInput.value = 'superLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLong@email.com';

    expect(signUpForm._validateEmail(signUpForm._emailInput)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(inputFormGroup, 'Email address can not be longer than 150 characters.');
  });

  it('should, if the email contains any whitespace, call ErrorSpan.prototype.display() then return false', () => {
    signUpForm._emailInput.value = 'white space@example.com';

    expect(signUpForm._validateEmail(signUpForm._emailInput)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(inputFormGroup, 'Email address can not contain any whitespace.');
  });
  
  it('should, if the email does not match the regular expression which mimics regular browser email input validation, call ErrorSpan.prototype.display() then return false', () => {
    signUpForm._emailInput.value = 'example.com';

    expect(signUpForm._validateEmail(signUpForm._emailInput)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(inputFormGroup, 'Invalid email address.');
  });

  it('should, if a valid email is provided, call ErrorSpan.prototype.hide() then return true', () => {
    signUpForm._emailInput.value = 'example@example.com';

    expect(signUpForm._validateEmail(signUpForm._emailInput)).toBe(true);
    expect(ErrorSpan.prototype.hide).toHaveBeenCalledWith(inputFormGroup);
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

describe('_validateConfirmPassword(input)', () => {
  let inputFormGroup;

  beforeEach(() => {
    inputFormGroup = signUpForm._confirmPasswordInput.parentElement;
  });

  afterEach(() => {
    signUpForm._passwordInput.value = '';
    signUpForm._confirmPasswordInput.value = '';
    inputFormGroup = null;
  });
  
  it('should compare the _confirmPasswordInput value to the _passwordInput value, and if they do not match, call ErrorSpan.prototype.display() with the parent element of _confirmPasswordInput and return false', () => {
    signUpForm._passwordInput.value = 'somePassword';
    signUpForm._confirmPasswordInput.value = 'someOtherPassword';

    expect(signUpForm._validateConfirmPassword(signUpForm._confirmPasswordInput)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(inputFormGroup, 'Passwords are not identical.');
  });
  
  it('should compare the _confirmPasswordInput value to the _passwordInput value, and if they match, call ErrorSpan.prototype.hide() with the parent element of _confirmPasswordInput and return true', () => {
    signUpForm._passwordInput.value = 'somePassword';
    signUpForm._confirmPasswordInput.value = 'somePassword';

    expect(signUpForm._validateConfirmPassword(signUpForm._confirmPasswordInput)).toBe(true);
    expect(ErrorSpan.prototype.hide).toHaveBeenCalledWith(inputFormGroup);
  });
});
