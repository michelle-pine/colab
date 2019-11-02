
import { REGISTER_USER } from "../constants/action-types";
import { cookieUtils } from "../utils/cookie_utils"


function getInitialState() {
  const user = cookieUtils.getUserCookieData();
  const initialState = {
    user: user.loggedIn ? user : {loggedIn: false},
  }

  return initialState;
}


function rootReducer(state = getInitialState(), action) {
  if (action.type === REGISTER_USER) {
    return Object.assign({}, state, {
      user: action.payload,
    });
  }
  return state;
};

export default rootReducer;