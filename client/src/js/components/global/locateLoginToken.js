import Cookies from "./Cookies";

const cookies = new Cookies();

function locateLoginToken() {
  const loginToken = cookies.get('loginToken');
  return loginToken;
};

export default locateLoginToken;