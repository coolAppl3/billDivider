function loadingModal() {
  const loadingModal = document.createElement('div');
  loadingModal.className = 'loading-modal';

  const spinner = document.createElement('span');
  spinner.className = 'spinner';

  loadingModal.appendChild(spinner);
  document.querySelector('body').appendChild(loadingModal);
};

export default loadingModal;