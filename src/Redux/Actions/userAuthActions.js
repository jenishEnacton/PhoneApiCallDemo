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

// export const request_otp_verification = otp_sent => ({
//   type: types.REQUEST_OTP_VERIFICATION,
//   payload: {
//     otp_sent: otp_sent,
//   },
// });
