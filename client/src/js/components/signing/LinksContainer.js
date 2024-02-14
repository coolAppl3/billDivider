class LinksContainer {
  constructor() {
    this._linksContainerElement = document.querySelector('.links-container');

    this._loadEventListeners();
  };

  _loadEventListeners() {
    this._linksContainerElement.addEventListener('click', this._handleClickEvents.bind(this));
    this._linksContainerElement.addEventListener('keyup', this._handleKeyEvents.bind(this));
  };

  _handleKeyEvents(e) {
    const pressedKey = e.key;

    if(pressedKey === 'Enter') {
      this._handleClickEvents(e);
    };
  };

  _handleClickEvents(e) {
    if(e.target.id === 'returnToPreviousPage') {
      history.back();
      return ;
    }
    
    if(e.target.id === 'returnToHomepage') {
      window.location.href = 'index.html';
      return ;
    };
  };
};

export default LinksContainer;