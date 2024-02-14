import FormCheckbox from "../../../js/components/global/FormCheckbox";

const mockCheckBox = document.createElement('div');
mockCheckBox.id = 'mockID';
document.body.appendChild(mockCheckBox);

const formCheckBox = new FormCheckbox('mockID');
afterEach(() => {
  mockCheckBox.className = '';
});

describe('_handleKeyEvents(e)', () => {
  it('should return undefined and stop the function if e.key is not equal to Enter', () => {
    mockCheckBox.className = 'checked';
    const mockEvent = { key: 'someOtherKey' };
    
    formCheckBox._handleKeyEvents(mockEvent);
    expect(mockCheckBox.className).toEqual('checked'); // class not removed
  });

  it('should always return undefined if a valid event is passed in', () => {
    // Function can only be called by the attached event listener, so there's no point in adding falsy values
    const mockEvent1 = { key: 'Shift' };
    const mockEvent2 = { key: 'G' };
    const mockEvent3 = { key: undefined };

    expect(formCheckBox._handleKeyEvents(mockEvent1)).toBeUndefined();
    expect(formCheckBox._handleKeyEvents(mockEvent2)).toBeUndefined();
    expect(formCheckBox._handleKeyEvents(mockEvent3)).toBeUndefined();
  });
});

describe('_revealCheck()', () => {
  it('should always return undefined', () => {
    expect(formCheckBox._revealCheck()).toBeUndefined();
    expect(formCheckBox._revealCheck(null)).toBeUndefined();
    expect(formCheckBox._revealCheck(0)).toBeUndefined();
    expect(formCheckBox._revealCheck('')).toBeUndefined();
    expect(formCheckBox._revealCheck({})).toBeUndefined();
    expect(formCheckBox._revealCheck([])).toBeUndefined();
    expect(formCheckBox._revealCheck('some value')).toBeUndefined();
    expect(formCheckBox._revealCheck(5)).toBeUndefined();
  });
  
  it(`it should remove the "checked" class from the checkbox if it has one`, () => {
    mockCheckBox.className = 'checked';
    formCheckBox._revealCheck();

    expect(mockCheckBox.className).toEqual('');
  });
  
  it(`it should add the "checked" class from the checkbox if does not have one`, () => {
    mockCheckBox.className = '';
    formCheckBox._revealCheck();

    expect(mockCheckBox.className).toEqual('checked');
  });
});

