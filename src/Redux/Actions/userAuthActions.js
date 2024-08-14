import * as types from './actionTypes';

export const request_user_mobile_otp = (phone_number, otp) => ({
  type: types.REQUEST_USER_MOBILE_OTP,
  payload: {
    loading: true,
    phone_number,
    otp,
  },
});

export const success_user_mobile_otp = data => ({
  type: types.SUCCESS_USER_MOBILE_OTP,
  payload: {
    loading: false,
    otp: data,
  },
});

export const failed_user_mobile_otp = () => ({
  type: types.FAILED_USER_MOBILE_OTP,
  payload: {
    loading: false,
    otp: 0,
  },
});

export const request_user_email_otp = (email, otp, already_registered) => ({
  type: types.REQUEST_USER_EMAIL_OTP,
  payload: {
    loading: true,
    email,
    otp,
    already_registered,
  },
});

export const success_user_email_otp = data => ({
  type: types.SUCCESS_USER_EMAIL_OTP,
  payload: {
    loading: false,
    otp: data,
  },
});

export const failed_user_email_otp = () => ({
  type: types.FAILED_USER_EMAIL_OTP,
  payload: {
    loading: false,
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
    loading: true,
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
    loading: false,
    userToken: data,
  },
});

export const failed_social_login = () => ({
  type: types.FAILED_SOCIAL_LOGIN,
  payload: {
    loading: false,
    userToken: '',
  },
});

export const request_user_login = (email, password) => ({
  type: types.REQUEST_USER_LOGIN,
  payload: {
    loading: true,
    email,
    password,
  },
});

export const success_user_login = data => ({
  type: types.SUCCESS_USER_LOGIN,
  payload: {
    loading: false,
    userToken: data,
  },
});

export const failed_user_login = () => ({
  type: types.FAILED_USER_LOGIN,
  payload: {
    loading: false,
    userToken: {},
  },
});

export const request_user_registration = (email, password) => ({
  type: types.REQUEST_USER_REGISTRATION,
  payload: {
    loading: true,
    email,
    password,
  },
});

export const success_user_registration = data => ({
  type: types.SUCCESS_USER_REGISTRATION,
  payload: {
    loading: false,
    user_token: data,
  },
});

export const failed_user_registration = () => ({
  type: types.FAILED_USER_REGISTRATION,
  payload: {
    loading: false,
    user_token: '',
  },
});

export const request_forgot_pass_email = (email, forgot_pass_otp) => ({
  type: types.REQUEST_FORGOT_PASS_EMAIL,
  payload: {
    loading: true,
    email,
    forgot_pass_otp,
  },
});

export const success_forgot_pass_email = data => ({
  type: types.SUCCESS_FORGOT_PASS_EMAIL,
  payload: {
    loading: false,
    forgot_pass_email: data,
  },
});

export const failed_forgot_pass_email = () => ({
  type: types.FAILED_FORGOT_PASS_EMAIL,
  payload: {
    loading: false,
    forgot_pass_email: false,
  },
});

export const request_forgot_change_password = (email, password, otp) => ({
  type: types.REQUEST_FORGOT_CHANGE_PASSWORD,
  payload: {
    loading: true,
    email,
    password,
    otp,
  },
});

export const success_forgot_change_password = data => ({
  type: types.SUCCESS_FORGOT_CHANGE_PASSWORD,
  payload: {
    loading: false,
    changePass: data,
  },
});

export const failed_forgot_change_password = () => ({
  type: types.FAILED_FORGOT_CHANGE_PASSWORD,
  payload: {
    loading: false,
    changePass: false,
  },
});

export const request_log_out = () => ({
  type: types.REQUEST_LOG_OUT,
  payload: {
    loading: true,
  },
});

export const success_log_out = () => ({
  type: types.SUCCESS_LOG_OUT,
  payload: {
    loading: false,
    user_info: null,
    user_dashboard_data: null,
  },
});

export const failed_log_out = () => ({
  type: types.FAILED_LOG_OUT,
  payload: {
    loading: false,
  },
});
