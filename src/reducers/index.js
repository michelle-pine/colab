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
      let members = action.payload.project.projectMembers;
      if (members["business"].indexOf(999) >= 0) {
        newUser.myProjects.current.push({
          projectId: action.payload.id,
          position: "business"
        });
      }
      if (members["design"].indexOf(999) >= 0) {
        newUser.myProjects.current.push({
          projectId: action.payload.id,
          position: "design"
        });
      }
      if (members["front-end"].indexOf(999) >= 0) {
        newUser.myProjects.current.push({
          projectId: action.payload.id,
          position: "front-end"
        });
      }
      if (members["back-end"].indexOf(999) >= 0) {
        newUser.myProjects.current.push({
          projectId: action.payload.id,
          position: "back-end"
        });
      }

      if (
        members["business"].indexOf(999) < 0 &&
        members["design"].indexOf(999) < 0 &&
        members["front-end"].indexOf(999) < 0 &&
        members["back-end"].indexOf(999) < 0
      ) {
        newUser.myProjects.current.push({
          projectId: action.payload.id,
          position: ""
        });
      }

      return Object.assign({}, state, {
        projects: newProjects,
        user: newUser
      });
    case APPLY_FOR_PROJECT:
      newUser.myProjects.pending.push(action.payload);

      return Object.assign({}, state, {
        user: newUser
      });
    case CANCEL_APPLICATION:
      newUser.myProjects.pending.forEach((item, idx) => {
        if (
          item.projectId === action.payload.projectId &&
          item.position === action.payload.position
        ) {
          newUser.myProjects.pending.splice(idx, 1);
          return;
        }
      });
      return Object.assign({}, state, {
        user: newUser
      });

    default:
      return state;
  }
}

export default rootReducer;
