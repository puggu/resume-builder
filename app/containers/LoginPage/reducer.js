/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, LOGIN_ACTION } from './constants';

export const initialState = {
  loading: true,
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOGIN_ACTION:
        draft.loading = false;
        break;
    }
  });

export default loginPageReducer;
