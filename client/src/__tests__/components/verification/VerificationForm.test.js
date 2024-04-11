import VerificationForm from "../../../js/components/verification/VerificationForm";

import ErrorSpan from "../../../js/components/global/ErrorSpan";
import LoadingModal from "../../../js/components/global/LoadingModal";
import redirectAfterDelayMillisecond from "../../../js/components/global/redirectAfterDelayMillisecond";
import Cookies from "../../../js/components/global/Cookies";
import VerificationAPI from "../../../js/components/services/VerificationAPI";
import messagePopup from "../../../js/components/global/messagePopup";
import LinksContainer from "../../../js/components/signing/LinksContainer";
import generateAPIKey from "../../../js/components/global/generateAPIKey";

jest.mock('../../../js/components/global/ErrorSpan');
jest.mock('../../../js/components/global/LoadingModal');
jest.mock('../../../js/components/global/redirectAfterDelayMillisecond');
jest.mock('../../../js/components/global/Cookies');
jest.mock('../../../js/components/services/VerificationAPI');
jest.mock('../../../js/components/global/messagePopup');
jest.mock('../../../js/components/signing/LinksContainer');
jest.mock('../../../js/components/global/generateAPIKey');

const verificationFormHTML = `
<section class="verification">
  <div class="container">
    <form class="verification-container">
      <h3 class="content-t">Email verification</h3>

      <div class="h-line"></div>

      <div class="description">
        <p class="content-p">We've sent a 6-digit verification code to your email address. Please enter it below.</p>
        <p class="content-p">Note that the code will expire within 15 minutes.</p>
      </div>

      <div class="form-group">
        <label for="verificationInput">Verification code</label>
        <input
          type="text"
          id="verificationInput"
          maxlength="6"
        />
        <span class="error-span"></span>
      </div>

      <button
        type="submit"
        class="btn btn-cta"
      >
        Verify
      </button>

      <p class="resend">
        Didn't get an email?
        <span
          id="resendEmailBtn"
          tabindex="0"
          >Click here to resend it</span
        >.
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
</section>
`;

let verificationForm;
let mockAPIKey;

beforeEach(() => {
  document.body.innerHTML = verificationFormHTML;
  verificationForm = new VerificationForm();

  mockAPIKey = 'a5tZAgqE8sbF7Ddar5h9FmeA9MQCY1hmgKW3UgKpjiGbqJHWNmT8P8genEPvkcuq';
  generateAPIKey.mockImplementation(() => { return mockAPIKey; });

  delete window.location;
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      href: 'https://billdivider.fun/verification.html?id=mockUnverifiedUserID&keepMeSignedIn=',
      pathname: '/verification.html',
      search: '?id=mockUnverifiedUserID&keepMeSignedIn=',
    },
  });
});

afterEach(() => {
  delete window.location;
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {},
  });
  
  document.body.innerHTML = '';
  verificationForm = null;
  mockAPIKey = null;
  jest.resetAllMocks();
});

describe('_verify(e)', () => {
  let mockEvent;

  beforeEach(() => {
    mockEvent = { preventDefault: () => {} };
  });

  afterEach(() => {
    mockEvent = null;
  });
  
  it('should always call e.preventDefault() and LoadingModal.display()', async () => {
    const mockEventSpy = jest.spyOn(mockEvent, 'preventDefault');
    await verificationForm._verify(mockEvent);

    expect(mockEventSpy).toHaveBeenCalled();
    expect(LoadingModal.display).toHaveBeenCalled();
  });
  
  it('should, if the verification code is invalid, call LoadingModal.remove(), return undefined, and stop the function', async () => {
    verificationForm._verificationInput.value = '1234567';

    expect(await verificationForm._verify(mockEvent)).toBeUndefined();
    expect(LoadingModal.remove).toHaveBeenCalled();
  });
  
  it('should, if a valid verification code is passed in, extract the unverifiedUSerID and keepMeSignedIn values from the URL, transform the verification code passed in to uppercase, call VerificationAPI.protoType.verify() with the data collected, and if the request is successful, retrieve the loginToken and assign it to the browser cookies, then return undefined. If keeMeSignedIn is falsy, the cookie has no age. The user should finally be redirected to history.html', async () => {
    VerificationAPI.prototype.verify.mockResolvedValueOnce({ data: { loginToken: 'mockLoginToken' } });
    Cookies.prototype.set.mockImplementationOnce(() => {});

    verificationForm._verificationInput.value = 'abcdef';
    const expectedVerificationData = { unverifiedUserID: 'mockUnverifiedUserID', verificationCode: 'ABCDEF' };

    expect(await verificationForm._verify(mockEvent)).toBeUndefined();
    expect(VerificationAPI.prototype.verify).toHaveBeenCalledWith(mockAPIKey, expectedVerificationData);
    expect(Cookies.prototype.set).toHaveBeenCalledWith('loginToken', 'mockLoginToken');
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('history.html', 1000, 'Email verified!', 'success');
  });

  it('should, if a valid verification code is passed in, extract the unverifiedUSerID and keepMeSignedIn values from the URL, transform the verification code passed in to uppercase, call VerificationAPI.protoType.verify() with the data collected, and if the request is successful, retrieve the loginToken and assign it to the browser cookies, then return undefined. If keeMeSignedIn is truthy, the cookie age is set to 14 days. The user should finally be redirected to history.html', async () => {
    window.location.href = 'https://billdivider.fun/verification.html?id=mockUnverifiedUserID&keepMeSignedIn=true';
    
    VerificationAPI.prototype.verify.mockResolvedValueOnce({ data: { loginToken: 'mockLoginToken' } });
    Cookies.prototype.set.mockImplementationOnce(() => {});

    verificationForm._verificationInput.value = 'abcdef';
    const expectedVerificationData = { unverifiedUserID: 'mockUnverifiedUserID', verificationCode: 'ABCDEF' };

    expect(await verificationForm._verify(mockEvent)).toBeUndefined();
    expect(VerificationAPI.prototype.verify).toHaveBeenCalledWith(mockAPIKey, expectedVerificationData);
    expect(Cookies.prototype.set).toHaveBeenCalledWith('loginToken', 'mockLoginToken', verificationForm._loginTokenAge);
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('history.html', 1000, 'Email verified!', 'success');
  });

  it('should, if a valid verification code is passed in, call VerificationAPI.prototype.verify(). If the request fails without a response object, the error is not console-logged', async () => {
    VerificationAPI.prototype.verify.mockRejectedValue({});

    verificationForm._verificationInput.value = 'ABCDEF';
    const expectedVerificationData = { unverifiedUserID: 'mockUnverifiedUserID', verificationCode: 'ABCDEF' };

    const consoleSpy = jest.spyOn(window.console, 'log');

    expect(await verificationForm._verify(mockEvent)).toBeUndefined();
    expect(VerificationAPI.prototype.verify).toHaveBeenCalledWith(mockAPIKey, expectedVerificationData);
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('should, if a valid verification code is passed in, call VerificationAPI.prototype.verify(). If the request fails with a response object, the error should be console-logged', async () => {
    VerificationAPI.prototype.verify.mockRejectedValue({ response: { data: 'mockData' } });

    verificationForm._verificationInput.value = 'ABCDEF';
    const expectedVerificationData = { unverifiedUserID: 'mockUnverifiedUserID', verificationCode: 'ABCDEF' };

    const consoleSpy = jest.spyOn(window.console, 'log');

    expect(await verificationForm._verify(mockEvent)).toBeUndefined();
    expect(VerificationAPI.prototype.verify).toHaveBeenCalledWith(mockAPIKey, expectedVerificationData);
    expect(consoleSpy).toHaveBeenCalledWith('mockData');
  });
  
  it('should, if a valid verification code is passed in, call VerificationAPI.prototype.verify(). If the request fails without a response object, it should refresh the page with an error message using redirectAfterDelayMillisecond(), then return undefined', async () => {
    VerificationAPI.prototype.verify.mockRejectedValue({});

    verificationForm._verificationInput.value = 'ABCDEF';
    const expectedVerificationData = { unverifiedUserID: 'mockUnverifiedUserID', verificationCode: 'ABCDEF' };

    expect(await verificationForm._verify(mockEvent)).toBeUndefined();
    expect(VerificationAPI.prototype.verify).toHaveBeenCalledWith(mockAPIKey, expectedVerificationData);
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('verification.html?id=mockUnverifiedUserID&keepMeSignedIn=');
  });

  it('should, if a valid verification code is passed in, call VerificationAPI.prototype.verify(). If the request fails with a status code of 404, it should call ErrorSpan.prototype.display(), LoadingModal.remove(), then return undefined', async () => {
    VerificationAPI.prototype.verify.mockRejectedValue({ response: { status: 404 } });
    const inputFormGroup = verificationForm._verificationInput.parentElement;

    verificationForm._verificationInput.value = 'ABCDEF';
    const expectedVerificationData = { unverifiedUserID: 'mockUnverifiedUserID', verificationCode: 'ABCDEF' };
    
    expect(await verificationForm._verify(mockEvent)).toBeUndefined();
    expect(VerificationAPI.prototype.verify).toHaveBeenCalledWith(mockAPIKey, expectedVerificationData);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(inputFormGroup, 'Account does not exist or has already been validated.');
    expect(LoadingModal.remove).toHaveBeenCalled();
  });

  it(`should, if a valid verification code is passed in, call VerificationAPI.prototype.verify(). If the request fails with a status code of 401, and err.response.data.message is not equal to "API key missing or invalid." it should call ErrorSpan.prototype.display(), LoadingModal.remove(), then return undefined`, async () => {
    VerificationAPI.prototype.verify.mockRejectedValue({ response: { status: 401, data: { message: 'mockMessage' } } });
    const inputFormGroup = verificationForm._verificationInput.parentElement;

    verificationForm._verificationInput.value = 'ABCDEF';
    const expectedVerificationData = { unverifiedUserID: 'mockUnverifiedUserID', verificationCode: 'ABCDEF' };

    expect(await verificationForm._verify(mockEvent)).toBeUndefined();
    expect(VerificationAPI.prototype.verify).toHaveBeenCalledWith(mockAPIKey, expectedVerificationData);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(inputFormGroup, 'Incorrect verification code.');
    expect(LoadingModal.remove).toHaveBeenCalled();
  });

  it(`should, if a valid verification code is passed in, call VerificationAPI.prototype.verify(). If the request fails with a status code of 401, and err.response.data.message is equal to "API key missing or invalid." it should refresh the page with an error message using redirectAfterDelayMillisecond(), then return undefined`, async () => {
    VerificationAPI.prototype.verify.mockRejectedValue({ response: { status: 401, data: { message: 'API key missing or invalid.' } } });

    verificationForm._verificationInput.value = 'ABCDEF';
    const expectedVerificationData = { unverifiedUserID: 'mockUnverifiedUserID', verificationCode: 'ABCDEF' };

    expect(await verificationForm._verify(mockEvent)).toBeUndefined();
    expect(VerificationAPI.prototype.verify).toHaveBeenCalledWith(mockAPIKey, expectedVerificationData);
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('verification.html?id=mockUnverifiedUserID&keepMeSignedIn=');
  });


  it('should, if a valid verification code is passed in, call VerificationAPI.prototype.verify(). If the request fails with a different status code (most likely 500), it should refresh the page with an error message using redirectAfterDelayMillisecond(), then return undefined', async () => {
    VerificationAPI.prototype.verify.mockRejectedValue({ response: { status: 500 } });

    verificationForm._verificationInput.value = 'ABCDEF';
    const expectedVerificationData = { unverifiedUserID: 'mockUnverifiedUserID', verificationCode: 'ABCDEF' };

    expect(await verificationForm._verify(mockEvent)).toBeUndefined();
    expect(VerificationAPI.prototype.verify).toHaveBeenCalledWith(mockAPIKey, expectedVerificationData);
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('verification.html?id=mockUnverifiedUserID&keepMeSignedIn=');
  });
});

describe('_validateCode()', () => {
  let inputFormGroup;

  beforeEach(() => {
    inputFormGroup = verificationForm._verificationInput.parentElement;
  });

  afterEach(() => {
    inputFormGroup = null;
  });
  
  it('should transform the value of _verificationInput to uppercase, then validate it. If the length is not equal to 6, it should call ErrorSpan.prototype.display() and return false', () => {
    verificationForm._verificationInput.value = 'ABCD';

    expect(verificationForm._validateCode()).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(inputFormGroup, 'Verification code must be 6 characters long.');
  });
  
  it('should transform the value of _verificationInput to uppercase, then validate it. If the code contains whitespace, it should call ErrorSpan.prototype.display() and return false', () => {
    verificationForm._verificationInput.value = 'ABC DE';

    expect(verificationForm._validateCode()).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(inputFormGroup, 'Verification code can not contain any whitespace.');
  });

  it('should transform the value of _verificationInput to uppercase, then validate it. If the code contains any character apart from letters and numbers, it should call ErrorSpan.prototype.display() and return false', () => {
    verificationForm._verificationInput.value = 'AB-CD@';

    expect(verificationForm._validateCode()).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(inputFormGroup, 'Verification code can only contain uppercase letters and numbers. Special characters are not possible.');
  });
});

describe('_handleResendEmailBtnKeyEvents(e)', () => {
  it('should, if Enter is pressed, call _resendVerificationEmail() and return undefined', () => {
    const mockEvent = { key: 'Enter' };
    const _resendVerificationEmailSpy = jest.spyOn(verificationForm, '_resendVerificationEmail').mockImplementationOnce(() => {});
    
    expect(verificationForm._handleResendEmailBtnKeyEvents(mockEvent)).toBeUndefined();
    expect(_resendVerificationEmailSpy).toHaveBeenCalled();
  });
  
  it('should, if the pressed key is not Enter, not call _resendVerificationEmail() but still return undefined', () => {
    const mockEvent = { key: 'G' };
    const _resendVerificationEmailSpy = jest.spyOn(verificationForm, '_resendVerificationEmail').mockImplementationOnce(() => {});
    
    expect(verificationForm._handleResendEmailBtnKeyEvents(mockEvent)).toBeUndefined();
    expect(_resendVerificationEmailSpy).not.toHaveBeenCalled();
  });
});

describe('_resendVerificationEmail()', () => {
  it('should grab the unverifiedUSerID from the URL and call VerificationAPI.prototype.resendVerificationEmail(). If the request is successful, it should call messagePopup() and return undefined', async () => {
    VerificationAPI.prototype.resendVerificationEmail.mockResolvedValueOnce({ message: 'mockMessage' });

    expect(await verificationForm._resendVerificationEmail()).toBeUndefined();
    expect(VerificationAPI.prototype.resendVerificationEmail).toHaveBeenCalledWith(mockAPIKey, { unverifiedUserID: 'mockUnverifiedUserID' });
    expect(messagePopup).toHaveBeenCalledWith('Verification email resent.', 'success');
  });

  it('should grab the unverifiedUSerID from the URL and call VerificationAPI.prototype.resendVerificationEmail(). If the request fails without a response object, it should not be console-logged', async () => {
    VerificationAPI.prototype.resendVerificationEmail.mockRejectedValueOnce({});
    const consoleSpy = jest.spyOn(window.console, 'log');

    expect(await verificationForm._resendVerificationEmail()).toBeUndefined();
    expect(VerificationAPI.prototype.resendVerificationEmail).toHaveBeenCalledWith(mockAPIKey, { unverifiedUserID: 'mockUnverifiedUserID' });
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('should grab the unverifiedUSerID from the URL and call VerificationAPI.prototype.resendVerificationEmail(). If the request fails with a response object, it should be console-logged', async () => {
    VerificationAPI.prototype.resendVerificationEmail.mockRejectedValueOnce({ response: { data: 'mockData' } });
    const consoleSpy = jest.spyOn(window.console, 'log');

    expect(await verificationForm._resendVerificationEmail()).toBeUndefined();
    expect(VerificationAPI.prototype.resendVerificationEmail).toHaveBeenCalledWith(mockAPIKey, { unverifiedUserID: 'mockUnverifiedUserID' });
    expect(consoleSpy).toHaveBeenCalledWith('mockData');
  });

  it('should grab the unverifiedUSerID from the URL and call VerificationAPI.prototype.resendVerificationEmail(). If the request fails without a response object, the page should be reloaded using redirectAfterDelayMillisecond()', async () => {
    VerificationAPI.prototype.resendVerificationEmail.mockRejectedValueOnce({});

    expect(await verificationForm._resendVerificationEmail()).toBeUndefined();
    expect(VerificationAPI.prototype.resendVerificationEmail).toHaveBeenCalledWith(mockAPIKey, { unverifiedUserID: 'mockUnverifiedUserID' });
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('verification.html?id=mockUnverifiedUserID&keepMeSignedIn=');
  });

  it('should grab the unverifiedUSerID from the URL and call VerificationAPI.prototype.resendVerificationEmail(). If the request fails with a status code of 404, it should call messagePopup() and return undefined', async () => {
    VerificationAPI.prototype.resendVerificationEmail.mockRejectedValueOnce({ response: { status: 404 } });

    expect(await verificationForm._resendVerificationEmail()).toBeUndefined();
    expect(VerificationAPI.prototype.resendVerificationEmail).toHaveBeenCalledWith(mockAPIKey, { unverifiedUserID: 'mockUnverifiedUserID' });
    expect(messagePopup).toHaveBeenCalledWith('Account does not exist or has already been validated.', 'danger', 3000);
  });

  it('should grab the unverifiedUSerID from the URL and call VerificationAPI.prototype.resendVerificationEmail(). If the request fails with a status code of 403, it should call messagePopup() and return undefined', async () => {
    VerificationAPI.prototype.resendVerificationEmail.mockRejectedValueOnce({ response: { status: 403 } });

    expect(await verificationForm._resendVerificationEmail()).toBeUndefined();
    expect(VerificationAPI.prototype.resendVerificationEmail).toHaveBeenCalledWith(mockAPIKey, { unverifiedUserID: 'mockUnverifiedUserID' });
    expect(messagePopup).toHaveBeenCalledWith('Email resend limit exceeded.', 'danger', 3000);
  });

  it('should grab the unverifiedUSerID from the URL and call VerificationAPI.prototype.resendVerificationEmail(). If the request fails with a status a different status code (most likely 500), the page should be reloaded using redirectAfterDelayMillisecond()', async () => {
    VerificationAPI.prototype.resendVerificationEmail.mockRejectedValueOnce({ response: { status: 500 } });

    expect(await verificationForm._resendVerificationEmail()).toBeUndefined();
    expect(VerificationAPI.prototype.resendVerificationEmail).toHaveBeenCalledWith(mockAPIKey, { unverifiedUserID: 'mockUnverifiedUserID' });
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('verification.html?id=mockUnverifiedUserID&keepMeSignedIn=');
  });
});
