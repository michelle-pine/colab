import { REGISTER_USER } from "../constants/action-types";
import { ADD_PROJECT } from "../constants/action-types";

export function registerUser(payload) {
  return { type: REGISTER_USER, payload };
}

export function addProject(payload) {
  return { type: ADD_PROJECT, payload }; 
}