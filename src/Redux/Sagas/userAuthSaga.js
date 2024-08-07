import {call, put, takeEvery} from 'redux-saga/effects';
import * as types from '../Actions/actionTypes';
import * as auth_actions from '../Actions/userAuthActions';
import api from '../Services/api';
import {errorToast, sucessToast} from '../../components/core/Toast';

export function* watch_user_auth_request() {
  yield takeEvery(types.REQUEST_USER_EMAIL_OTP, request_user_email_otp);
}

function* request_user_email_otp(action) {
  console.log('------Action', action);
  try {
    const response = yield call(api.user_auth_api, 'auth/otp/mobile', {
      phone_number: action.payload.phone_number,
      otp: action.payload.otp,
    });
    console.log('API response:', response.data);
    if (response.ok && response.data.success && response.data.data) {
      yield put(auth_actions.success_user_email_otp(response.data.data));
      sucessToast('Sucess', 'OTP Sent to Mobile Please wait');
    } else {
      yield put(auth_actions.failed_user_email_otp());
      errorToast('Error!', 'Otp Request Failed');
    }
  } catch (error) {
    yield put(auth_actions.failed_user_email_otp());
    errorToast('Error!', 'Otp Request Failed');
    console.log(error);
  }
}
