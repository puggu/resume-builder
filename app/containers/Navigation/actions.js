/*
 *
 * Navigation actions
 *
 */

import { DEFAULT_ACTION, LOGOUT_ACTION, TOGGLE_MODE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function logoutAction() {
  return {
    type: LOGOUT_ACTION,
  };
}

export function toggleMode(mode) {
  return {
    type: TOGGLE_MODE,
    mode,
  };
}
