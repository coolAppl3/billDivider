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
              id="linksContainerFirstBtn"
              >Sign in</a
            >
          </div>

          <div class="btn-div">
            <a
              href="signUp.html"
              class="btn btn-light"
              id="linksContainerSecondBtn"
              >Sign up</a
            >
          </div>
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

  jest.resetAllMocks();
});

describe('_updateLinksContainer', () => {
  it('should return undefined and stop the function if there is no loginToken', () => {
    locateLoginToken.mockImplementationOnce(() => { return false; });

    expect(navbar._updateLinksContainer()).toBeUndefined();
    expect(locateLoginToken).toHaveBeenCalled();
  });
  
  it('should, if a loginToken is found, update the sign in and sign up buttons and turn them into sign out and history buttons, then return undefined', () => {
    locateLoginToken.mockImplementationOnce(() => { return 'mockLoginToken'; });
    expect(navbar._updateLinksContainer()).toBeUndefined();

    expect(navbar._linksContainerFirstBtn.textContent).toBe('Sign out');
    expect(navbar._linksContainerFirstBtn.href).toBe('http://localhost/#');
    expect(navbar._linksContainerFirstBtn.classList.contains('signOut')).toBe(true);

    expect(navbar._linksContainerSecondBtn.textContent).toBe('History');
    expect(navbar._linksContainerSecondBtn.href).toBe('http://localhost/history.html');
    expect(navbar._linksContainerSecondBtn.className).toBe('btn btn-light');
  });
  
});


describe('_handleLinksContainerEvents(e)', () => {
  beforeEach(() => {
    delete window.location;
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href: 'index.html',
      },
    });
  });
  
  it(`should, if the event object target does not contain a class of "signOut", set window.location.href to e.target.href, then return undefined`, () => {
    const mockEvent = {
      preventDefault: () => {},
      target: {
        href: 'mockHref',
        classList: {
          contains: () => { return false; },
        },
      },
    };

    expect(navbar._handleLinksContainerEvents(mockEvent)).toBeUndefined();
    expect(window.location.href).toBe('mockHref');
  });

  it(`should, if the event object target contains a class of "signOut", call _signOut(), then return undefined`, () => {
    const mockEvent = {
      preventDefault: () => {},
      target: {
        href: 'mockHref',
        classList: {
          contains: () => { return true; },
        },
      },
    };

    const _signOutSpy = jest.spyOn(navbar, '_signOut').mockImplementationOnce(() => {});
    
    expect(navbar._handleLinksContainerEvents(mockEvent)).toBeUndefined();
    expect(window.location.href).toBe('index.html');
    expect(_signOutSpy).toHaveBeenCalled();
  });
});

describe('_signOut()', () => {
  let mockConfirmModalElement;

  beforeEach(() => {
    mockConfirmModalElement = document.createElement('div');
    mockConfirmModalElement.className = 'confirm-modal';
    document.body.appendChild(mockConfirmModalElement);
  });

  afterEach(() => {
    mockConfirmModalElement.remove();
    mockConfirmModalElement = null;
  });

  it('should call ConfirmModal.prototype.display(), append an event listener to the confirm modal element, then return undefined', () => {

    expect(navbar._signOut()).toBeUndefined();
    expect(ConfirmModal.prototype.display).toHaveBeenCalledWith('Are you sure you want to sign out?');
  });

  it(`should, after appending an event listener to the confirm modal element, and assuming an "exit click" is made, call ConfirmModal.prototype.remove() and stop the function`, () => {
    const mockEvent = new MouseEvent('click');
    ConfirmModal.prototype.isExitClick.mockImplementationOnce(() => { return true; });
    
    navbar._signOut();
    mockConfirmModalElement.dispatchEvent(mockEvent);
    
    expect(ConfirmModal.prototype.isExitClick).toHaveBeenCalledWith(mockEvent);
    expect(ConfirmModal.prototype.remove).toHaveBeenCalled();
  });
  
  it(`should, after appending an event listener to the confirm modal element, and assuming the user clicks the confirmModalConfirmBtn, call ConfirmModal.prototype.remove(), LoadingModal.display(), Cookies.prototype.remove('loginToken), and redirectAfterDelayMilliseconds()`, () => {
    const mockEvent = new MouseEvent('click');
    Object.defineProperty(mockEvent, 'target', {
      writable: false,
      value: {
        id: 'confirmModalConfirmBtn',
      },
    });
    
    ConfirmModal.prototype.isExitClick.mockImplementationOnce(() => { return false; });
    Cookies.prototype.remove.mockImplementationOnce(() => {});
    
    navbar._signOut();
    mockConfirmModalElement.dispatchEvent(mockEvent);
    
    expect(ConfirmModal.prototype.isExitClick).toHaveBeenCalledWith(mockEvent);
    expect(ConfirmModal.prototype.remove).toHaveBeenCalled();
    expect(LoadingModal.display).toHaveBeenCalled();
    expect(Cookies.prototype.remove).toHaveBeenCalledWith('loginToken');
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('index.html', 1000, 'Signed out successfully', 'success');
  });
});