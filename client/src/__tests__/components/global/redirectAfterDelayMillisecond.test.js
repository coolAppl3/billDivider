import redirectAfterDelayMillisecond from "../../../js/components/global/redirectAfterDelayMillisecond";
import messagePopup from "../../../js/components/global/messagePopup";

jest.mock('../../../js/components/global/messagePopup');

beforeEach(() => {
  // Mocking the window.location.href property
  delete window.location
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      href: 'somePage.html'
    }
  });
});

afterEach(() => {
  jest.resetAllMocks();
  jest.now();
});

describe(`redirectAfterDelayMillisecond(
  target,
  delay = 1000,
  message = 'Something went wrong.',
  popupColor = 'danger'
)`, () => {

  it('should always return undefined', () => {
    expect(redirectAfterDelayMillisecond()).toBeUndefined();
    expect(redirectAfterDelayMillisecond(null)).toBeUndefined();
    expect(redirectAfterDelayMillisecond(0)).toBeUndefined();
    expect(redirectAfterDelayMillisecond('')).toBeUndefined();
    expect(redirectAfterDelayMillisecond({})).toBeUndefined();
    expect(redirectAfterDelayMillisecond([])).toBeUndefined();
    expect(redirectAfterDelayMillisecond('index.html')).toBeUndefined();
    expect(redirectAfterDelayMillisecond('index.html', 1000, 'some message', 'danger')).toBeUndefined();
  });

  describe('tests focused on the target argument', () => {
    it(`should call messagePopup('Something went wrong', 'danger') and redirect the user to index.html if the target argument is falsy`, () => {
      jest.useFakeTimers();
      redirectAfterDelayMillisecond();
      jest.advanceTimersByTime(1000);
  
      expect(messagePopup).toHaveBeenCalledWith('Something went wrong.', 'danger', 1000);
      expect(window.location.href).toBe('index.html');
    });
  
    it(`should call messagePopup('Something went wrong', 'danger') and redirect the user to index.html if the target argument is not a type of string`, () => {
      jest.useFakeTimers();
      redirectAfterDelayMillisecond(0);
      jest.advanceTimersByTime(1000);
  
      expect(messagePopup).toHaveBeenCalledWith('Something went wrong.', 'danger', 1000);
      expect(window.location.href).toBe('index.html');
    });
  
    it(`should call messagePopup('Something went wrong', 'danger') and redirect the user to index.html if the target argument does not end with ".html"`, () => {
      jest.useFakeTimers();
      redirectAfterDelayMillisecond('someString');
      jest.advanceTimersByTime(1000);
  
      expect(messagePopup).toHaveBeenCalledWith('Something went wrong.', 'danger', 1000);
      expect(window.location.href).toBe('index.html');
    });
  
    it(`should call messagePopup('Something went wrong', 'danger') and redirect the user to index.html if the target argument contains a space`, () => {
      jest.useFakeTimers();
      redirectAfterDelayMillisecond('somePage .html');
      jest.advanceTimersByTime(1000);
  
      expect(messagePopup).toHaveBeenCalledWith('Something went wrong.', 'danger', 1000);
      expect(window.location.href).toBe('index.html');
    });
  
    it(`should call messagePopup with the default pre-set values, and redirect the user accordingly, if only a valid target argument is passed in`, () => {
      jest.useFakeTimers();
      redirectAfterDelayMillisecond('redirect.html');
      jest.advanceTimersByTime(1000);
  
      expect(messagePopup).toHaveBeenCalledWith('Something went wrong.', 'danger', 1000);
      expect(window.location.href).toBe('redirect.html');
    });
    
    it(`should call messagePopup with the passed in arguments, and redirect the user accordingly, if the target argument is valid`, () => {
      jest.useFakeTimers();
      redirectAfterDelayMillisecond('redirect.html', 1000, 'Some message.', 'cta');
      jest.advanceTimersByTime(1000);
  
      expect(messagePopup).toHaveBeenCalledWith('Some message.', 'cta', 1000);
      expect(window.location.href).toBe('redirect.html');
    });
  })
  
  describe('tests focused on the delay argument', () => {
    it(`should reassign the delay argument to 1000 and continue normally, if the delay passed in is equal 0`, () => {
      jest.useFakeTimers();
  
      redirectAfterDelayMillisecond('redirect.html', 0);
      expect(window.location.href).not.toBe('redirect.html');
  
      jest.advanceTimersByTime(500);
      expect(window.location.href).not.toBe('redirect.html');
  
      jest.advanceTimersByTime(500); // marks 1000 milliseconds since the function was called
      expect(messagePopup).toHaveBeenCalledWith('Something went wrong.', 'danger', 1000);
      expect(window.location.href).toBe('redirect.html');
    });
  
    it(`should reassign the delay argument to 1000 and continue normally, if the delay passed in is less than 0`, () => {
      jest.useFakeTimers();
  
      redirectAfterDelayMillisecond('redirect.html', -500);
      expect(window.location.href).not.toBe('redirect.html');
  
      jest.advanceTimersByTime(500);
      expect(window.location.href).not.toBe('redirect.html');
  
      jest.advanceTimersByTime(500); // marks 1000 milliseconds since the function was called
      expect(messagePopup).toHaveBeenCalledWith('Something went wrong.', 'danger', 1000);
      expect(window.location.href).toBe('redirect.html');
    });
  
    it(`should reassign the delay argument to 1000 and continue normally, if the delay passed in is not a type of number`, () => {
      jest.useFakeTimers();
  
      redirectAfterDelayMillisecond('redirect.html', '500');
      expect(window.location.href).not.toBe('redirect.html');
  
      jest.advanceTimersByTime(500);
      expect(window.location.href).not.toBe('redirect.html');
  
      jest.advanceTimersByTime(500); // marks 1000 milliseconds since the function was called
      expect(messagePopup).toHaveBeenCalledWith('Something went wrong.', 'danger', 1000);
      expect(window.location.href).toBe('redirect.html');
    });
    
  })
  
  it(`should remove the "unsavedSessionChanges" item from sessionStorage if one exists, and continue normally`, () => {
    sessionStorage.setItem('unsavedSessionChanges', true);

    jest.useFakeTimers();
    redirectAfterDelayMillisecond('redirect.html');
    jest.advanceTimersByTime(1000);

    expect(sessionStorage.getItem('unsavedSessionChanges')).toBeNull();
    expect(messagePopup).toHaveBeenCalledWith('Something went wrong.', 'danger', 1000);
    expect(window.location.href).toBe('redirect.html');
  });
});
