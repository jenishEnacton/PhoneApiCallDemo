import {call, put, takeEvery} from 'redux-saga/effects';
import * as types from '../Actions/actionTypes';
import * as auth_actions from '../Actions/userAuthActions';
import api from '../Services/api';
import {errorToast, sucessToast} from '../../components/core/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function* watch_user_auth_request() {
  yield takeEvery(types.REQUEST_USER_MOBILE_OTP, request_user_mobile_otp);
  yield takeEvery(types.REQUEST_USER_EMAIL_OTP, request_user_email_otp);
  yield takeEvery(types.REQUEST_SOCIAL_LOGIN, request_social_login);
}

function* request_user_mobile_otp(action) {
  console.log('------Action', action);
  try {
    const response = yield call(api.user_auth_api, 'auth/otp/mobile', {
      phone_number: action.payload.phone_number,
      otp: action.payload.otp,
    });
    console.log('API response:', response.data);
    if (response.ok && response.data.success && response.data.data) {
      yield put(auth_actions.success_user_mobile_otp(response.data.data));
      sucessToast('Sucess', 'OTP Sent to Mobile Please wait');
    } else {
      yield put(auth_actions.failed_user_mobile_otp());
      errorToast('Error!', 'Otp Request Failed');
    }
  } catch (error) {
    yield put(auth_actions.failed_user_mobile_otp());
    errorToast('Error!', 'Otp Request Failed');
    console.log(error);
  }
}
function* request_user_email_otp(action) {
  console.log('------Action', action);
  try {
    const response = yield call(api.user_auth_api, 'auth/otp/email', {
      email: action.payload.email,
      otp: action.payload.otp,
      already_registered: action.payload.already_registered,
    });
    console.log('API response:', response.data);
    if (response.ok && response.data.success && response.data.data) {
      yield put(auth_actions.success_user_email_otp(response.data.data));
      sucessToast('Sucess', 'OTP Sent to Email Please wait');
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
function* request_social_login(action) {
  try {
    const user_exist_response = yield call(api.user_auth_api, 'auth/exists', {
      email: action.payload.email,
      provider_id: action.payload.social_id,
      provider_type: action.payload.social_type,
    });
    console.log('user exist', user_exist_response);
    if (
      user_exist_response.ok &&
      user_exist_response.data.success &&
      user_exist_response.data.data &&
      !user_exist_response.data?.data?.error
    ) {
      const response = yield call(api.user_auth_api, 'auth/social', {
        email: action.payload.email,
        provider_id: action.payload.social_id,
        provider_type: action.payload.social_type,
        password: action.payload.social_type + action.payload.social_id,
        phone_number: action.payload.mobile,
      });
      console.log('social login', response);
      if (
        response.ok &&
        response.data.success &&
        response.data.data &&
        !response.data?.data?.error
      ) {
        yield put(auth_actions.success_user_login(response.data.data));
        sucessToast('Sucess', 'Login Success');
        yield AsyncStorage.setItem(
          'USER_AUTH',
          JSON.stringify({
            token: `Bearer ${response.data.data}`,
          }),
        );
        yield AsyncStorage.setItem(
          'IS_SOCIAL_LOGIN',
          JSON.stringify({
            is_social: true,
          }),
        );
      } else {
        if (response.data?.data?.error?.email) {
          errorToast(response.data?.data?.error?.email[0]);
        } else if (response.data?.data?.error?.phone_number) {
          errorToast(response.data?.data?.error?.phone_number[0]);
        } else {
          errorToast(
            response.data?.data?.message
              ? response.data?.data?.message
              : 'Login request failed ',
          );
        }
        yield put(auth_actions.failed_user_login());
      }
    }
  } catch (error) {
    yield put(auth_actions.failed_user_login());
    errorToast('Error!', 'Login request failed');
    console.log(error);
  }
}
