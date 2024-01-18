import HistoryAPI from "../services/historyAPI";
import locateLoginToken from "../global/locateLoginToken";

// Initializing imports
const historyAPI = new HistoryAPI();


async function deleteSession(sessionID) {
  const loginToken = locateLoginToken();

  if(!loginToken) { // Not logged in - Redirecting...
    window.location.href = 'signIn.html';
    return ;
  };

  try {
    const res = await historyAPI.deleteSession(loginToken, sessionID);
    return ;

  } catch (err) {
    console.log(err)

    if(!err.response) {
      cookies.remove('loginToken');
      messagePopup('Something went wrong', 'danger');
      setTimeout(() => window.location.href = 'signIn.html', 500);
      return ;
    };
    
    const status = err.response.status;

    if(status === 403) { // Invalid loginToken
      cookies.remove('loginToken');
      messagePopup('Not logged in. Redirecting...', 'danger');
      setTimeout(() => window.location.href = 'signIn.html', 500);

    } else { // Most likely 500
      cookies.remove('loginToken');
      messagePopup('Something went wrong', 'danger');
      setTimeout(() => window.location.href = 'signIn.html', 500);
    };
  }
};

export default deleteSession;