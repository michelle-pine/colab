
import { REGISTER_USER } from "../constants/action-types";
import { cookieUtils } from "../utils/cookie_utils"
import { users } from "../constants/users";
import { projects } from "../constants/projects";
import { tags } from "../constants/tags";

function getInitialState() {
  const user = cookieUtils.getUserCookieData();
  let allUsers = Object.assign({}, users); 
  if (user.loggedIn) {
    allUsers[999] = user;
  }
  let allProjects = Object.assign({}, projects); 
  let allTags = Object.assign({}, tags); 
  const initialState = {
    user: user.loggedIn ? user : {loggedIn: false},
    users: allUsers,
    tags: allTags,
    projects: allProjects,
    sortBy: "Date",
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