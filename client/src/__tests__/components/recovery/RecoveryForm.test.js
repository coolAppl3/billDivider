import RecoveryForm from "../../../js/components/recovery/RecoveryForm";

import RecoveryAPI from "../../../js/components/services/RecoveryAPI";
import LinksContainer from "../../../js/components/signing/LinksContainer";
import ErrorSpan from "../../../js/components/global/ErrorSpan";
import redirectAfterDelayMillisecond from "../../../js/components/global/redirectAfterDelayMillisecond";
import LoadingModal from "../../../js/components/global/LoadingModal";


jest.mock('../../../js/components/services/RecoveryAPI');
jest.mock('../../../js/components/signing/LinksContainer');
jest.mock('../../../js/components/global/ErrorSpan');
jest.mock('../../../js/components/global/redirectAfterDelayMillisecond');
jest.mock('../../../js/components/global/LoadingModal');

const recoveryFormHTML = `
<section class="recovery">
  <div class="container">
    <form class="recovery-container">
      <h3 class="content-t">Account recovery</h3>

      <div class="h-line"></div>

      <p
        class="content-p"
        id="recoveryDescription"
      >
        Please enter the email address linked to your account below.
      </p>

      <div class="form-group">
        <label for="recoveryInput">Email address</label>
        <input
          type="text"
          id="recoveryInput"
          autocomplete="email"
          autocapitalize="off"
        />
        <span class="error-span"></span>
      </div>

      <button
        type="submit"
        class="btn btn-cta"
        id="recoveryBtn"
      >
        Send recovery email
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

let recoveryForm;

beforeEach(() => {
  document.body.innerHTML = recoveryFormHTML;
  recoveryForm = new RecoveryForm();
});

afterEach(() => {
  document.body.innerHTML = '';
  recoveryForm = null;
  jest.resetAllMocks();
});

describe('_sendRecoveryCode(e)', () => {
  let mockEvent;

  beforeEach(() => {
    mockEvent = { preventDefault: () => {} };
  });

  afterEach(() => {
    mockEvent = null;
  });
  
  it('should always call e.preventDefault() and LoadingModal.display()', async () => {
    preventDefaultSpy = jest.spyOn(mockEvent, 'preventDefault');
    
    await recoveryForm._sendRecoveryCode(mockEvent);
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(LoadingModal.display).toHaveBeenCalled();
  });
  
  it('should call _validateRecoveryEmail(), and if an invalid email is provided, call LoadingModal.remove() then return undefined and stop the function', async () => {
    const _validateRecoveryEmailSpy = jest.spyOn(recoveryForm, '_validateRecoveryEmail').mockImplementationOnce(() => {});

    expect(await recoveryForm._sendRecoveryCode(mockEvent)).toBeUndefined();
    expect(_validateRecoveryEmailSpy).toHaveBeenCalled();
    expect(LoadingModal.remove).toHaveBeenCalled();
  });
  
  it('should, if a valid recovery email is provided, call RecoveryAPI.prototype.sendRecoveryEmail(), and if the request is successful, set the value of _recoveryInput to an empty string, call redirectAfterDelayMilliseconds(), and return undefined', async () => {
    recoveryForm._recoveryInput.value = 'validEmail@example.com';
    RecoveryAPI.prototype.sendRecoveryEmail.mockResolvedValueOnce({});

    expect(await recoveryForm._sendRecoveryCode(mockEvent)).toBeUndefined();
    expect(RecoveryAPI.prototype.sendRecoveryEmail).toHaveBeenCalledWith({ recoveryEmail: 'validEmail@example.com' });
    expect(recoveryForm._recoveryInput.value).toBe('');
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('index.html', 5000, `Recovery email sent. Follow its instructions to continue.`, 'success');
  });
  
  it('should, if a valid recovery email is provided, call RecoveryAPI.prototype.sendRecoveryEmail(). If the request fails without a response object, the error is not console-logged', async () => {
    recoveryForm._recoveryInput.value = 'validEmail@example.com';
    RecoveryAPI.prototype.sendRecoveryEmail.mockRejectedValue({});

    const consoleSpy = jest.spyOn(window.console, 'log');

    expect(await recoveryForm._sendRecoveryCode(mockEvent)).toBeUndefined();
    expect(RecoveryAPI.prototype.sendRecoveryEmail).toHaveBeenCalledWith({ recoveryEmail: 'validEmail@example.com' });
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('should, if a valid recovery email is provided, call RecoveryAPI.prototype.sendRecoveryEmail(). If the request fails with a response object, the error should be console-logged', async () => {
    recoveryForm._recoveryInput.value = 'validEmail@example.com';
    RecoveryAPI.prototype.sendRecoveryEmail.mockRejectedValue({ response: { data: 'mockData' } });

    const consoleSpy = jest.spyOn(window.console, 'log');

    expect(await recoveryForm._sendRecoveryCode(mockEvent)).toBeUndefined();
    expect(RecoveryAPI.prototype.sendRecoveryEmail).toHaveBeenCalledWith({ recoveryEmail: 'validEmail@example.com' });
    expect(consoleSpy).toHaveBeenCalledWith('mockData');
  });

  it(`should, if a valid recovery email is provided, call RecoveryAPI.prototype.sendRecoveryEmail(). If the request fails without a response object, it refresh the page by calling redirectAfterDelayMillisecond('recovery.html')`, async () => {
    recoveryForm._recoveryInput.value = 'validEmail@example.com';
    RecoveryAPI.prototype.sendRecoveryEmail.mockRejectedValue({});

    expect(await recoveryForm._sendRecoveryCode(mockEvent)).toBeUndefined();
    expect(RecoveryAPI.prototype.sendRecoveryEmail).toHaveBeenCalledWith({ recoveryEmail: 'validEmail@example.com' });
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('recovery.html');
  });


  it('should, if a valid recovery email is provided, call RecoveryAPI.prototype.sendRecoveryEmail(). If the request fails with a status of 401, it should call ErrorSpan.prototype.display(), LoadingModal.remove(), then return undefined', async () => {
    recoveryForm._recoveryInput.value = 'validEmail@example.com';
    RecoveryAPI.prototype.sendRecoveryEmail.mockRejectedValue({ response: { status: 401 } });
    
    const inputFormGroup = recoveryForm._recoveryInput.parentElement;

    expect(await recoveryForm._sendRecoveryCode(mockEvent)).toBeUndefined();
    expect(RecoveryAPI.prototype.sendRecoveryEmail).toHaveBeenCalledWith({ recoveryEmail: 'validEmail@example.com' });
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(inputFormGroup, 'Invalid email address.');
    expect(LoadingModal.remove).toHaveBeenCalled();
  });

  it('should, if a valid recovery email is provided, call RecoveryAPI.prototype.sendRecoveryEmail(). If the request fails with a status of 404, it should call ErrorSpan.prototype.display(), LoadingModal.remove(), then return undefined', async () => {
    recoveryForm._recoveryInput.value = 'validEmail@example.com';
    RecoveryAPI.prototype.sendRecoveryEmail.mockRejectedValue({ response: { status: 404 } });
    
    const inputFormGroup = recoveryForm._recoveryInput.parentElement;

    expect(await recoveryForm._sendRecoveryCode(mockEvent)).toBeUndefined();
    expect(RecoveryAPI.prototype.sendRecoveryEmail).toHaveBeenCalledWith({ recoveryEmail: 'validEmail@example.com' });
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(inputFormGroup, 'No accounts found with this email address.');
    expect(LoadingModal.remove).toHaveBeenCalled();
  });

  it('should, if a valid recovery email is provided, call RecoveryAPI.prototype.sendRecoveryEmail(). If the request fails with a status of 403, it should call ErrorSpan.prototype.display(), LoadingModal.remove(), then return undefined', async () => {
    recoveryForm._recoveryInput.value = 'validEmail@example.com';
    RecoveryAPI.prototype.sendRecoveryEmail.mockRejectedValue({ response: { status: 403 } });
    
    const inputFormGroup = recoveryForm._recoveryInput.parentElement;

    expect(await recoveryForm._sendRecoveryCode(mockEvent)).toBeUndefined();
    expect(RecoveryAPI.prototype.sendRecoveryEmail).toHaveBeenCalledWith({ recoveryEmail: 'validEmail@example.com' });
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(inputFormGroup, 'Account not verified. Can not recover an unverified account.');
    expect(LoadingModal.remove).toHaveBeenCalled();
  });

  it('should, if a valid recovery email is provided, call RecoveryAPI.prototype.sendRecoveryEmail(). If the request fails with a status of 429, it should call ErrorSpan.prototype.display(), LoadingModal.remove(), then return undefined', async () => {
    recoveryForm._recoveryInput.value = 'validEmail@example.com';
    RecoveryAPI.prototype.sendRecoveryEmail.mockRejectedValue({ response: { status: 429 } });
    
    const inputFormGroup = recoveryForm._recoveryInput.parentElement;

    expect(await recoveryForm._sendRecoveryCode(mockEvent)).toBeUndefined();
    expect(RecoveryAPI.prototype.sendRecoveryEmail).toHaveBeenCalledWith({ recoveryEmail: 'validEmail@example.com' });
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(inputFormGroup, 'A recovery email has already been sent within the last 24 hours. Please try again later.');
    expect(LoadingModal.remove).toHaveBeenCalled();
  });

  it(`should, if a valid recovery email is provided, call RecoveryAPI.prototype.sendRecoveryEmail(). If the request fails with a different status code (most likely 500), it should refresh the page using redirectAfterDelayMillisecond('recovery.html')`, async () => {
    recoveryForm._recoveryInput.value = 'validEmail@example.com';
    RecoveryAPI.prototype.sendRecoveryEmail.mockRejectedValue({ response: { status: 500 } });

    expect(await recoveryForm._sendRecoveryCode(mockEvent)).toBeUndefined();
    expect(RecoveryAPI.prototype.sendRecoveryEmail).toHaveBeenCalledWith({ recoveryEmail: 'validEmail@example.com' });
    expect(redirectAfterDelayMillisecond('recovery.html'));
  });
});

describe('_validateRecoveryEmail(input)', () => {
  let inputFormGroup;

  beforeEach(() => {
    inputFormGroup = recoveryForm._recoveryInput.parentElement;
  });

  afterEach(() => {
    inputFormGroup = null;
  });

  it('should, if the length of the email is above 150 characters, call ErrorSpan.prototype.display() then return false', () => {
    recoveryForm._recoveryInput.value = 'superLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLong@email.com';

    expect(recoveryForm._validateRecoveryEmail(recoveryForm._recoveryInput)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(inputFormGroup, 'Email address can not be longer than 150 characters.');
  });

  it('should, if the email contains any whitespace, call ErrorSpan.prototype.display() then return false', () => {
    recoveryForm._recoveryInput.value = 'white space@example.com';

    expect(recoveryForm._validateRecoveryEmail(recoveryForm._recoveryInput)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(inputFormGroup, 'Email address can not contain any whitespace.');
  });
  
  it('should, if the email does not match the regular expression which mimics regular browser email input validation, call ErrorSpan.prototype.display() then return false', () => {
    recoveryForm._recoveryInput.value = 'example.com';

    expect(recoveryForm._validateRecoveryEmail(recoveryForm._recoveryInput)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(inputFormGroup, 'Invalid email address.');
  });

  it('should, if a valid email is provided, call ErrorSpan.prototype.hide() then return true', () => {
    recoveryForm._recoveryInput.value = 'example@example.com';

    expect(recoveryForm._validateRecoveryEmail(recoveryForm._recoveryInput)).toBe(true);
    expect(ErrorSpan.prototype.hide).toHaveBeenCalledWith(inputFormGroup);
  });
});