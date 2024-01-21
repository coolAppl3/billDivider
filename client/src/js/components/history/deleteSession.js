import SessionAPI from "../services/SessionAPI";
import locateLoginToken from "../global/locateLoginToken";
import redirectAfterDelayMillisecond from "../global/redirectAfterDelayMillisecond";

// Initializing imports
const sessionAPI = new SessionAPI();


async function deleteSession(sessionID) {
  const loginToken = locateLoginToken();

  if(!loginToken) { // Not logged in - Redirecting...
    window.location.href = 'signIn.html';
    return ;
  };

  try {
    await sessionAPI.deleteSession(loginToken, sessionID);
    return ;

  } catch (err) {
    console.log(err)

    if(!err.response) {
      cookies.remove('loginToken');
      return redirectAfterDelayMillisecond('signIn.html');
    };
    
    const status = err.response.status;

    if(status === 403) { // Invalid loginToken
      cookies.remove('loginToken');
      return redirectAfterDelayMillisecond('signIn.html', 1000, 'Not logged in');

    } else { // Most likely 500
      cookies.remove('loginToken');
      return redirectAfterDelayMillisecond('signIn.html');
    };
  }
};

export default deleteSession;