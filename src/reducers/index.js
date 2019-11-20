import {
  REGISTER_USER,
  ADD_PROJECT,
  APPLY_FOR_PROJECT,
  CANCEL_APPLICATION,
  DELETE_PROJECT,
  EDIT_PROJECT
} from "../constants/action-types";

import { BUSINESS, FRONT_END, BACK_END, DESIGN } from "../constants/common";

import { cookieUtils } from "../utils/cookie_utils";
import { users } from "../constants/users";
import { projects } from "../constants/projects";
import { tags } from "../constants/tags";
import { myProjects } from "../constants/myProjects";

const POSITIONS = [BUSINESS, FRONT_END, BACK_END, DESIGN];

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
  const newProjects = Object.assign({}, state.projects);

  switch (action.type) {
    case REGISTER_USER:
      let allUsers = Object.assign({}, state.users);
      allUsers[999] = action.payload;
      return Object.assign({}, state, {
        user: action.payload,
        users: allUsers
      });
    case ADD_PROJECT:
      newProjects[action.payload.id] = action.payload.project;
      let members = action.payload.project.projectMembers;

      POSITIONS.forEach(position => {
        if (members[position].indexOf(999) >= 0) {
          newUser.myProjects.current.push({
            projectId: action.payload.id,
            position: position
          });
        }
      });

      if (
        members[BUSINESS].indexOf(999) < 0 &&
        members[DESIGN].indexOf(999) < 0 &&
        members[FRONT_END].indexOf(999) < 0 &&
        members[BACK_END].indexOf(999) < 0
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

    case EDIT_PROJECT:
      newProjects[action.payload.id] = action.payload.project;
      let projectMembers = action.payload.project.projectMembers;

      POSITIONS.forEach(position => {
        let positionData = { projectId: action.payload.id, position: position };
        let positionIdx = findProjectPosition(
          position,
          action.payload.id,
          newUser.myProjects.current
        );

        if (projectMembers[position].indexOf(999) >= 0 && positionIdx < 0)
          newUser.myProjects.current.push(positionData);
        else if (projectMembers[position].indexOf(999) < 0 && positionIdx >= 0)
          newUser.myProjects.current.splice(positionIdx, 1);
      });

      let emptyPositionIdx = findProjectPosition(
        "",
        action.payload.id,
        newUser.myProjects.current
      );

      if (
        projectMembers[BUSINESS].indexOf(999) < 0 &&
        projectMembers[DESIGN].indexOf(999) < 0 &&
        projectMembers[FRONT_END].indexOf(999) < 0 &&
        projectMembers[BACK_END].indexOf(999) < 0 &&
        emptyPositionIdx < 0
      ) {
        newUser.myProjects.current.push({
          projectId: action.payload.id,
          position: ""
        });
      }

      if (emptyPositionIdx >= 0)
        if (
          projectMembers[BUSINESS].indexOf(999) >= 0 ||
          projectMembers[DESIGN].indexOf(999) >= 0 ||
          projectMembers[FRONT_END].indexOf(999) >= 0 ||
          projectMembers[BACK_END].indexOf(999) >= 0
        )
          newUser.myProjects.current.splice(emptyPositionIdx, 1);

      return Object.assign({}, state, {
        projects: newProjects,
        user: newUser
      });

    case DELETE_PROJECT:
      delete newProjects[action.payload.id];

      let current = [];
      newUser.myProjects.current.forEach((project, idx) => {
        if (!(project.projectId == action.payload.id)) {
          current.push(project);
        }
      });
      newUser.myProjects.current = current;

      let past = [];
      newUser.myProjects.past.forEach((project, idx) => {
        if (!(project.projectId == action.payload.id))
         past.push(project);
      });
      newUser.myProjects.past = past;

      let pending = [];
      newUser.myProjects.pending.forEach((project, idx) => {
        if (!(project.projectId == action.payload.id))
          pending.push(project)
      });
      newUser.myProjects.pending = pending;

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

function findProjectPosition(position, projectId, positionsList) {
  let output = -1;
  positionsList.forEach((item, idx) => {
    if (item.position == position && item.projectId == projectId) {
      output = idx;
    }
  });
  return output;
}

export default rootReducer;
