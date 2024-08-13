import {call, put, takeEvery} from 'redux-saga/effects';
import * as types from '../Actions/actionTypes';
import * as public_actions from '../Actions/publicData';
import config from '../../react-native-config';
import api from '../Services/api';

export function* watch_public_data_request() {
  yield takeEvery(types.REQUEST_HOME_SCREENDATA, request_home_screenData);
}

function* request_home_screenData() {
  try {
    const response = yield call(
      api.publicAPI,
      config.API_URL + config.PUBLIC_PREFIX + '/apphome',
    );
    // console.log('res Home', Object.values(response.data?.data));
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_home_screenData(response.data.data));
    } else {
      yield put(public_actions.failed_home_screenData());
    }
  } catch (error) {
    yield put(public_actions.failed_home_screenData());
    console.log(error);
  }
}
