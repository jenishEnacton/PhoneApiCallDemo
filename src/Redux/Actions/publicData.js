import * as types from './actionTypes';

export const request_home_screenData = () => ({
  type: types.REQUEST_HOME_SCREENDATA,
  payload: {
    loading: true,
  },
});

export const success_home_screenData = data => ({
  type: types.SUCCESS_HOME_SCREENDATA,
  payload: {
    loading: false,
    home_screen_data: data,
  },
});

export const failed_home_screenData = () => ({
  type: types.FAILED_HOME_SCREENDATA,
  payload: {
    loading: false,
    home_screen_data: {},
  },
});
