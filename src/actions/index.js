import {
  REGISTER_USER,
  ADD_PROJECT,
  APPLY_FOR_PROJECT,
  CANCEL_APPLICATION,
  DELETE_PROJECT,
  EDIT_PROJECT
} from "../constants/action-types";

export function registerUser(payload) {
  return { type: REGISTER_USER, payload };
}

export function addProject(payload) {
  return { type: ADD_PROJECT, payload };
}

export function applyForProject(payload) {
  return { type: APPLY_FOR_PROJECT, payload };
}

export function cancelApplication(payload) {
  return { type: CANCEL_APPLICATION, payload };
}

export function deleteProject(payload) {
  return { type: DELETE_PROJECT, payload };
}

export function editProject(payload) {
  return { type: EDIT_PROJECT, payload };
}
