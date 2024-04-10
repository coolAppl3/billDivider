import HistoryAPI from "../services/HistoryAPI";
import locateLoginToken from "../global/locateLoginToken";
import Cookies from "../global/Cookies";
import redirectAfterDelayMillisecond from "../global/redirectAfterDelayMillisecond";

// Initializing imports
const historyAPI = new HistoryAPI();
const cookies = new Cookies();

async function fetchUserHistory() {
  const loginToken = locateLoginToken();

  if(!loginToken) { // Not logged in - Redirecting...
    redirectAfterDelayMillisecond('signIn.html');
    return ;
  };

  try {
    const res = await historyAPI.getSessionHistory(loginToken);
    const history = res.data.data;
    return history;

  } catch (err) {
    err.response && console.log(err.response.data);

    if(!err.response) {
      cookies.remove('loginToken');
      redirectAfterDelayMillisecond('signIn.html');
      return ;
    };
    
    const status = err.response.status;

    if(status === 404) { // Invalid loginToken
      cookies.remove('loginToken');
      redirectAfterDelayMillisecond('signIn.html', 1000, 'Not logged in');
      return ;
    }

    cookies.remove('loginToken');
    redirectAfterDelayMillisecond('signIn.html');
  };
};

export default fetchUserHistory;