import LoadingModal from "../../../js/components/global/LoadingModal";

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('display()', () => {
  it('should always return undefined', () => {
    expect(LoadingModal.display()).toBeUndefined();
    expect(LoadingModal.display(null)).toBeUndefined();
    expect(LoadingModal.display(0)).toBeUndefined();
    expect(LoadingModal.display('')).toBeUndefined();
    expect(LoadingModal.display({})).toBeUndefined();
    expect(LoadingModal.display([])).toBeUndefined();
    expect(LoadingModal.display('some value')).toBeUndefined();
    expect(LoadingModal.display(5)).toBeUndefined();
  });
  
  it('should not create a loading modal and append it if one already exists in the DOM', () => {
    const mockLoadingModal = document.createElement('div');
    mockLoadingModal.className = 'loading-modal';

    LoadingModal.display();
    const loadingModalsList = document.querySelectorAll('.loading-modal');

    expect(loadingModalsList.length).toBe(1);
  });
  
  it('should create a loading modal and append it to the DOM if one does not exist', () => {
    LoadingModal.display();

    const loadingModalsList = document.querySelectorAll('.loading-modal');
    expect(loadingModalsList.length).toBe(1);

    const loadingModalElement = document.querySelector('.loading-modal');
    expect(loadingModalElement).not.toBeNull();

    const expectedLoadingModal = document.createElement('div');
    expectedLoadingModal.className = 'loading-modal';
    expectedLoadingModal.innerHTML = '<span class="spinner"></span>';
    expect(document.body.firstElementChild).toEqual(expectedLoadingModal);
  });
});

describe('remove()', () => {
  it('should always return undefined', () => {
    expect(LoadingModal.remove()).toBeUndefined();
    expect(LoadingModal.remove(null)).toBeUndefined();
    expect(LoadingModal.remove(0)).toBeUndefined();
    expect(LoadingModal.remove('')).toBeUndefined();
    expect(LoadingModal.remove({})).toBeUndefined();
    expect(LoadingModal.remove([])).toBeUndefined();
    expect(LoadingModal.remove('some value')).toBeUndefined();
    expect(LoadingModal.remove(5)).toBeUndefined();
  });
  
  it('should not do anything if there is no loading modal in the DOM', () => {
    LoadingModal.remove();
    expect(document.body.firstElementChild).toBeNull();
  });
  
  it('should remove the loading modal if one exists in the DOM', () => {
    const mockLoadingModal = document.createElement('div');
    mockLoadingModal.className = 'loading-modal';
    document.body.appendChild(mockLoadingModal);

    LoadingModal.remove();
    expect(document.body.firstElementChild).toBeNull();
  });
});