import RevealPassword from "../../../js/components/signing/RevealPassword";

const passwordInputFormGroupHTML = `
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
`;
let revealPassword;

beforeEach(() => {
  document.body.innerHTML = passwordInputFormGroupHTML;
  revealPassword = new RevealPassword('password');
});

afterEach(() => {
  document.body.innerHTML = '';
  revealPassword = null;
  jest.resetAllMocks();
});

describe('_handleKeyEvents(e)', () => {
  it('should always return undefined if a valid keyboard event is passed in', () => {
    const mockEvent1 = { key: 'Enter' };
    const mockEvent2 = { key: 'G' };
    const mockEvent3 = { key: ' ' };

    expect(revealPassword._handleKeyEvents(mockEvent1)).toBeUndefined();
    expect(revealPassword._handleKeyEvents(mockEvent2)).toBeUndefined();
    expect(revealPassword._handleKeyEvents(mockEvent3)).toBeUndefined();
  });
  
  it('should not call _reveal() if any other key but Enter is pressed while the element is outlined', () => {
    const spy_Reveal = jest.spyOn(revealPassword, '_reveal').mockImplementation(() => {});
    const mockEvent = { key: 'Shift' };

    revealPassword._handleKeyEvents(mockEvent);
    expect(spy_Reveal).not.toHaveBeenCalled();
  });

  it('should call _reveal() if Enter is pressed while the element is outlined', () => {
    const spy_Reveal = jest.spyOn(revealPassword, '_reveal').mockImplementation(() => {});
    const mockEvent = { key: 'Enter' };

    revealPassword._handleKeyEvents(mockEvent);
    expect(spy_Reveal).toHaveBeenCalled();
  });
});


describe('_reveal()', () => {
  it('should always return undefined', () => {
    expect(revealPassword._reveal()).toBeUndefined();
    expect(revealPassword._reveal(null)).toBeUndefined();
    expect(revealPassword._reveal(0)).toBeUndefined();
    expect(revealPassword._reveal('')).toBeUndefined();
    expect(revealPassword._reveal({})).toBeUndefined();
    expect(revealPassword._reveal([])).toBeUndefined();
    expect(revealPassword._reveal('some value')).toBeUndefined();
    expect(revealPassword._reveal(5)).toBeUndefined();
  });

  it('should change switch the input type between text and password', () => {
    // Input is a type of password by default
    revealPassword._reveal();
    expect(revealPassword._input.getAttribute('type')).toEqual('text');

    // Input is now a type of text
    revealPassword._reveal();
    expect(revealPassword._input.getAttribute('type')).toEqual('password');
  });
});
