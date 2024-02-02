import FormCheckbox from "../../../js/components/global/FormCheckbox";

const mockCheckBox = document.createElement('div');
mockCheckBox.id = 'mockID';
document.body.appendChild(mockCheckBox);

const formCheckBox = new FormCheckbox('mockID');

afterEach(() => {
  mockCheckBox.className = '';
});

describe('_handleKeyEvents(e)', () => {
  it('should be a function', () => {
    expect(typeof formCheckBox._handleKeyEvents).toEqual('function');
  });

  it('should return undefined and stop the function if e.key is not equal to Enter', () => {
    mockCheckBox.className = 'checked';
    const mockEvent = { key: 'someOtherKey' };
    
    formCheckBox._handleKeyEvents(mockEvent);
    expect(mockCheckBox.className).toEqual('checked'); // class not removed
  });

  it('should always return undefined', () => {
    // Function can only be called by the attached event listener, so there's no point in adding falsy values
    const mockEvent1 = { key: 'Shift' };
    const mockEvent2 = { key: 'G' };
    const mockEvent3 = { key: undefined };

    expect(formCheckBox._handleKeyEvents(mockEvent1)).toBeUndefined();
    expect(formCheckBox._handleKeyEvents(mockEvent2)).toBeUndefined();
    expect(formCheckBox._handleKeyEvents(mockEvent3)).toBeUndefined();
  });
});

describe('_reveal()', () => {
  it('should be a function', () => {
    expect(typeof formCheckBox._reveal).toEqual('function');
  });

  it('should always return undefined', () => {
    expect(formCheckBox._reveal()).toBeUndefined();
    expect(formCheckBox._reveal({})).toBeUndefined();
    expect(formCheckBox._reveal('')).toBeUndefined();
    expect(formCheckBox._reveal(0)).toBeUndefined();
  });
  
  it(`it should remove the "checked" class from the checkbox if it has one`, () => {
    mockCheckBox.className = 'checked';
    formCheckBox._reveal();

    expect(mockCheckBox.className).toEqual('');
  });
  
  it(`it should add the "checked" class from the checkbox if does not have one`, () => {
    mockCheckBox.className = '';
    formCheckBox._reveal();

    expect(mockCheckBox.className).toEqual('checked');
  });
});

