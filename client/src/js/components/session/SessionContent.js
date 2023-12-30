class SessionContent {
  constructor() {
    this._sessionContent = document.querySelector('.session-content');

    this._loadEventListeners();
  };

  _loadEventListeners() {
    this._sessionContent.addEventListener('click', this._handleSessionContentClickEvents.bind(this));
  };

  _handleSessionContentClickEvents(e) {
    e.stopImmediatePropagation();
    
    if(e.target.classList.contains('expandList')) {
      this._resizeList(e);
    };
  };

  _resizeList(e) {
    const chevronIcon = e.target;
    const contentList = e.target.closest('.session-content-container').lastElementChild;
    
    if(contentList.classList.contains('expanded')) {
      this._retractContentList(contentList, chevronIcon);
    } else {
      this._expandContentList(contentList, chevronIcon);
    };
    
  };

  _expandContentList(contentList, chevronIcon) {
    contentList.classList.add('expanded');
    chevronIcon.classList.add('rotate');
    
    let listHeight = 0;
    for(let child of contentList.children) {
      listHeight += (child.offsetHeight + 20);

      // Adding 20px of margin for every item. The last child has no margin, and since maxHeight is being used, there's no need to worry about it.
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        contentList.style.maxHeight = `${listHeight - 20}px`;
      });
    });
  };

  _retractContentList(contentList, chevronIcon) {
    contentList.classList.remove('expanded');
    chevronIcon.classList.remove('rotate');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        contentList.style.maxHeight = `0px`;
      });
    });
   
  };
};

export default SessionContent;