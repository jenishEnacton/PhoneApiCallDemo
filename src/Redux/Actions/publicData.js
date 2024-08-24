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

export const request_store_details = store_id => ({
  type: types.REQUEST_STORE_DETAILS,
  payload: {
    loading: true,
    store_id,
  },
});

export const success_store_details = data => ({
  type: types.SUCCESS_STORE_DETAILS,
  payload: {
    loading: false,
    store_details: data,
  },
});

export const failed_store_details = () => ({
  type: types.FAILED_STORE_DETAILS,
  payload: {
    loading: false,
    store_details: {},
  },
});

export const request_store_cat_details = (store_cat_id, store_cat) => ({
  type: types.REQUEST_STORE_CAT_DETAILS,
  payload: {
    loading: true,
    store_cat_id,
    store_cat,
  },
});

export const success_store_cat_details = data => ({
  type: types.SUCCESS_STORE_CAT_DETAILS,
  payload: {
    loading: false,
    store_cat_details: data,
  },
});

export const failed_store_cat_details = () => ({
  type: types.FAILED_STORE_CAT_DETAILS,
  payload: {
    loading: false,
    store_cat_details: {},
  },
});

export const request_coupon_cat_details = coupon_cat_id => {
  return {
    type: types.REQUEST_COUPON_CAT_DETAILS,
    payload: {
      loading: true,
      coupon_cat_id,
    },
  };
};

export const success_coupon_cat_details = data => {
  return {
    type: types.SUCCESS_COUPON_CAT_DETAILS,
    payload: {
      loading: false,
      coupon_cat_details: data,
    },
  };
};

export const failed_coupon_cat_details = () => {
  return {
    type: types.FAILED_COUPON_CAT_DETAILS,
    payload: {
      loading: false,
      coupon_cat_details: {},
    },
  };
};

export const request_filtered_deals = (
  deal_filter_cats,
  deal_filter_stores,
  deal_filter_order_type,
  deal_filter_page_no,
  deal_filter_per_page,
  deal_filter_min_price,
  deal_filter_max_price,
  deal_filter_sequence,
  deal_filter_show_type,
) => ({
  type: types.REQUEST_FILTERED_DEALS,
  payload: {
    loading: true,
    deal_filter_cats,
    deal_filter_stores,
    deal_filter_page_no,
    deal_filter_show_type,
    deal_filter_order_type,
    deal_filter_per_page,
    deal_filter_min_price,
    deal_filter_max_price,
    deal_filter_sequence,
  },
});

export const success_filtered_deals = data => ({
  type: types.SUCCESS_FILTERED_DEALS,
  payload: {
    loading: false,
    filtered_deals_data: data,
  },
});

export const failed_filtered_deals = () => ({
  type: types.FAILED_FILTERED_DEALS,
  payload: {
    loading: false,
    filtered_deals_data: {},
  },
});

export const request_deals_filter_info = (
  deal_filter_cats,
  deal_filter_stores,
) => ({
  type: types.REQUEST_DEALS_FILTER_INFO,
  payload: {
    loading: true,
    deal_filter_cats,
    deal_filter_stores,
  },
});

export const success_deals_filter_info = data => ({
  type: types.SUCCESS_DEALS_FILTER_INFO,
  payload: {
    loading: false,
    deals_filter_info: data,
  },
});

export const failed_deals_filter_info = () => ({
  type: types.FAILED_DEALS_FILTER_INFO,
  payload: {
    loading: false,
    deals_filter_info: {},
  },
});
