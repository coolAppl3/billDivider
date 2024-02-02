// Mocking an existing 
document.body.innerHTML = `
//   <nav class="main-nav bg-secondary">
//     <div class="container">
//       <div class="main-nav-container">
//         <!-- SVG -->
//         <svg
//           width="24px"
//           height="24px"
//           viewBox="0 0 24 24"
//           id="Layer_1"
//           data-name="Layer 1"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <defs>
//             <style>
//               .cls-1 {
//                 fill: none;
//                 stroke: #8685ef;
//                 stroke-miterlimit: 10;
//                 stroke-width: 1.91px;
//               }
//             </style>
//           </defs>
//           <polyline
//             class="cls-1"
//             points="20.59 12.26 20.59 6.27 15.82 1.5 3.41 1.5 3.41 11.74"
//           />
//           <polygon
//             class="cls-1"
//             points="20.59 6.27 20.59 7.23 14.86 7.23 14.86 1.5 15.82 1.5 20.59 6.27"
//           />
//           <line
//             class="cls-1"
//             x1="0.55"
//             y1="12"
//             x2="23.45"
//             y2="12"
//           />
//           <polyline
//             class="cls-1"
//             points="20.59 14.86 20.59 22.5 3.41 22.5 3.41 14.86"
//           />
//         </svg>

//         <h1 class="logo">
//           Bill Divider
//           <a href="index.html"></a>
//         </h1>

//         <div class="links-container" style="display:flex">
//           <div class="btn-div">
//             <a
//               href="signIn.html"
//               class="btn btn-border-light"
//               id="sign-in-btn"
//               >Sign in</a
//             >
//           </div>

//           <div class="btn-div">
//             <a
//               href="signUp.html"
//               class="btn btn-cta"
//               id="sign-up-btn"
//               >Sign up</a
//             >
//           </div>
//         </div>

//         <div
//           id="user-menu-btn"
//           class="hidden"
//           style="display:none"
//         >
//           <i class="fa-regular fa-user"></i>

//           <ul class="user-menu-options hidden">
//             <li><a href="history.html">History</a></li>
//             <li><a href="index.html">Log out</a></li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   </nav>
// `;

import Navbar from "../../../js/components/global/Navbar";

import ConfirmModal from "../../../js/components/global/ConfirmModal";
import LoadingModal from "../../../js/components/global/LoadingModal";
import Cookies from "../../../js/components/global/Cookies";
import redirectAfterDelayMillisecond from "../../../js/components/global/redirectAfterDelayMillisecond";

jest.mock('../../../js/components/global/ConfirmModal');
jest.mock('../../../js/components/global/LoadingModal');
jest.mock('../../../js/components/global/Cookies');
jest.mock('../../../js/components/global/redirectAfterDelayMillisecond');


let navbar;

beforeEach(() => {
  navbar = new Navbar();
});

describe('_displayUserMenuBtn()', () => {
  it('should be a function', () => {
    expect(typeof navbar._displayUserMenuBtn).toEqual('function');
  });
  
  it('should always return undefined', () => {
    expect(navbar._displayUserMenuBtn()).toBeUndefined();
    expect(navbar._displayUserMenuBtn(0)).toBeUndefined();
    expect(navbar._displayUserMenuBtn({})).toBeUndefined();
    expect(navbar._displayUserMenuBtn('')).toBeUndefined();
  });
});

describe('_displayUserMenu()', () => {
  it('should be a function', () => {
    expect(typeof navbar._displayUserMenu).toEqual('function');
  });
  
  it('should always return undefined', () => {
    expect(navbar._displayUserMenu()).toBeUndefined();
    expect(navbar._displayUserMenu(0)).toBeUndefined();
    expect(navbar._displayUserMenu({})).toBeUndefined();
    expect(navbar._displayUserMenu('')).toBeUndefined();
  });

  it('should remove the hidden class from userMenuOptions if the element has it', () => {
    navbar._displayUserMenu();
    expect(navbar._userMenuOptions.classList.contains('hidden')).toBeFalsy();
  });

  it('should add the hidden class from userMenuOptions if the element does not have it', () => {
    navbar._displayUserMenu();
    expect(navbar._userMenuOptions.classList.contains('hidden')).toBeTruthy();
  });
});

describe('_logout(e)', () => {
  // Appending a confirmModal element before every test because the method always adds an event listener to it.
  let confirmModal = document.createElement('div');
  confirmModal.className = 'confirm-modal';

  beforeEach(() => {
    document.body.appendChild(confirmModal);
  });

  afterEach(() => {
    confirmModal.remove();
  });
  
  it('should be a function', () => {
    expect(typeof navbar._logout).toEqual('function');
  });
  
  it('should always return undefined', () => {
    const mockEvent = { preventDefault: jest.fn() };
    expect(navbar._logout(mockEvent)).toBeUndefined();
  });

  it(`should always call confirmModal.display with "Are you sure you want to log out?"`, () => {
    const mockEvent = { preventDefault: jest.fn() };
    navbar._logout(mockEvent);
    expect(ConfirmModal.mock.instances[0].display).toHaveBeenCalledWith('Are you sure you want to log out?');
  });
});
