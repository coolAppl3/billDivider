import Index from "../js/index";

import locateLoginToken from "../js/components/global/locateLoginToken";
import Navbar from "../js/components/global/Navbar";

jest.mock('../js/components/global/locateLoginToken');
jest.mock('../js/components/global/Navbar');

const indexHTML = `
  <!-- Main Navbar -->
  <nav class="main-nav bg-secondary">
    <div class="container">
      <div class="main-nav-container">
        <!-- SVG -->
        <svg></svg>

        <h1 class="logo">
          Bill Divider
          <a
            href="index.html"
            title="Bill Divider"
          ></a>
        </h1>

        <div class="links-container hidden">
          <div class="btn-div">
            <a
              href="signIn.html"
              class="btn btn-border-light"
              id="sign-in-btn"
              >Sign in</a
            >
          </div>

          <div class="btn-div">
            <a
              href="signUp.html"
              class="btn btn-cta"
              id="sign-up-btn"
              >Sign up</a
            >
          </div>
        </div>

        <div
          id="user-menu-btn"
          class="hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="svg-icon"
            tabindex="0"
          >
            <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
            <path
              d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
            />
          </svg>

          <ul class="user-menu-options hidden">
            <li><a href="history.html">History</a></li>
            <li><a href="index.html">Log out</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>

  <section class="hero">
    <div class="container">
      <div class="hero-container">
        <div class="hero-container-content">
          <h2 class="content-t">
            The perfect tool to split multiple bills in one go and with ease.
          </h2>

          <p class="content-p content-90">
            Split those pesky bills hassle-free. Simply start a session, add all
            the bills you want, and let the magic happen! You can also sign up to
            store and view all your previous sessions.
          </p>

          <div class="btn-container">
            <div class="btn-div">
              <a
                href="session.html"
                class="btn btn-cta"
                >Start a session</a
              >
            </div>
            <div class="btn-div">
              <a
                href="signUp.html"
                class="btn btn-light"
                id="hero-sign-up-btn"
                >Sign up</a
              >
            </div>
          </div>
        </div>

        <!-- SVG -->
        <div class="svg-div"></div>
      </div>
    </div>
  </section>
`;

let index;

beforeEach(() => {
  document.body.innerHTML = indexHTML;
  index = new Index();
});

afterEach(() => {
  document.body.innerHTML = '';
  index = null;
  jest.resetAllMocks();
});

describe('_displayHeroButtons()', () => {
  it(`should locateLoginToken(), and if there isn't one, return undefined and stop the function`, () => {
    locateLoginToken.mockImplementationOnce(() => {});
    const btnContainer = document.querySelector('.hero-container-content .btn-container');
    expect(index._displayHeroButtons()).toBeUndefined();
    
    const signUpBtn = btnContainer.lastElementChild.firstElementChild;
    expect(signUpBtn.textContent).toBe(('Sign up'));
  });
  
  it(`should locateLoginToken(), and if one is found, return undefined and stop the function`, () => {
    locateLoginToken.mockImplementationOnce(() => { return 'mockLoginToken'; });
    const btnContainer = document.querySelector('.hero-container-content .btn-container');
    expect(index._displayHeroButtons()).toBeUndefined();
    
    const historyBtn = btnContainer.lastElementChild.lastElementChild;
    expect(historyBtn.textContent).toBe(('History'));
  });
});