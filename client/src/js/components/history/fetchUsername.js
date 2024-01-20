import HistoryAPI from "../services/HistoryAPI";
import locateLoginToken from "../global/locateLoginToken";

import Cookies from "../global/Cookies";
import messagePopup from "../global/messagePopup";

// Initializing imports
const historyAPI = new HistoryAPI();
const cookies = new Cookies();

async function fetchUsername() {
  const loginToken = locateLoginToken();

  if(!loginToken) { // Not logged in - Redirecting...
    window.location.href = 'signIn.html';
    return ;
  };

  try {
    const res = await historyAPI.getUsername(loginToken);
    const username = res.data.data;
    return username;
    
  } catch (err) {
    console.log(err)

    if(!err.response) {
      cookies.remove('loginToken');
      messagePopup('Something went wrong', 'danger');
      setTimeout(() => window.location.href = 'signIn.html', 500);
      return ;
    };

    const status = err.response.status;

    if(status === 404) { // Invalid loginToken
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

export default fetchUsername;