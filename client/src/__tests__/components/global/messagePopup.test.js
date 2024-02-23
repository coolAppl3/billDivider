import messagePopup from "../../../js/components/global/messagePopup";

beforeEach(() => {
  document.body.innerHTML = '';
});

describe(`messagePopup(message, type = 'cta')`, () => {
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
    jest.advanceTimersByTime(2200); // mocking the delay before the element is removed from the DOM

    const messagePopupElement = document.querySelector('.popup');
    expect(messagePopupElement).toBeNull();
    jest.now();
  });
  
});
