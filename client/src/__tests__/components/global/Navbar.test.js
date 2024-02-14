import Navbar from "../../../js/components/global/Navbar";

import ConfirmModal from "../../../js/components/global/ConfirmModal";
import LoadingModal from "../../../js/components/global/LoadingModal";
import Cookies from "../../../js/components/global/Cookies";
import redirectAfterDelayMillisecond from "../../../js/components/global/redirectAfterDelayMillisecond";
import locateLoginToken from "../../../js/components/global/locateLoginToken";

jest.mock('../../../js/components/global/ConfirmModal');
jest.mock('../../../js/components/global/LoadingModal');
jest.mock('../../../js/components/global/Cookies');
jest.mock('../../../js/components/global/redirectAfterDelayMillisecond');
jest.mock('../../../js/components/global/locateLoginToken');

// Mocking an existing navbar
const navbarHTML = `
  <nav class="main-nav bg-secondary">
    <div class="container">
      <div class="main-nav-container">
        <!-- SVG -->
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <style>
              .cls-1 {
                fill: none;
                stroke: #8685ef;
                stroke-miterlimit: 10;
                stroke-width: 1.91px;
              }
            </style>
          </defs>
          <polyline
            class="cls-1"
            points="20.59 12.26 20.59 6.27 15.82 1.5 3.41 1.5 3.41 11.74"
          />
          <polygon
            class="cls-1"
            points="20.59 6.27 20.59 7.23 14.86 7.23 14.86 1.5 15.82 1.5 20.59 6.27"
          />
          <line
            class="cls-1"
            x1="0.55"
            y1="12"
            x2="23.45"
            y2="12"
          />
          <polyline
            class="cls-1"
            points="20.59 14.86 20.59 22.5 3.41 22.5 3.41 14.86"
          />
        </svg>

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
`;

let navbar;

beforeEach(() => {
  document.body.innerHTML = navbarHTML;
  navbar = new Navbar();
});

afterEach(() => {
  document.body.innerHTML = '';
  navbar = null;

  jest.restoreAllMocks();
});

describe('_displayUserMenuBtn()', () => {
  it('should always return undefined', () => {
    expect(navbar._displayUserMenuBtn()).toBeUndefined();
    expect(navbar._displayUserMenuBtn(null)).toBeUndefined();
    expect(navbar._displayUserMenuBtn(0)).toBeUndefined();
    expect(navbar._displayUserMenuBtn('')).toBeUndefined();
    expect(navbar._displayUserMenuBtn({})).toBeUndefined();
    expect(navbar._displayUserMenuBtn([])).toBeUndefined();
    expect(navbar._displayUserMenuBtn('some value')).toBeUndefined();
    expect(navbar._displayUserMenuBtn(5)).toBeUndefined();
  });
  
  it('should keep the _userMenuBtn hidden if there is no loginToken in the browser', () => {
    // Mocking the lack of a loginToken cookie in the browser
    locateLoginToken.mockReturnValueOnce(false);
    
    navbar._displayUserMenuBtn();
    expect(navbar._userMenuBtn.classList.contains('hidden')).toBeTruthy();
  });

  it('should reveal the _userMenuBtn, and hide the _linksContainer if there is a valid loginToken in the browser', () => {
    // Mocking the existence of a loginToken cookie in the browser
    locateLoginToken.mockReturnValueOnce(true);
    
    navbar._displayUserMenuBtn();
    expect(navbar._userMenuBtn.classList.contains('hidden')).toBeFalsy();
    expect(navbar._linksContainer.classList.contains('hidden')).toBeTruthy();
  });
  
});

describe('_displayUserMenu()', () => {
  it('should always return undefined', () => {
    expect(navbar._displayUserMenu()).toBeUndefined();
    expect(navbar._displayUserMenu(null)).toBeUndefined();
    expect(navbar._displayUserMenu(0)).toBeUndefined();
    expect(navbar._displayUserMenu('')).toBeUndefined();
    expect(navbar._displayUserMenu({})).toBeUndefined();
    expect(navbar._displayUserMenu([])).toBeUndefined();
    expect(navbar._displayUserMenu('some value')).toBeUndefined();
    expect(navbar._displayUserMenu(5)).toBeUndefined();
  });
  
  it('should remove the hidden class from _userMenuOptions if the element has it', () => {
    navbar._displayUserMenu();
    expect(navbar._userMenuOptions.classList.contains('hidden')).toBeFalsy();
  });

  it('should add the hidden class from _userMenuOptions if the element does not have it', () => {
    expect(navbar._userMenuOptions.classList.contains('hidden')).toBeTruthy();
  });
});

describe('_logout(e)', () => {
  // Appending a confirmModal element before every test because an event listener is appended to it at some stage, and jest can't mock that behavior

  let confirmModalElement;

  beforeEach(() => {
    confirmModalElement = document.createElement('div');
    confirmModalElement.className = 'confirm-modal';
    document.body.appendChild(confirmModalElement);
  });

  afterEach(() => {
    confirmModalElement.remove();
    confirmModalElement = null;
  });

  it('should always return undefined, as long as an event is passed in', () => {
    const mockEvent = { preventDefault: jest.fn() };
    navbar._logout(mockEvent);
    expect(navbar._logout(mockEvent)).toBeUndefined();
  });

  it(`should always call confirmModal.display with "Are you sure you want to log out?"`, () => {
    const mockEvent = { preventDefault: jest.fn() };
    navbar._logout(mockEvent);
    expect(ConfirmModal.mock.instances[0].display).toHaveBeenCalledWith('Are you sure you want to log out?');
  });

  it(`should always call confirmModal.display with "Are you sure you want to log out?"`, () => {
    navbar._logoutBtn.dispatchEvent(new MouseEvent('click'));
    expect(ConfirmModal.prototype.display).toHaveBeenCalledWith('Are you sure you want to log out?');
  });

  it('should call ConfirmModal.remove() if the user clicks the cancel button, or outside the confirm-modal-container', () => {
    navbar._logoutBtn.dispatchEvent(new MouseEvent('click'));
    
    ConfirmModal.prototype.isExitClick.mockReturnValueOnce(true); // mocking an "exit click"
    confirmModalElement.dispatchEvent(new MouseEvent('click'));

    expect(ConfirmModal.prototype.remove).toHaveBeenCalled();
  });

  it(`should call the following functions if the user clicks the confirm button:

    confirmModal.remove();
    LoadingModal.display();
    cookies.remove('loginToken');
    redirectAfterDelayMillisecond('index.html', 1000, 'Signed out successfully', 'success');
  `, () => {
    navbar._logoutBtn.dispatchEvent(new MouseEvent('click'));
    
    // Mocking the confirm button being pressed in the Confirm Modal
    const confirmMouseClickEvent = new MouseEvent('click');

    // Mocking a target.id value
    Object.defineProperty(confirmMouseClickEvent, 'target', {
      writable: false,
      value: {
        id: 'confirmModalConfirmBtn',
      },
    });
    
    // Dispatching the mock event
    confirmModalElement.dispatchEvent(confirmMouseClickEvent);


    // Functions that should be called:
    expect(ConfirmModal.prototype.remove).toHaveBeenCalled();
    
    // Spying on a static method in Loading Modal
    const LoadingModalSpy = jest.spyOn(LoadingModal, 'display');
    expect(LoadingModalSpy).toHaveBeenCalled();

    expect(Cookies.prototype.remove).toHaveBeenCalled();
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('index.html', 1000, 'Signed out successfully', 'success');
  });
});
