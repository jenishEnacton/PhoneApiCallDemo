import {call, put, takeEvery} from 'redux-saga/effects';
import * as types from '../Actions/actionTypes';
import * as auth_actions from '../Actions/userAuthActions';
import api from '../Services/api';
import {errorToast, sucessToast} from '../../components/core/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUniqueId} from 'react-native-device-info';
import {navigate} from '../../navigation/Appnavigation';

export function* watch_user_auth_request() {
  yield takeEvery(types.REQUEST_USER_MOBILE_OTP, request_user_mobile_otp);
  yield takeEvery(types.REQUEST_USER_EMAIL_OTP, request_user_email_otp);
  yield takeEvery(types.REQUEST_SOCIAL_LOGIN, request_social_login);
  yield takeEvery(types.REQUEST_USER_REGISTRATION, request_user_registration);
  yield takeEvery(types.REQUEST_USER_LOGIN, request_user_login);
  yield takeEvery(types.REQUEST_FORGOT_PASS_EMAIL, request_forgot_pass_email);
  yield takeEvery(
    types.REQUEST_FORGOT_CHANGE_PASSWORD,
    request_forgot_change_password,
  );
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
      user_exist_response.data
    ) {
      const response = yield call(api.user_auth_api, 'auth/social', {
        email: action.payload.email,
        provider_id: action.payload.social_id,
        provider_type: action.payload.social_type,
        password: action.payload.social_type + action.payload.social_id,
      });
      console.log('social login', response);
      if (response.ok && response.data.success && response.data) {
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
        navigate('Home');
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
function* request_user_registration(action) {
  try {
    const response = yield call(api.user_auth_api, 'auth/register', {
      email: action.payload.email,
      password: action.payload.password,
      device_name: getUniqueId,
    });
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data?.data?.error
    ) {
      yield put(auth_actions.success_user_registration(response.data.data));
      sucessToast('User Register sucessfully');
      yield AsyncStorage.setItem(
        'USER_AUTH',
        JSON.stringify({
          token: `Bearer ${response.data.data}`,
        }),
      );
      yield AsyncStorage.setItem(
        'IS_SOCIAL_LOGIN',
        JSON.stringify({
          is_social: false,
        }),
      );
      navigate('Home', {email: action.payload.email});
    } else {
      if (response.data?.data?.error?.email) {
        errorToast(response.data?.data?.error?.email[0]);
      } else if (response.data?.data?.error?.referrer_code) {
        errorToast(response.data?.data?.error?.referrer_code[0]);
      } else {
        errorToast(
          response.data?.data?.message
            ? response.data?.data?.message
            : 'Error!',
          'Registration request failed',
        );
      }
      yield put(auth_actions.failed_user_registration());
    }
  } catch (error) {
    yield put(auth_actions.failed_user_registration());
    errorToast('Error!', 'Registration request failed');
    console.log(error);
  }
}
function* request_user_login(action) {
  try {
    const response = yield call(api.user_auth_api, 'auth/login', {
      email: action.payload.email,
      password: action.payload.password,
      device_name: getUniqueId,
    });
    console.log('Login Res', response.data.data);
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data?.data?.error
    ) {
      yield put(auth_actions.success_user_login(response.data.data));
      sucessToast('Sucess', 'User loggedIn sucessfull');
      yield AsyncStorage.setItem(
        'USER_AUTH',
        JSON.stringify({
          token: `Bearer ${response.data.data}`,
        }),
      );
      yield AsyncStorage.setItem(
        'IS_SOCIAL_LOGIN',
        JSON.stringify({
          is_social: false,
        }),
      );
      navigate('Home');
    } else {
      if (response.data?.data?.error?.email) {
        errorToast(response.data?.data?.error?.email[0]);
      } else {
        errorToast(
          response.data?.data?.message
            ? response.data?.data?.message
            : 'Error!',
          'Registration request failed',
        );
      }
      yield put(auth_actions.failed_user_login());
    }
  } catch (error) {
    yield put(auth_actions.failed_user_login());
    errorToast('Error!', 'Registration request failed');
    console.log(error);
  }
}
function* request_forgot_pass_email(action) {
  try {
    const response = yield call(api.user_auth_api, 'auth/password/forgot', {
      email: action.payload.email,
      otp: action.payload.forgot_pass_otp,
    });
    console.log('Response', response);

    if (response.ok && response.data.success && response.data.data) {
      yield put(auth_actions.success_forgot_pass_email(response.data.data));
      sucessToast('Sucess', 'OTP sent to Email');
    } else {
      yield put(auth_actions.failed_forgot_pass_email());
      errorToast(
        response.data?.data?.message ? response.data?.data?.message : 'Error!',
        'OTP request failed',
      );
    }
  } catch (error) {
    yield put(auth_actions.failed_forgot_pass_email());
    errorToast('Error!', 'Email request Failed');
    console.log(error);
  }
}
function* request_forgot_change_password(action) {
  try {
    const response = yield call(api.user_auth_api, 'auth/password/update', {
      email: action.payload.email,
      password: action.payload.password,
      otp: Number(action.payload.otp),
    });
    if (response.ok && response.data.success && response.data.data) {
      yield put(
        auth_actions.success_forgot_change_password(response.data.data),
      );
      sucessToast('Sucess', 'Password changed Sucessfully');
      navigate('Login');
    } else {
      yield put(auth_actions.failed_forgot_change_password());
      errorToast(
        response.data?.data?.message ? response.data?.data?.message : 'Error!',
        'Change password failed',
      );
    }
  } catch (error) {
    yield put(auth_actions.failed_forgot_change_password());
    errorToast('Error!', 'Change Password Failed');
    console.log(error);
  }
}
