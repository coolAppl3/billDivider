class Cookies {
  
  get(cookieKey) {
    if(!cookieKey) {
      return ;
    };
    
    const cookieMap = this._createCookieMap();
    if(!cookieMap) {
      return ;
    };

    const cookieValue = cookieMap.get(`${cookieKey}`);
    if(!cookieValue) {
      return ;
    };

    return cookieValue;
  };

  set(cookieKey, cookieValue, ageMilliseconds) {
    const cookieExpiryDate = this._setCookieExpiryDate(ageMilliseconds);
    
    if(!cookieExpiryDate) {
      document.cookie = `${cookieKey}=${cookieValue}; path=/`;
      return ;
    };
    
    document.cookie = `${cookieKey}=${cookieValue}; expires=${cookieExpiryDate}; path=/`;
  };

  remove(cookieKey) {
    document.cookie = `${cookieKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  };

  _createCookieMap() {
    if(!document.cookie) {
      return ;
    };
    
    const cookieArr = document.cookie.split(';');
    const cookieMap = new Map();

    for(let cookie of cookieArr) {
      const cookieKey = cookie.split('=')[0].trim();
      const cookieValue = cookie.split('=')[1].trim();

      cookieMap.set(cookieKey, cookieValue);
    };

    return cookieMap;
  };

  _setCookieExpiryDate(ageMilliseconds) {
    if(!ageMilliseconds || typeof ageMilliseconds !== 'number') {
      return ;
    };
    
    const currentTimestamp = new Date().getTime();
    const cookieExpiryTimestamp = new Date(currentTimestamp + ageMilliseconds)
    const cookieExpiryDate = cookieExpiryTimestamp.toUTCString();
  
    return cookieExpiryDate;
  };
};

export default Cookies;