/*
 *
 * Navigation reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, TOGGLE_MODE } from './constants';

export const initialState = {
  mode: 'light',
};

/* eslint-disable default-case, no-param-reassign */
const navigationReducer = (state = initialState, action) =>
  produce(state,  draft  => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case TOGGLE_MODE:
        draft.mode = action.mode;
        break;
    }
  });

export default navigationReducer;
