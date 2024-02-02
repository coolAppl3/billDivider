import ConfirmModal from "../../../js/components/global/ConfirmModal";
const confirmModal = new ConfirmModal();

beforeEach(() => {
  document.body.innerHTML = '';
});

describe(`display(message, btnColor = 'cta')`, () => {
  it('should be a function', () => {
    expect(typeof confirmModal.display).toEqual('function');
  });
  
  it('should always return undefined', () => {
    expect(confirmModal.display()).toBeUndefined();
    expect(confirmModal.display('Some confirmation message')).toBeUndefined();
    expect(confirmModal.display('Some confirmation message', 'some color')).toBeUndefined();
    expect(confirmModal.display({}, 'some color')).toBeUndefined();
  });
  
  it('should check and not create a confirm modal element if one already exists', () => {
    // Mocking a dummy confirm modal in the DOM
    const confirmModalElement = document.createElement('div');
    confirmModalElement.className = 'confirm-modal';
    document.body.appendChild(confirmModalElement);

    confirmModal.display('Some confirmation message');
    const confirmModalList = document.querySelectorAll('.confirm-modal');

    expect(confirmModalList.length).toEqual(1);
  });

  it('should create a confirm modal element if one does not exist and append it to the body', () => {
    confirmModal.display('Some confirmation message');
    const confirmModalElement = document.querySelector('.confirm-modal');
    
    expect(confirmModalElement).not.toBeNull();
    expect(document.body.firstElementChild).toEqual(confirmModalElement);
  });
});

describe('remove()', () => {
  it('should be a function', () => {
    expect(typeof confirmModal.remove).toEqual('function');
  });
  
  it('should always return undefined', () => {
    expect(confirmModal.remove()).toBeUndefined();
    expect(confirmModal.remove(0)).toBeUndefined();
    expect(confirmModal.remove('')).toBeUndefined();
    expect(confirmModal.remove('string')).toBeUndefined();
    expect(confirmModal.remove([])).toBeUndefined();
    expect(confirmModal.remove({})).toBeUndefined();
  });
  
  it('should not do anything if there is no confirm modal in the DOM', () => {
    // Mocking a DOM with some div elements
    const someDiv = document.createElement('div');
    someDiv.className = 'some-class';
    document.body.appendChild(someDiv);

    const someOtherDiv = document.createElement('div');
    someOtherDiv.className = 'some-other-class';
    document.body.appendChild(someOtherDiv);

    confirmModal.remove();
    const divList = document.querySelectorAll('div');

    expect(divList.length).toEqual(2);
  });

  it('should remove the confirm modal if it is in the DOM', () => {
    // Mocking a DOM with a confirm modal
    const someDiv = document.createElement('div');
    someDiv.className = 'some-class';
    document.body.appendChild(someDiv);

    const someOtherDiv = document.createElement('div');
    someOtherDiv.className = 'some-other-class';
    document.body.appendChild(someOtherDiv);

    const confirmModalElement = document.createElement('div');
    confirmModalElement.className = 'confirm-modal';
    document.body.appendChild(confirmModalElement);

    confirmModal.remove();
    const divList = document.querySelectorAll('div');

    expect(divList.length).toEqual(2);
  });
  
});

describe('_create(message, btnColor)', () => {
  it('should be a function', () => {
    expect(typeof confirmModal._create).toEqual('function');
  });
  
  it('should always return an HTML element', () => {
    expect(confirmModal._create() instanceof HTMLElement).toBeTruthy();
    expect(confirmModal._create('Some confirmation message') instanceof HTMLElement).toBeTruthy();
    expect(confirmModal._create('Some confirmation message', 'someColor') instanceof HTMLElement).toBeTruthy();
    expect(confirmModal._create([]) instanceof HTMLElement).toBeTruthy();
    expect(confirmModal._create({}) instanceof HTMLElement).toBeTruthy();
    expect(confirmModal._create(0) instanceof HTMLElement).toBeTruthy();
  });
  
  it('should return a confirm modal element', () => {
    // Mocking the expected confirm modal HTML element
    const expectedConfirmModal = document.createElement('div');
    expectedConfirmModal.className = 'confirm-modal';
    expectedConfirmModal.innerHTML = '<div class="container"><div class="confirm-modal-container"><p>Are you sure you want to continue with this action?</p><div class="btn-container"><button class="btn btn-border-light" id="confirmModalCancelBtn">Cancel</button><button class="btn btn-danger" id="confirmModalConfirmBtn">Confirm</button></div></div></div>';

    expect(confirmModal._create('Are you sure you want to continue with this action?', 'danger')).toEqual(expectedConfirmModal);
  });
});

describe('_createContainer(btnColor)', () => {
  it('should be a function', () => {
    expect(typeof confirmModal._createBtnContainer).toEqual('function');
  });
  
  it('should always return an HTML element', () => {
    expect(confirmModal._createBtnContainer() instanceof HTMLElement).toBeTruthy();
    expect(confirmModal._createBtnContainer('Some confirmation message') instanceof HTMLElement).toBeTruthy();
    expect(confirmModal._createBtnContainer('Some confirmation message', 'someColor') instanceof HTMLElement).toBeTruthy();
    expect(confirmModal._createBtnContainer([]) instanceof HTMLElement).toBeTruthy();
    expect(confirmModal._createBtnContainer({}) instanceof HTMLElement).toBeTruthy();
    expect(confirmModal._createBtnContainer(0) instanceof HTMLElement).toBeTruthy();
  });

  it('should return a button container with the passed in btnColor applied to the confirm button', () => {
    // Mocking the expected button container HTML element
    const expectedBtnContainer = document.createElement('div');
    expectedBtnContainer.className = 'btn-container';
    expectedBtnContainer.innerHTML = '<button class="btn btn-border-light" id="confirmModalCancelBtn">Cancel</button><button class="btn btn-danger" id="confirmModalConfirmBtn">Confirm</button>';
    
    // Mocking a btnContainer element and selecting the confirm button to check for the color used
    document.body.appendChild(confirmModal._createBtnContainer('danger'));
    const confirmModalConfirmBtn = document.querySelector('#confirmModalConfirmBtn');
    
    expect(confirmModal._createBtnContainer('danger')).toEqual(expectedBtnContainer);
    expect(confirmModalConfirmBtn.className).toEqual('btn btn-danger');
  });

  it('should fallback to cta color for the confirm button if btnColor is not passed in', () => {
    // Mocking a dom where a btnContainer was created without a color being passed in
    const btnContainer = confirmModal._createBtnContainer();
    document.body.appendChild(btnContainer);
    const confirmModalConfirmBtn = document.querySelector('#confirmModalConfirmBtn');

    expect(confirmModalConfirmBtn.className).toEqual('btn btn-cta');
  });
});

describe('_createConfirmMessage(message)', () => {
  it('should be a function', () => {
    expect(typeof confirmModal._createConfirmMessage).toEqual('function');
  });
  
  it('should always return an HTML element', () => {
    expect(confirmModal._createConfirmMessage() instanceof HTMLElement).toBeTruthy();
    expect(confirmModal._createConfirmMessage('Some confirmation message') instanceof HTMLElement).toBeTruthy();
    expect(confirmModal._createConfirmMessage('Some confirmation message', 'someColor') instanceof HTMLElement).toBeTruthy();
    expect(confirmModal._createConfirmMessage([]) instanceof HTMLElement).toBeTruthy();
    expect(confirmModal._createConfirmMessage({}) instanceof HTMLElement).toBeTruthy();
    expect(confirmModal._createConfirmMessage(0) instanceof HTMLElement).toBeTruthy();
  });

  it('should create a p HTML element with the a text node of the message argument', () => {
    // Mocking the expected p HTML element
    const expectedMessageElement = document.createElement('p');
    expectedMessageElement.appendChild(document.createTextNode('Confirm some action?'));

    expect(confirmModal._createConfirmMessage('Confirm some action?')).toEqual(expectedMessageElement);
  });
  
  it(`it should fallback to "Are you sure?" as the confirmation message if a falsy message argument is passed in`, () => {
    // Mocking a confirm message being added to the DOM
    document.body.appendChild(confirmModal._createConfirmMessage());
    const confirmMessage = document.querySelector('p');

    expect(confirmMessage.textContent).toEqual('Are you sure?');
  });
});
