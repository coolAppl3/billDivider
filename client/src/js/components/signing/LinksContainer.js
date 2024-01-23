class LinksContainer {
  constructor(linksContainerClass) {
    this._linksContainer = document.querySelector(`.${linksContainerClass}`);

    this._loadEventListeners();
  };

  _loadEventListeners() {
    this._linksContainer.addEventListener('click', this._handleClickEvents.bind(this));
    this._linksContainer.addEventListener('keyup', this._handleKeyEvents.bind(this));
  };

  _handleKeyEvents(e) {
    const pressedKey = e.key;

    if(pressedKey === 'Enter') {
      this._handleClickEvents(e);
    };
  };

  _handleClickEvents(e) {
    if(e.target.id === 'returnToPreviousPage') {
      return history.back();
    }
    
    if(e.target.id === 'returnToHomepage') {
      return window.location.href = 'index.html';
    };
  };
};

export default LinksContainer;