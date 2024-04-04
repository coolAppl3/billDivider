import messagePopup from "../../../js/components/global/messagePopup";

beforeEach(() => {
  document.body.innerHTML = '';
});

describe(`messagePopup(message, type = 'cta', durationMilliseconds)`, () => {
  it('should always return undefined', () => {
    expect(messagePopup()).toBeUndefined();
    expect(messagePopup(null)).toBeUndefined();
    expect(messagePopup(0)).toBeUndefined();
    expect(messagePopup('')).toBeUndefined();
    expect(messagePopup({})).toBeUndefined();
    expect(messagePopup([])).toBeUndefined();
    expect(messagePopup('some value')).toBeUndefined();
    expect(messagePopup('', 'someValue')).toBeUndefined();
  });

  it('should reassign the message argument to an empty string if anything but a string is passed in', () => {
    messagePopup({});
    const messagePopupElement = document.querySelector('.popup');

    expect(messagePopupElement.textContent).toBe('');
  });
  
  it('should create a message popup with the message that is passed in ', () => {
    messagePopup('Some message');
    const messagePopupElement1 = document.querySelector('.popup');

    expect(messagePopupElement1.textContent).toBe('Some message');
  });

  it('should remove any existing message popup and append the latest one', () => {
    messagePopup('Some message');
    messagePopup('Some other message');
    const messagePopupElement = document.querySelector('.popup');

    expect(messagePopupElement.textContent).toBe('Some other message');
  });
  
  it('should remove the message popup after 2.2 seconds', () => {
    jest.useFakeTimers();
    messagePopup('Some message');
    jest.advanceTimersByTime(2200);

    const messagePopupElement = document.querySelector('.popup');
    expect(messagePopupElement).toBeNull();
    jest.now();
  });
  
  it('should remove the message popup after the value of durationMilliseconds plus 200 milliseconds', () => {
    jest.useFakeTimers();
    messagePopup('Some message', 'cta', 3000);
    jest.advanceTimersByTime(2200);

    const messagePopupElement = document.querySelector('.popup');
    expect(messagePopupElement).not.toBeNull();

    jest.advanceTimersByTime(1000);
    expect(messagePopupElement).not.toBeNull();
    
    jest.now();
  });
});
