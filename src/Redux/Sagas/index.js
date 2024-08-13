import {all} from 'redux-saga/effects';
import {watch_user_auth_request} from './userAuthSaga';
import {watch_public_data_request} from './publicDataSaga';

function* rootSaga() {
  [yield all([watch_user_auth_request(), watch_public_data_request()])];
}

export default rootSaga;
