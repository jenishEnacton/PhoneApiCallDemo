import * as types from './actionTypes';

export const request_user_mobile_otp = (phone_number, otp) => ({
  type: types.REQUEST_USER_MOBILE_OTP,
  payload: {
    phone_number,
    otp,
  },
});

export const success_user_mobile_otp = data => ({
  type: types.SUCCESS_USER_MOBILE_OTP,
  payload: {
    otp: data,
  },
});

export const failed_user_mobile_otp = () => ({
  type: types.FAILED_USER_MOBILE_OTP,
  payload: {
    otp: 0,
  },
});

export const request_user_email_otp = (email, otp, already_registered) => ({
  type: types.REQUEST_USER_EMAIL_OTP,
  payload: {
    email,
    otp,
    already_registered,
  },
});

export const success_user_email_otp = data => ({
  type: types.SUCCESS_USER_EMAIL_OTP,
  payload: {
    otp: data,
  },
});

export const failed_user_email_otp = () => ({
  type: types.FAILED_USER_EMAIL_OTP,
  payload: {
    otp: 0,
  },
});

export const request_social_login = (
  email,
  social_id,
  social_type,
  password,
  mobile,
) => ({
  type: types.REQUEST_SOCIAL_LOGIN,
  payload: {
    email,
    social_id,
    social_type,
    password,
    mobile,
  },
});

export const success_social_login = data => ({
  type: types.SUCCESS_SOCIAL_LOGIN,
  payload: {
    userToken: data,
  },
});

export const failed_social_login = () => ({
  type: types.FAILED_SOCIAL_LOGIN,
  payload: {
    userToken: '',
  },
});

export const success_user_login = data => ({
  type: types.SUCCESS_USER_LOGIN,
  payload: {
    userToken: data,
  },
});

export const failed_user_login = () => ({
  type: types.FAILED_USER_LOGIN,
  payload: {
    userToken: {},
  },
});
