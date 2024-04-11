import UpdatePasswordForm from "../../../js/components/updatePassword/UpdatePasswordForm";

import ErrorSpan from "../../../js/components/global/ErrorSpan";
import RevealPassword from "../../../js/components/signing/RevealPassword";
import LinksContainer from "../../../js/components/signing/LinksContainer";
import LoadingModal from "../../../js/components/global/LoadingModal";
import redirectAfterDelayMillisecond from "../../../js/components/global/redirectAfterDelayMillisecond";
import Cookies from "../../../js/components/global/Cookies";
import RecoveryAPI from "../../../js/components/services/RecoveryAPI";
import generateAPIKey from "../../../js/components/global/generateAPIKey";


jest.mock('../../../js/components/global/ErrorSpan');
jest.mock('../../../js/components/signing/RevealPassword');
jest.mock('../../../js/components/signing/LinksContainer');
jest.mock('../../../js/components/global/LoadingModal');
jest.mock('../../../js/components/global/redirectAfterDelayMillisecond');
jest.mock('../../../js/components/global/Cookies');
jest.mock('../../../js/components/services/RecoveryAPI');
jest.mock('../../../js/components/global/generateAPIKey');

const updatePasswordFormHTML = `
<section class="updatePassword">
  <div class="container">
    <form class="updatePassword-container">
      <h3 class="content-t">Update your password</h3>

      <div class="h-line"></div>

      <p class="content-p">Please set up your new password below.</p>

      <div class="form-group hidden">
        <!-- For browser accessability - Not used for validation -->
        <label for="username"></label>
        <input
          type="text"
          id="username"
          autocomplete="username"
          disabled
        />
      </div>

      <div class="form-group">
        <label for="password">New password</label>
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
        <label for="confirmPassword">Confirm new password</label>
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

      <button
        type="submit"
        class="btn btn-cta"
        id="recoveryBtn"
      >
        Confirm
      </button>

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
</section>
`;

let updatePasswordForm;
let mockAPIKey;

beforeEach(() => {
  document.body.innerHTML = updatePasswordFormHTML;
  updatePasswordForm = new UpdatePasswordForm();
  
  mockAPIKey = 'a5tZAgqE8sbF7Ddar5h9FmeA9MQCY1hmgKW3UgKpjiGbqJHWNmT8P8genEPvkcuq';
  generateAPIKey.mockImplementation(() => { return mockAPIKey; });
});

afterEach(() => {
  document.body.innerHTML = '';
  updatePasswordForm = null;
  mockAPIKey = null;
  jest.resetAllMocks();
});

describe('_updatePassword(e)', () => {
  let mockEvent;

  beforeEach(() => {
    mockEvent = { preventDefault: () => {} };

    delete window.location;
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href: 'http://localhost:3000/updatePassword.html?id=mockUserID&recoveryCode=mockRecoveryCode',
        search: '?id=mockUserID&recoveryCode=mockRecoveryCode',
      },
    });
  });

  afterEach(() => {
    mockEvent = null;
    delete window.location;
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href: 'http://localhost:3000'
      },
    });
  });

  it('should always call e.preventDefault() and LoadingModal.display()', async () => {
    const mockEventSpy = jest.spyOn(mockEvent, 'preventDefault');
    
    await updatePasswordForm._updatePassword(mockEvent);

    expect(mockEventSpy).toHaveBeenCalled();
    expect(LoadingModal.display).toHaveBeenCalled();
  });
  
  it('should, if the password provided is invalid, call LoadingModal.remove(), return undefined, and stop the function', async () => {
    updatePasswordForm._passwordInput.value = 'invalid password';
    const _validatePasswordSpy = jest.spyOn(updatePasswordForm, '_validatePassword');

    expect(await updatePasswordForm._updatePassword(mockEvent)).toBeUndefined();
    expect(_validatePasswordSpy).toHaveBeenCalled();
    expect(LoadingModal.remove).toHaveBeenCalled();
  });
  
  it('should, if the passwords are not identical, call LoadingModal.remove(), return undefined, and stop the function', async () => {
    updatePasswordForm._passwordInput.value = 'validPassword';
    updatePasswordForm._confirmPasswordInput.value = 'someOtherPassword';

    const _validateConfirmPasswordSpy = jest.spyOn(updatePasswordForm, '_validateConfirmPassword');

    expect(await updatePasswordForm._updatePassword(mockEvent)).toBeUndefined();
    expect(_validateConfirmPasswordSpy).toHaveBeenCalled();
    expect(LoadingModal.remove).toHaveBeenCalled();
  });

  it(`should, if the new password is valid, call RecoveryAPI.prototype.updatePassword(recoveryData). If the request is successful, it should retrieve the loginToken from the response, assign it to the browser's cookies, redirect the user to history.html with a successful message, then return undefined`, async () => {
    RecoveryAPI.prototype.updatePassword.mockResolvedValueOnce({ data: { loginToken: 'mockLoginToken' } });
    Cookies.prototype.set.mockImplementationOnce(() => {});

    updatePasswordForm._passwordInput.value = 'validPassword';
    updatePasswordForm._confirmPasswordInput.value = 'validPassword';

    const recoveryData = {
      userID: 'mockUserID', // Mocked in the href in this suite
      recoveryCode: 'mockRecoveryCode', // Mocked in the href in this suite
      newPassword: 'validPassword',
    };
    
    expect(await updatePasswordForm._updatePassword(mockEvent)).toBeUndefined();
    expect(RecoveryAPI.prototype.updatePassword).toHaveBeenCalledWith(mockAPIKey, recoveryData);
    expect(Cookies.prototype.set).toHaveBeenCalledWith('loginToken', 'mockLoginToken');
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('history.html', 1000, 'Account recovered successfully!', 'success');

  });
  
  it(`should, if the new password is valid, call RecoveryAPI.prototype.updatePassword(recoveryData). If the request fails without a response object, the error shouldn't be console-logged`, async () => {
    RecoveryAPI.prototype.updatePassword.mockRejectedValueOnce({});
    const consoleSpy = jest.spyOn(window.console, 'log');

    updatePasswordForm._passwordInput.value = 'validPassword';
    updatePasswordForm._confirmPasswordInput.value = 'validPassword';

    const recoveryData = {
      userID: 'mockUserID', // Mocked in the href in this suite
      recoveryCode: 'mockRecoveryCode', // Mocked in the href in this suite
      newPassword: 'validPassword',
    };

    expect(await updatePasswordForm._updatePassword(mockEvent)).toBeUndefined();
    expect(RecoveryAPI.prototype.updatePassword).toHaveBeenCalledWith(mockAPIKey, recoveryData);
    expect(consoleSpy).not.toHaveBeenCalled();
  });
  
  it(`should, if the new password is valid, call RecoveryAPI.prototype.updatePassword(recoveryData). If the request fails with response object, the error should be console-logged`, async () => {
    RecoveryAPI.prototype.updatePassword.mockRejectedValueOnce({ response: { data: 'mockData' } });
    const consoleSpy = jest.spyOn(window.console, 'log');

    updatePasswordForm._passwordInput.value = 'validPassword';
    updatePasswordForm._confirmPasswordInput.value = 'validPassword';

    const recoveryData = {
      userID: 'mockUserID', // Mocked in the href in this suite
      recoveryCode: 'mockRecoveryCode', // Mocked in the href in this suite
      newPassword: 'validPassword',
    };

    expect(await updatePasswordForm._updatePassword(mockEvent)).toBeUndefined();
    expect(RecoveryAPI.prototype.updatePassword).toHaveBeenCalledWith(mockAPIKey, recoveryData);
    expect(consoleSpy).toHaveBeenCalledWith('mockData');
  });

  it(`should, if the new password is valid, call RecoveryAPI.prototype.updatePassword(recoveryData). If the request fails without a response object, it should refresh the page using redirectAfterDelayMilliseconds()`, async () => {
    RecoveryAPI.prototype.updatePassword.mockRejectedValueOnce({});

    updatePasswordForm._passwordInput.value = 'validPassword';
    updatePasswordForm._confirmPasswordInput.value = 'validPassword';

    const recoveryData = {
      userID: 'mockUserID', // Mocked in the href in this suite
      recoveryCode: 'mockRecoveryCode', // Mocked in the href in this suite
      newPassword: 'validPassword',
    };

    expect(await updatePasswordForm._updatePassword(mockEvent)).toBeUndefined();
    expect(RecoveryAPI.prototype.updatePassword).toHaveBeenCalledWith(mockAPIKey, recoveryData);
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('updatePassword.html?id=mockUserID&recoveryCode=mockRecoveryCode');
  });

  it(`should, if the new password is valid, call RecoveryAPI.prototype.updatePassword(recoveryData). If the request fails with a status of 404, it should call ErrorSpan.prototype.display(), LoadingModal.remove(), then return undefined`, async () => {
    RecoveryAPI.prototype.updatePassword.mockRejectedValueOnce({ response: { status: 404 } });
    const passwordInputFormGroup = updatePasswordForm._passwordInput.parentElement;

    updatePasswordForm._passwordInput.value = 'validPassword';
    updatePasswordForm._confirmPasswordInput.value = 'validPassword';

    const recoveryData = {
      userID: 'mockUserID', // Mocked in the href in this suite
      recoveryCode: 'mockRecoveryCode', // Mocked in the href in this suite
      newPassword: 'validPassword',
    };

    expect(await updatePasswordForm._updatePassword(mockEvent)).toBeUndefined();
    expect(RecoveryAPI.prototype.updatePassword).toHaveBeenCalledWith(mockAPIKey, recoveryData);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(passwordInputFormGroup, 'Invalid request. Please follow the link in the recovery email and do not amend it.');
    expect(LoadingModal.remove).toHaveBeenCalled();
  });

  it(`should, if the new password is valid, call RecoveryAPI.prototype.updatePassword(recoveryData). If the request fails with a status of 401, it should call ErrorSpan.prototype.display(), LoadingModal.remove(), then return undefined`, async () => {
    RecoveryAPI.prototype.updatePassword.mockRejectedValueOnce({ response: { status: 401, data: { message: 'mockMessage' } } });
    const passwordInputFormGroup = updatePasswordForm._passwordInput.parentElement;

    updatePasswordForm._passwordInput.value = 'validPassword';
    updatePasswordForm._confirmPasswordInput.value = 'validPassword';

    const recoveryData = {
      userID: 'mockUserID', // Mocked in the href in this suite
      recoveryCode: 'mockRecoveryCode', // Mocked in the href in this suite
      newPassword: 'validPassword',
    };

    expect(await updatePasswordForm._updatePassword(mockEvent)).toBeUndefined();
    expect(RecoveryAPI.prototype.updatePassword).toHaveBeenCalledWith(mockAPIKey, recoveryData);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(passwordInputFormGroup, 'Invalid recovery code. Please follow the link in the recovery email and do not amend it.');
    expect(LoadingModal.remove).toHaveBeenCalled();
  });

  it(`should, if the new password is valid, call RecoveryAPI.prototype.updatePassword(recoveryData). If the request fails with a status of 409, it should call ErrorSpan.prototype.display(), LoadingModal.remove(), then return undefined`, async () => {
    RecoveryAPI.prototype.updatePassword.mockRejectedValueOnce({ response: { status: 409 } });
    const passwordInputFormGroup = updatePasswordForm._passwordInput.parentElement;

    updatePasswordForm._passwordInput.value = 'validPassword';
    updatePasswordForm._confirmPasswordInput.value = 'validPassword';

    const recoveryData = {
      userID: 'mockUserID', // Mocked in the href in this suite
      recoveryCode: 'mockRecoveryCode', // Mocked in the href in this suite
      newPassword: 'validPassword',
    };

    expect(await updatePasswordForm._updatePassword(mockEvent)).toBeUndefined();
    expect(RecoveryAPI.prototype.updatePassword).toHaveBeenCalledWith(mockAPIKey, recoveryData);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(passwordInputFormGroup, 'Invalid password.');
    expect(LoadingModal.remove).toHaveBeenCalled();
  });

  it(`should, if the new password is valid, call RecoveryAPI.prototype.updatePassword(recoveryData). If the request fails with with a different status (most likely 500), refresh the page using redirectAfterDelayMilliseconds(), then return undefined`, async () => {
    RecoveryAPI.prototype.updatePassword.mockRejectedValueOnce({ response: { status: 500 } });
    const passwordInputFormGroup = updatePasswordForm._passwordInput.parentElement;

    updatePasswordForm._passwordInput.value = 'validPassword';
    updatePasswordForm._confirmPasswordInput.value = 'validPassword';

    const recoveryData = {
      userID: 'mockUserID', // Mocked in the href in this suite
      recoveryCode: 'mockRecoveryCode', // Mocked in the href in this suite
      newPassword: 'validPassword',
    };

    expect(await updatePasswordForm._updatePassword(mockEvent)).toBeUndefined();
    expect(RecoveryAPI.prototype.updatePassword).toHaveBeenCalledWith(mockAPIKey, recoveryData);
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('updatePassword.html?id=mockUserID&recoveryCode=mockRecoveryCode');
  });
});


describe('_validatePassword(input)', () => {
  let passwordFormGroup;

  beforeEach(() => {
    passwordFormGroup = updatePasswordForm._passwordInput.parentElement;
  });

  afterEach(() => {
    passwordFormGroup = null;
  });
  
  it('should check the value of the value of _passwordInput, and if its length is less than 8 characters, call ErrorSpan.prototype.display() with the parent element of _passwordInput, then return false', () => {
    updatePasswordForm._passwordInput.value = '12345';
    
    expect(updatePasswordForm._validatePassword(updatePasswordForm._passwordInput)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(passwordFormGroup, 'Password must be at least 8 characters long.');
  });

  it('should check the value of the value of _passwordInput, and if its length is greater than 40 characters, call ErrorSpan.prototype.display() with the parent element of _passwordInput, then return false', () => {
    updatePasswordForm._passwordInput.value = 'iCareSoMuchAboutSecuritySoMyPasswordIsVeryLong';
    
    expect(updatePasswordForm._validatePassword(updatePasswordForm._passwordInput)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(passwordFormGroup, 'Password can not be longer than 40 characters.');
  });

  it('should check the value of the value of _passwordInput, and does not match the regex in the function, call ErrorSpan.prototype.display() with the parent element of _passwordInput, then return false', () => {
    updatePasswordForm._passwordInput.value = 'invalid password!';
    
    expect(updatePasswordForm._validatePassword(updatePasswordForm._passwordInput)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(passwordFormGroup, 'Whitespace is not allowed.');
  });

  it('should check the value of the value of _passwordInput, and does not match the regex in the function, call ErrorSpan.prototype.display() with the parent element of _passwordInput, then return false', () => {
    updatePasswordForm._passwordInput.value = 'invalid-password!';
    
    expect(updatePasswordForm._validatePassword(updatePasswordForm._passwordInput)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(passwordFormGroup, 'Special characters, apart from dots and underscores, are not allowed.');
  });

  it('should check the value of the value of _passwordInput, and if it is a valid value, call ErrorSpan.prototype.hide() with the parent element of _passwordInput, then return true', () => {
    updatePasswordForm._passwordInput.value = 'validPassword';
    
    expect(updatePasswordForm._validatePassword(updatePasswordForm._passwordInput)).toBe(true);
    expect(ErrorSpan.prototype.hide).toHaveBeenCalled()
  });
});

describe('_validateConfirmPassword(input)', () => {
  let inputFormGroup;

  beforeEach(() => {
    inputFormGroup = updatePasswordForm._confirmPasswordInput.parentElement;
  });

  afterEach(() => {
    updatePasswordForm._passwordInput.value = '';
    updatePasswordForm._confirmPasswordInput.value = '';
    inputFormGroup = null;
  });
  
  it('should compare the _confirmPasswordInput value to the _passwordInput value, and if they do not match, call ErrorSpan.prototype.display() with the parent element of _confirmPasswordInput and return false', () => {
    updatePasswordForm._passwordInput.value = 'somePassword';
    updatePasswordForm._confirmPasswordInput.value = 'someOtherPassword';

    expect(updatePasswordForm._validateConfirmPassword(updatePasswordForm._confirmPasswordInput)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(inputFormGroup, 'Passwords are not identical.');
  });
  
  it('should compare the _confirmPasswordInput value to the _passwordInput value, and if they match, call ErrorSpan.prototype.hide() with the parent element of _confirmPasswordInput and return true', () => {
    updatePasswordForm._passwordInput.value = 'somePassword';
    updatePasswordForm._confirmPasswordInput.value = 'somePassword';

    expect(updatePasswordForm._validateConfirmPassword(updatePasswordForm._confirmPasswordInput)).toBe(true);
    expect(ErrorSpan.prototype.hide).toHaveBeenCalledWith(inputFormGroup);
  });
});