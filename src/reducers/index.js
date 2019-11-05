import {
  REGISTER_USER,
  ADD_PROJECT,
  APPLY_FOR_PROJECT,
  CANCEL_APPLICATION
} from "../constants/action-types";

import { cookieUtils } from "../utils/cookie_utils";
import { users } from "../constants/users";
import { projects } from "../constants/projects";
import { tags } from "../constants/tags";
import { myProjects } from "../constants/myProjects";

function getInitialState() {
  const user = cookieUtils.getUserCookieData();
  user.myProjects = myProjects;
  let allUsers = Object.assign({}, users);
  if (user.loggedIn) {
    allUsers[999] = user;
  }
  let allProjects = Object.assign({}, projects);
  let allTags = Object.assign({}, tags);
  const initialState = {
    user: user.loggedIn ? user : { loggedIn: false },
    users: allUsers,
    tags: allTags,
    projects: allProjects,
    sortBy: "Date"
  };

  return initialState;
}

function rootReducer(state = getInitialState(), action) {
  const newUser = Object.assign({}, state.user);
  switch (action.type) {
    case REGISTER_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
    case ADD_PROJECT:
      const newProjects = Object.assign({}, projects);
      newProjects[action.payload.id] = action.payload.project;
      return Object.assign({}, state, {
        projects: newProjects
      });
    case APPLY_FOR_PROJECT:
      newUser.myProjects.pending.push(action.payload);
      console.log(newUser);
      return Object.assign({}, state, {
        user: newUser
      });
    case CANCEL_APPLICATION:
      newUser.myProjects.pending.forEach((item, idx) => {
        if (
          item.project === action.payload.projectId &&
          item.position === action.payload.position
        ) {
          newUser.myProjects.pending.splice(idx, 1);
          return;
        }
      });
      console.log(newUser);
      return Object.assign({}, state, {
        user: newUser
      });

    default:
      return state;
  }
}

export default rootReducer;
