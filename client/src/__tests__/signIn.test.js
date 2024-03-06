import SignIn from "../js/signIn";

import SignInAPI from "../js/components/services/SignInAPI";
import Cookies from "../js/components/global/Cookies";
import RevealPassword from "../js/components/signing/RevealPassword";
import LinksContainer from "../js/components/signing/LinksContainer";
import LoadingModal from "../js/components/global/LoadingModal";
import locateLoginToken from "../js/components/global/locateLoginToken";
import redirectAfterDelayMillisecond from "../js/components/global/redirectAfterDelayMillisecond";
import ErrorSpan from "../js/components/global/ErrorSpan";
import FormCheckbox from "../js/components/global/FormCheckbox";

jest.mock('../js/components/services/SignInAPI');
jest.mock('../js/components/global/Cookies');
jest.mock('../js/components/signing/RevealPassword');
jest.mock('../js/components/signing/LinksContainer');
jest.mock('../js/components/global/LoadingModal');
jest.mock('../js/components/global/locateLoginToken');
jest.mock('../js/components/global/redirectAfterDelayMillisecond');
jest.mock('../js/components/global/ErrorSpan');
jest.mock('../js/components/global/FormCheckbox');

const signInHTML = `
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

let signIn;

beforeEach(() => {
  document.body.innerHTML = signInHTML;
  signIn = new SignIn();
});

afterEach(() => {
  document.body.innerHTML = '';
  signIn = null;
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
    signIn.usernameInput = ''; // ensuring an input is empty to force an early return for this test
    const preventDefaultSpy = jest.spyOn(mockEvent, 'preventDefault');
    
    await signIn._signIn(mockEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(LoadingModal.display).toHaveBeenCalled();
  });
  
});
