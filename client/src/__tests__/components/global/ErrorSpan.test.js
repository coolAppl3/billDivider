import ErrorSpan from "../../../js/components/global/ErrorSpan";
const errorSpan = new ErrorSpan();

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('display(formGroup, message)', () => {
  it('should always return undefined', () => {
    expect(errorSpan.display()).toBeUndefined();
    expect(errorSpan.display('')).toBeUndefined();
    expect(errorSpan.display({}, 'some message')).toBeUndefined();
    expect(errorSpan.display(null, 'some message')).toBeUndefined();

    const mockFormGroup = document.createElement('div');
    mockFormGroup.className = 'form-group';
    mockFormGroup.innerHTML = '<label for="sharingWith">Some label</label><input type="text" id="sharingWith" autocomplete="off" autofocus /><span class="error-span"></span>';
    expect(errorSpan.display(mockFormGroup, 'some message')).toBeUndefined();
  });
  
  it('should stop and return undefined if the formGroup passed in is falsy or not an instance of an HTMLElement', () => {
    const someString = 'some value';
    expect(errorSpan.display(someString, 'some error message')).toBeUndefined();
  });

  it(`should add an "error" class to the the form group div`, () => {
    const mockFormGroup = document.createElement('div');
    mockFormGroup.className = 'form-group';
    mockFormGroup.innerHTML = '<label for="sharingWith">Some label</label><input type="text" id="sharingWith" autocomplete="off" autofocus /><span class="error-span"></span>';
    
    errorSpan.display(mockFormGroup, 'some error message');
    expect(mockFormGroup.classList.contains('error')).toBeTruthy();
  });

  it(`should set the textContent of the error span within the form group to the message`, () => {
    const mockFormGroup = document.createElement('div');
    mockFormGroup.className = 'form-group';
    mockFormGroup.innerHTML = '<label for="sharingWith">Some label</label><input type="text" id="sharingWith" autocomplete="off" autofocus /><span class="error-span"></span>';
    
    errorSpan.display(mockFormGroup, 'Some error message.');
    expect(mockFormGroup.lastElementChild.textContent).toBe('Some error message.');
  });
});

describe('hide(formGroup)', () => {
  it('should always return undefined', () => {
    expect(errorSpan.hide()).toBeUndefined();
    expect(errorSpan.hide('')).toBeUndefined();
    expect(errorSpan.hide({})).toBeUndefined();
    expect(errorSpan.hide(null)).toBeUndefined();

    const mockFormGroup = document.createElement('div');
    mockFormGroup.className = 'form-group error';
    mockFormGroup.innerHTML = '<label for="sharingWith">Some label</label><input type="text" id="sharingWith" autocomplete="off" autofocus /><span class="error-span">Some error message</span>';
    expect(errorSpan.hide(mockFormGroup)).toBeUndefined();
  });
  
  it('should stop and return undefined if the formGroup passed in is falsy or not an instance of an HTMLElement', () => {
    const someString = 'some value';
    expect(errorSpan.hide(someString)).toBeUndefined();
  });

  it(`should remove the "error" class from the formGroup element if it exists`, () => {
    const mockFormGroup = document.createElement('div');
    mockFormGroup.className = 'form-group error';
    mockFormGroup.innerHTML = '<label for="sharingWith">Some label</label><input type="text" id="sharingWith" autocomplete="off" autofocus /><span class="error-span">Some error message</span>';

    errorSpan.hide(mockFormGroup);
    expect(mockFormGroup.classList.contains('error')).toBeFalsy();
  });

  it(`should set the error span's textContent to an empty string`, () => {
    const mockFormGroup = document.createElement('div');
    mockFormGroup.className = 'form-group error';
    mockFormGroup.innerHTML = '<label for="sharingWith">Some label</label><input type="text" id="sharingWith" autocomplete="off" autofocus /><span class="error-span">Some error message</span>';

    errorSpan.hide(mockFormGroup);
    expect(mockFormGroup.lastElementChild.textContent).toBe('');
  });
  
});
