import Session from "../js/session";

import Navbar from "../js/components/global/Navbar";
import SessionReference from "../js/components/session/SessionReference";
import InitSession from "../js/components/session/InitSession";
import SessionHeader from "../js/components/session/SessionHeader";
import SessionContent from "../js/components/session/SessionContent";
import BillModal from "../js/components/session/BillModal";
import DisplayTerms from "../js/components/global/DisplayTerms";

jest.mock('../js/components/global/Navbar');
jest.mock('../js/components/session/SessionReference');
jest.mock('../js/components/session/InitSession');
jest.mock('../js/components/session/SessionHeader');
jest.mock('../js/components/session/SessionContent');
jest.mock('../js/components/session/BillModal');


const sessionHTML = `
  <nav class="main-nav bg-secondary">
    <div class="container">
      <div class="main-nav-container">
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

  <div class="nav-push-div"></div>

  <section class="session section-p">
    <div class="container">
      <!-- Session Header -->
      <div class="session-header">
        <div class="session-header-container">
          <div class="session-header-container-item">
            <p class="session-header-container-item-title">Your total</p>
            <p class="session-header-container-item-value">
              <span id="yourTotal">0.00</span>
              <span class="currency">RSD</span>
            </p>
          </div>

          <div class="session-header-container-item">
            <div id="updateSharedWith">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="svg-icon"
              >
                <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                  d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                />
              </svg>
            </div>
            <p class="session-header-container-item-title">
              <span
                id="sharedWith"
                class="sharedWithSpan"
              ></span
              >'s total
            </p>
            <p class="session-header-container-item-value">
              <span id="sharedWithTotal">0.00</span>
              <span class="currency">RSD</span>
            </p>
          </div>

          <div class="session-header-container-item">
            <p
              class="session-header-container-item-title"
              id="debtResult"
            >
              You're owed
            </p>
            <p class="session-header-container-item-value">
              <span id="debtResultValue">0.00</span>
              <span class="currency">RSD</span>
            </p>
          </div>
        </div>

        <div class="session-header-controls">
          <div class="btn-div">
            <button
              class="btn btn-border-light disabled"
              id="resetSessionBtn"
              disabled
            >
              Reset
            </button>
          </div>
          <div class="btn-div">
            <button
              class="btn btn-light disabled"
              id="saveSessionBtn"
              disabled
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <!-- Session Content -->
      <div class="session-content">
        <!-- Person 1 (user) -->
        <div
          class="session-content-container"
          id="content-main"
        >
          <!-- Header -->
          <div
            class="session-content-container-header"
            data-list="main"
          >
            <h3 class="expandList">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                class="svg-icon chevron-icon"
              >
                <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                />
              </svg>
              Your bills
            </h3>
            <button
              class="btn btn-border-danger clearListBtn disabled"
              disabled
            >
              Clear
            </button>
            <button class="btn btn-cta addBillBtn">Add a bill</button>
          </div>

          <div class="h-line"></div>

          <!-- List -->
          <div
            class="session-content-container-list list-main"
            data-list="main"
          ></div>
        </div>

        <!-- --- --- --- -->

        <!-- Person 2 (sharedWith) -->
        <div
          class="session-content-container"
          id="content-secondary"
        >
          <!-- Header -->
          <div
            class="session-content-container-header"
            data-list="secondary"
          >
            <h3 class="expandList">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                class="svg-icon chevron-icon"
              >
                <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                />
              </svg>
              <span
                id="sharedWithListHeader"
                class="sharedWithSpan"
              ></span
              >'s bills
            </h3>
            <button
              class="btn btn-border-danger clearListBtn disabled"
              disabled
            >
              Clear
            </button>
            <button class="btn btn-cta addBillBtn">Add a bill</button>
          </div>

          <div class="h-line"></div>

          <!-- List -->
          <div
            class="session-content-container-list list-secondary"
            data-list="secondary"
          ></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Start Modal -->
  <div class="start-modal">
    <div class="container">
      <form class="start-modal-form">
        <div class="form-group">
          <label for="sharingWith">Sharing bills with</label>
          <input
            type="text"
            id="sharingWith"
            autocomplete="off"
            autofocus
          />
          <span class="error-span"></span>
        </div>

        <div class="form-group">
          <p for="currency">Currency</p>
          <div class="options-container">
            <div
              class="options-container-item selected"
              data-currency="RSD"
            >
              RSD
            </div>
            <div
              class="options-container-item"
              data-currency="EUR"
            >
              EUR
            </div>
            <div
              class="options-container-item"
              data-currency="USD"
            >
              USD
            </div>
          </div>
          <span class="error-span"></span>
        </div>

        <div class="form-group btn-div">
          <button
            type="submit"
            class="btn btn-cta"
            id="startModalStartBtn"
          >
            Start session
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Bill Modal -->
  <div class="bill-modal">
    <div class="container">
      <form class="bill-modal-form">
        <div class="form-group form-group-title">
          <p class="content-p">
            Adding a bill paid by <span id="billOwnerName"></span>
          </p>
        </div>
        <div class="form-group">
          <label for="billName">Bill name</label>
          <input
            type="text"
            id="billName"
          />
          <span class="error-span"></span>
        </div>

        <div class="form-group">
          <label for="billValue">Bill value</label>
          <input
            type="text"
            id="billValue"
          />
          <span class="error-span"></span>
        </div>

        <div class="form-group">
          <label for="unshared">Unshared</label>
          <span class="label-info"
            >Total value of items not being shared</span
          >
          <input
            type="text"
            id="unshared"
            value="0"
          />
          <span class="error-span"></span>
        </div>

        <div class="form-group checkbox-group">
          <div
            class="checkbox"
            id="directlyOwed"
            tabindex="0"
          >
            <span class="check-icon"></span>
          </div>
          <p>To be fully paid by <span id="directlyOwedBy"></span></p>
        </div>

        <div class="form-group">
          <div class="btn-div">
            <button
              type="submit"
              class="btn btn-cta"
              id="billSubmitBtn"
            >
              Add bill
            </button>
          </div>
          <div class="btn-div">
            <div class="btn btn-border-light cancelBtn">Cancel</div>
          </div>
        </div>
      </form>
    </div>
  </div>
`;

let session;

beforeEach(() => {
  document.body.innerHTML = sessionHTML;
  session = new Session();
});

afterEach(() => {
  document.body.innerHTML = '';
  session - null;
  jest.resetAllMocks();
});

describe('_confirmExit(e)', () => {
  beforeEach(() => {
    delete window.sessionStorage;
    Object.defineProperty(window, 'sessionStorage', {
      writable: true,
      value: {
        getItem: () => {},
      },
    });
  });
  
  it(`should check sessionStorage for an "unsavedSessionChanges" item and prase it. If there's no such item, or its value is falsy, the function should stop and return undefined`, () => {
    const sessionStorageSpy = jest.spyOn(window.sessionStorage, 'getItem').mockImplementationOnce(() => { return null; });

    const mockEvent = { preventDefault: () => {}, returnValue: 'mockValue', };
    const preventDefaultSpy = jest.spyOn(mockEvent, 'preventDefault');

    expect(session._confirmExit(mockEvent)).toBeUndefined();
    expect(sessionStorageSpy).toHaveBeenCalledWith('unsavedSessionChanges');

    expect(preventDefaultSpy).not.toHaveBeenCalled();
    expect(mockEvent.returnValue).not.toBe('');
  });

  it(`should check sessionStorage for an "unsavedSessionChanges" item and prase it. If one is found, and its value is truthy, e.preventDefault() should be called, e.returnValue should be set to an empty string, and undefined should be returned`, () => {
    const sessionStorageSpy = jest.spyOn(window.sessionStorage, 'getItem').mockImplementationOnce(() => { return true; });

    const mockEvent = { preventDefault: () => {}, returnValue: 'mockValue', };
    const preventDefaultSpy = jest.spyOn(mockEvent, 'preventDefault');

    expect(session._confirmExit(mockEvent)).toBeUndefined();
    expect(sessionStorageSpy).toHaveBeenCalledWith('unsavedSessionChanges');

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(mockEvent.returnValue).toBe('');
  });
});

describe('_handlePageHideEvents()', () => {
  beforeEach(() => {
    delete window.sessionStorage;
    Object.defineProperty(window, 'sessionStorage', {
      writable: true,
      value: {
        removeItem: () => {},
      },
    });
  });
  
  it(`should call SessionReference.remove(), remove "unsavedSessionChanges" from sessionStorage, and return undefined`, () => {
    const sessionStorageSpy = jest.spyOn(window.sessionStorage, 'removeItem').mockImplementationOnce(() => {});

    expect(session._handlePageHideEvents()).toBeUndefined();
    expect(SessionReference.remove).toHaveBeenCalled();
    expect(sessionStorageSpy).toHaveBeenCalledWith('unsavedSessionChanges');
  });
});
