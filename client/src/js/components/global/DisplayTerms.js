class DisplayTerms {
  constructor() {
    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('DOMContentLoaded', this._checkIfAccepted.bind(this));
  };

  _checkIfAccepted() {
    const hasAcceptedTerms = localStorage.getItem('hasAcceptedTerms');

    if(!hasAcceptedTerms) {
      this._displayTermsPopup();
    };
  };

  _displayTermsPopup() {
    const termsPopupElement = this._createTermsPopup();
    document.body.appendChild(termsPopupElement);

    const confirmTermsBtn = document.querySelector('#confirmTermsBtn');
    confirmTermsBtn.addEventListener('click', this._confirmTerms.bind(this));
    confirmTermsBtn.addEventListener('keyup', this._handleConfirmTermsBtnKeyEvents.bind(this));
  };

  _createTermsPopup() {
    const termsPopup = document.createElement('div');
    termsPopup.className = 'termsPopup';

    const container = document.createElement('div');
    container.className = 'container';

    const termsPopupContainer = document.createElement('div');
    termsPopupContainer.className = 'termsPopup-container';

    const desc = document.createElement('p');
    desc.className = 'content-p';

    desc.innerHTML = `By using Bill Divider, you accept our <a href="termsOfService.html" target="_blank">Terms of Service</a>, which also contains our Cookies Policy.`;
    
    const confirmTermsBtn = document.createElement('p');
    confirmTermsBtn.id = 'confirmTermsBtn';
    confirmTermsBtn.className = 'btn btn-light';
    confirmTermsBtn.setAttribute('tabindex', 0);
    confirmTermsBtn.appendChild(document.createTextNode('Confirm and close'));

    termsPopupContainer.appendChild(desc);
    termsPopupContainer.appendChild(confirmTermsBtn);

    container.appendChild(termsPopupContainer);
    termsPopup.appendChild(container);

    return termsPopup;
  };

  _handleConfirmTermsBtnKeyEvents(e) {
    if(e.key === 'Enter') {
      this._confirmTerms(e);
    };
  };

  _confirmTerms(e) {
    localStorage.setItem('hasAcceptedTerms', true);
    
    e.target.removeEventListener('keyup', this._handleConfirmTermsBtnKeyEvents);
    e.target.removeEventListener('click', this._confirmTerms);

    const termsPopupElement = document.querySelector('.termsPopup');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        termsPopupElement.style.transform = 'translateY(150px)';
      });
    });
    setTimeout(() => { termsPopupElement.remove() }, 300);
  };
};

export default DisplayTerms;