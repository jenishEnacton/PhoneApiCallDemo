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

export const request_deal_info = deal_id => ({
  type: types.REQUEST_DEAL_INFO,
  payload: {
    loading: true,
    deal_id,
    deal_info: {},
  },
});

export const success_deal_info = data => ({
  type: types.SUCCESS_DEAL_INFO,
  payload: {
    loading: false,
    deal_info: data,
  },
});

export const failed_deal_info = () => ({
  type: types.FAILED_DEAL_INFO,
  payload: {
    loading: false,
    deal_info: {},
  },
});
