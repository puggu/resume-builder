import { push } from 'connected-react-router';
import { call, all, takeLatest, put, select } from 'redux-saga/effects';
import { LOGIN_ACTION } from './constants';
import {JWT_TOKEN_KEY} from 'utils/constants';
import { userDataLoaded } from 'containers/App/actions';
import { makeSelectAuth } from 'containers/App/selectors';
var jwt = require('jsonwebtoken');

function* getLoginData(action) {
  try {
    const data = (jwt.verify(action.uid, JWT_TOKEN_KEY)).state;
    yield put(push('/dashboard'));
    yield put(userDataLoaded(data.global.userData));
  } catch (error) {
    const authed = yield select(makeSelectAuth());
    if(authed)
      yield put(push('/dashboard'));
    else
      console.log('error login in', error);
  }
}

// Individual exports for testing
export default function* loginPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOGIN_ACTION, getLoginData);
}
