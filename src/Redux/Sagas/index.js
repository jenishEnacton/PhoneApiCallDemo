import {all} from 'redux-saga/effects';
import {watch_user_auth_request} from './userAuthSaga';

function* rootSaga() {
  [yield all([watch_user_auth_request()])];
}

export default rootSaga;
