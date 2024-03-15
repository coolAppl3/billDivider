import sessionInfo from "./SessionInfo";

class SessionReference {
  static set(session) {
    if(!session.billLimit) {
      session.billLimit = sessionInfo.billLimit;
    };

    const sessionJSONString = JSON.stringify(session);
    const originalSessionReference = JSON.parse(sessionJSONString);

    sessionStorage.setItem('originalSessionReference', JSON.stringify(originalSessionReference));
  };

  static changesMade() {
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