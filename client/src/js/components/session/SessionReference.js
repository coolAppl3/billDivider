class SessionReference {

  static set(session) {
    const sessionJSONString = JSON.stringify(session);
    const originalSessionReference = JSON.parse(sessionJSONString);

    delete originalSessionReference.sessionID;
    delete originalSessionReference.createdOn;
    sessionStorage.setItem('originalSessionReference', JSON.stringify(originalSessionReference));
  };

  static changesMade(sessionInfo) {
    const originalSessionReference = sessionStorage.getItem('originalSessionReference');

    if(JSON.stringify(sessionInfo) === originalSessionReference) {
      return false;
    };

    return true;
  };

  static remove() {
    sessionStorage.removeItem('originalSessionReference');
  };

  static referenceExists() {
    return sessionStorage.getItem('originalSessionReference');
  };
};

export default SessionReference;