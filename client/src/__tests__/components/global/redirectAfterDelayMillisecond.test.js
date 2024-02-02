import redirectAfterDelayMillisecond from "../../../js/components/global/redirectAfterDelayMillisecond";
import messagePopup from "../../../js/components/global/messagePopup";

jest.mock('../../../js/components/global/messagePopup');

beforeEach(() => {
  // Resetting the number of calls to the mock function
  messagePopup.mock.calls.length = 0;

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
  jest.now();
});

describe(`redirectAfterDelayMillisecond(
  target,
  delay = 1000,
  message = 'Something went wrong',
  popupColor = 'danger'
)`, () => {
  
  it('should be a function', () => {
    expect(typeof redirectAfterDelayMillisecond).toEqual('function');
  });
  
  it('should be always return undefined', () => {
    expect(redirectAfterDelayMillisecond()).toBeUndefined();
    expect(redirectAfterDelayMillisecond('index.html')).toBeUndefined();
    expect(redirectAfterDelayMillisecond({})).toBeUndefined();
    expect(redirectAfterDelayMillisecond(0)).toBeUndefined();
  });
  
  it(`should call messagePopup('Something went wrong', 'danger') if the target argument is a falsy or not a type of string`, () => {
    redirectAfterDelayMillisecond(0);

    expect(messagePopup.mock.calls.length).toEqual(1);
    expect(messagePopup.mock.calls).toEqual([['Something went wrong', 'danger']]);
  });

  it('should redirect the user to index.html if the the target argument is falsy', () => {
    jest.useFakeTimers();
    redirectAfterDelayMillisecond(0);
    jest.advanceTimersByTime(1000);

    expect(window.location.href).toEqual('index.html');
  });

  it(`should call messagePopup with the passed in arguments, or the default ones if they're not passed in, if the target argument is not falsy or not a type of string`, () => {
    redirectAfterDelayMillisecond('redirect.html', 1000, 'Some message', 'cta');
    
    expect(messagePopup.mock.calls.length).toEqual(1);
    expect(messagePopup.mock.calls).toEqual([['Some message', 'cta']]);
  });

  it('should redirect the user to the passed in target, as long as it the target argument is a string', () => {
    jest.useFakeTimers();
    redirectAfterDelayMillisecond('redirect.html');
    jest.advanceTimersByTime(1000);

    expect(window.location.href).toEqual('redirect.html');
  });
});
