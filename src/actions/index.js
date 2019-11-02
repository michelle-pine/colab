import { REGISTER_USER } from "../constants/action-types";

export function registerUser(payload) {
  return { type: REGISTER_USER, payload };
}
