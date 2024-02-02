import LoadingModal from "../../../js/components/global/LoadingModal";

afterEach(() => {
  document.body.innerHTML = '';
});

describe('display()', () => {
  it('should be a function', () => {
    expect(typeof LoadingModal.display).toEqual('function');
  });
  
  it('should always return undefined', () => {
    expect(LoadingModal.display()).toBeUndefined();
    expect(LoadingModal.display(0)).toBeUndefined();
    expect(LoadingModal.display({})).toBeUndefined();
    expect(LoadingModal.display('')).toBeUndefined();
  });
  
  it('should not create a loading modal and append it, if one already exists in the DOM', () => {
    const mockLoadingModal = document.createElement('div');
    mockLoadingModal.className = 'loading-modal';

    LoadingModal.display();
    const loadingModalsList = document.querySelectorAll('.loading-modal');

    expect(loadingModalsList.length).toEqual(1);
  });
  
  it('should create a loading modal and append it to the DOM, if there one does not exist ', () => {
    document.body.innerHTML = '';
    LoadingModal.display();

    const loadingModalsList = document.querySelectorAll('.loading-modal');
    expect(loadingModalsList.length).toEqual(1);

    const expectedLoadingModal = document.createElement('div');
    expectedLoadingModal.className = 'loading-modal';
    expectedLoadingModal.innerHTML = '<span class="spinner"></span>';
    expect(document.body.firstElementChild).toEqual(expectedLoadingModal);
  });
});

describe('remove()', () => {
  it('should be a function', () => {
    expect(typeof LoadingModal.remove).toEqual('function');
  });
  
  it('should always return undefined', () => {
    expect(LoadingModal.remove()).toBeUndefined();
    expect(LoadingModal.remove(0)).toBeUndefined();
    expect(LoadingModal.remove({})).toBeUndefined();
    expect(LoadingModal.remove('')).toBeUndefined();
  });

  it('should not do anything if there is no loading modal in the DOM', () => {
    document.body.innerHTML = '';
    LoadingModal.remove();

    expect(document.body.innerHTML).toEqual('');
  });
  
  it('should remove the loading modal if one exists in the DOM', () => {
    const mockLoadingModal = document.createElement('div');
    mockLoadingModal.className = 'loading-modal';
    document.body.appendChild(mockLoadingModal);

    LoadingModal.remove();
    expect(document.body.innerHTML).toEqual('');
  });
});