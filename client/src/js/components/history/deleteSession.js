import SessionAPI from "../services/SessionAPI";
import locateLoginToken from "../global/locateLoginToken";
import redirectAfterDelayMillisecond from "../global/redirectAfterDelayMillisecond";
import Cookies from "../global/Cookies";

// Initializing imports
const sessionAPI = new SessionAPI();
const cookies = new Cookies();


async function deleteSession(sessionID) {
  const loginToken = locateLoginToken();

  if(!loginToken) { // Not logged in - Redirecting...
    return redirectAfterDelayMillisecond('signIn.html', 1000, 'Not logged in');
  };

  try {
    await sessionAPI.deleteSession(loginToken, sessionID);
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

    cookies.remove('loginToken');
    redirectAfterDelayMillisecond('signIn.html');
  };
};

export default deleteSession;