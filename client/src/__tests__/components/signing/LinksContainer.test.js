import LinksContainer from "../../../js/components/signing/LinksContainer";

const linksContainerHTML = `
  <div class="links-container">
    <p
      id="returnToPreviousPage"
      tabindex="0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        class="svg-icon"
      >
        <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
        <path
          d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
        />
      </svg>
      Return to previous page
    </p>
    <p
      id="returnToHomepage"
      tabindex="0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        class="svg-icon"
      >
        <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
        <path
          d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
        />
      </svg>
      Homepage
    </p>
  </div>
`;
let linksContainer;

describe('_handleKeyEvents(e)', () => {
  beforeEach(() => {
    document.body.innerHTML = linksContainerHTML;
    linksContainer = new LinksContainer();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should always return undefined if a valid event object is passed in', () => {
    const mockEvent1 = { 
      target: {
        key: 'Enter',
        id: 'mockID',
      },
    };

    const mockEvent2 = { 
      target: {
        key: 'G',
        id: 'mockID',
      },
    };

    const mockEvent3 = { 
      target: {
        key: ' ',
        id: 'mockID',
      },
    };
    
    expect(linksContainer._handleKeyEvents(mockEvent1)).toBeUndefined();
    expect(linksContainer._handleKeyEvents(mockEvent2)).toBeUndefined();
    expect(linksContainer._handleKeyEvents(mockEvent3)).toBeUndefined();
  });

  it('should not call _handleClickEvents(e) if any other key apart from Enter is clicked while returnToPreviousPage link is outlined', () => {
    const mockKeyboardEvent = new KeyboardEvent('keyup', { key: 'G' })
    Object.defineProperty(mockKeyboardEvent, 'target', {
      writable: false,
      value: {
        id: 'returnToPreviousPage',
      },
    });

    const spyHandleClickEvents = jest.spyOn(linksContainer, '_handleClickEvents').mockImplementation(() => {});
    linksContainer._linksContainerElement.dispatchEvent(mockKeyboardEvent);

    expect(spyHandleClickEvents).toHaveBeenCalledTimes(0);
  });

  it('should call _handleClickEvents(e) if an Enter key is clicked while returnToPreviousPage link is outlined', () => {
    const mockKeyboardEvent = new KeyboardEvent('keyup', { key: 'Enter' })
    Object.defineProperty(mockKeyboardEvent, 'target', {
      writable: false,
      value: {
        id: 'returnToPreviousPage',
      },
    });

    const spyHandleClickEvents = jest.spyOn(linksContainer, '_handleClickEvents').mockImplementation(() => {});
    linksContainer._linksContainerElement.dispatchEvent(mockKeyboardEvent);

    expect(spyHandleClickEvents).toHaveBeenCalled();
  });
})


describe('_handleClickEvents(e)', () => {
  beforeEach(() => {
    delete window.location;
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href: 'somePage.html',
      },
    });
    
    document.body.innerHTML = linksContainerHTML;
    linksContainer = new LinksContainer();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    linksContainer = null;
    jest.resetAllMocks();
  });
  
  it('should always return undefined if a valid event object is passed in', () => {
    const mockEvent1 = { 
      target: {
        id: 'mockID',
      },
    };

    const mockEvent2 = { 
      target: {
        id: 'mockID',
      },
    };

    const mockEvent3 = { 
      target: {
        id: 'mockID',
      },
    };
    
    expect(linksContainer._handleClickEvents(mockEvent1)).toBeUndefined();
    expect(linksContainer._handleClickEvents(mockEvent2)).toBeUndefined();
    expect(linksContainer._handleClickEvents(mockEvent3)).toBeUndefined();
  });
  
  it('should call history.back() if the returnToPreviousPage link is clicked', () => {
    const mockMouseClickEvent = new MouseEvent('click');
    Object.defineProperty(mockMouseClickEvent, 'target', {
      writable: false,
      value: {
        id: 'returnToPreviousPage',
      },
    });

    const historyBackSpy = jest.spyOn(window.history, 'back').mockImplementation(() => {});
    linksContainer._linksContainerElement.dispatchEvent(mockMouseClickEvent);

    expect(historyBackSpy).toHaveBeenCalled();
  });

  it('should redirect to index.html if the returnToHomepage link is clicked', () => {
    const mockMouseClickEvent = new MouseEvent('click');
    Object.defineProperty(mockMouseClickEvent, 'target', {
      writable: false,
      value: {
        id: 'returnToHomepage',
      },
    });

    linksContainer._linksContainerElement.dispatchEvent(mockMouseClickEvent);
    expect(window.location.href).toEqual('index.html');
  });
  
});
