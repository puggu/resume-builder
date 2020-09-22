/*
 *
 * LoginPage actions
 *
 */

import { DEFAULT_ACTION, LOGIN_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getUserLogin(uid) {
  return {
    type: LOGIN_ACTION,
    uid,
  }
}
