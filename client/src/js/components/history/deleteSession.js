import SessionAPI from "../services/SessionAPI";
import locateLoginToken from "../global/locateLoginToken";
import redirectAfterDelayMillisecond from "../global/redirectAfterDelayMillisecond";
import Cookies from "../global/Cookies";
import generateAPIKey from "../global/generateAPIKey";
import messagePopup from "../global/messagePopup";

// Initializing imports
const sessionAPI = new SessionAPI();
const cookies = new Cookies();


async function deleteSession(sessionID) {
  const loginToken = locateLoginToken();

  if(!loginToken) { // Not logged in - Redirecting...
    return redirectAfterDelayMillisecond('signIn.html', 1000, 'Not logged in');
  };

  const APIKey = generateAPIKey();

  try {
    await sessionAPI.deleteSession(loginToken, APIKey, sessionID);
    return ;

  } catch (err) {
    err.response && console.log(err.response.data);

    if(!err.response) {
      cookies.remove('loginToken');
      redirectAfterDelayMillisecond('signIn.html');
      return ;
    };
    
    const status = err.response.status;

    if(status === 403) { // Invalid loginToken
      cookies.remove('loginToken');
      redirectAfterDelayMillisecond('signIn.html', 1000, 'Not logged in');
      return ;
    };

    if(status === 429) { // Too many requests
      messagePopup('Too many requests. Please try again in a few minutes.', 'danger', 5000);
      LoadingModal.remove();
      return ;
    };

    if(status === 401) {
      if(err.response.data.message === 'API key missing or invalid.') {
        cookies.remove('loginToken');
        redirectAfterDelayMillisecond('signIn.html');
        return ;
      };
    
      return ;
    };

    cookies.remove('loginToken');
    redirectAfterDelayMillisecond('signIn.html');
  };
};

export default deleteSession;