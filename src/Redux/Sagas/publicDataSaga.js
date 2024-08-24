import {call, put, takeEvery} from 'redux-saga/effects';
import * as types from '../Actions/actionTypes';
import * as public_actions from '../Actions/publicData';
import config from '../../react-native-config';
import api from '../Services/api';
import {navigate} from '../../navigation/Appnavigation';

export function* watch_public_data_request() {
  yield takeEvery(types.REQUEST_HOME_SCREENDATA, request_home_screenData);
  yield takeEvery(types.REQUEST_DEAL_INFO, request_deal_info);
  yield takeEvery(types.REQUEST_STORE_DETAILS, request_store_details);
  yield takeEvery(types.REQUEST_STORE_CAT_DETAILS, request_store_cat_details);
  yield takeEvery(types.REQUEST_COUPON_CAT_DETAILS, request_coupon_cat_details);
  yield takeEvery(types.REQUEST_FILTERED_DEALS, request_filtered_deals);
  yield takeEvery(types.REQUEST_DEALS_FILTER_INFO, request_deals_filter_info);
}

function* request_home_screenData() {
  try {
    const response = yield call(
      api.publicAPI,
      config.API_URL + config.PUBLIC_PREFIX + '/apphome',
    );
    console.log('Response', response?.data?.data);
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

function* request_deal_info(action) {
  try {
    const response = yield call(
      api.publicAPI,
      config.API_URL +
        config.PUBLIC_PREFIX +
        '/app/dealInfo/' +
        action.payload.deal_id,
    );
    console.log('Selected Deal res', response?.data?.data);
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_deal_info(response.data.data));
    } else {
      yield put(public_actions.failed_deal_info());
    }
  } catch (error) {
    yield put(public_actions.failed_deal_info());
    console.log(error);
  }
}

function* request_store_details(action) {
  try {
    const response = yield call(
      api.publicAPI,
      config.API_URL +
        config.PUBLIC_PREFIX +
        '/app/storeInfo/' +
        action.payload.store_id,
    );
    console.log('info res data', response?.data?.data);
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_store_details(response.data.data));
      navigate('StoreDetails');
    } else {
      yield put(public_actions.failed_store_details());
    }
  } catch (error) {
    yield put(public_actions.failed_store_details());
    console.log(error);
  }
}

function* request_store_cat_details(action) {
  try {
    const response = yield call(
      api.publicAPI,
      config.API_URL +
        config.PUBLIC_PREFIX +
        '/app/stores/' +
        action.payload.store_cat_id,
    );
    // console.log('cat res data', response?.data?.data);
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_store_cat_details(response.data.data));
      navigate('StoreCatDetails');
    } else {
      yield put(public_actions.failed_store_cat_details());
    }
  } catch (error) {
    yield put(public_actions.failed_store_cat_details());
    console.log(error);
  }
}
function* request_coupon_cat_details(action) {
  try {
    const response = yield call(
      api.publicAPI,
      config.API_URL +
        config.PUBLIC_PREFIX +
        '/app/catInfo/' +
        action.payload.coupon_cat_id,
    );
    console.log('Res Coupon', response?.data?.data);

    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_coupon_cat_details(response.data.data));
      navigate('CouponCatDetails');
    } else {
      yield put(public_actions.failed_coupon_cat_details());
    }
  } catch (error) {
    yield put(public_actions.failed_coupon_cat_details());
    console.log(error);
  }
}
function* request_filtered_deals(action) {
  try {
    let body = {
      cat: action.payload.deal_filter_cats || null,
      store: action.payload.deal_filter_stores || null,
      show: action.payload.deal_filter_show_type || 'all',
      order: action.payload.deal_filter_order_type || 'popular',
      page: action.payload.deal_filter_page_no || 1,
      perPage: action.payload.deal_filter_per_page || 30,
      min_price: action.payload.deal_filter_min_price || null,
      max_price: action.payload.deal_filter_max_price || null,
      seq: action.payload.deal_filter_sequence || 'ascending',
    };
    const response = yield call(
      api.publicPostAPI,
      config.API_URL + config.PUBLIC_PREFIX + '/deals',
      body,
    );
    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_filtered_deals(response.data.data));
    } else {
      yield put(public_actions.failed_filtered_deals());
    }
  } catch (error) {
    yield put(public_actions.failed_filtered_deals());
    console.log(error);
  }
}

function* request_deals_filter_info(action) {
  try {
    let body = {
      cat: action.payload.deal_filter_cats || null,
      store: action.payload.deal_filter_stores || null,
      is_data: true,
    };
    const response = yield call(
      api.publicPostAPI,
      config.API_URL + config.PUBLIC_PREFIX + '/dealsFilter',
      body,
    );

    if (
      response.ok &&
      response.data.success &&
      response.data.data &&
      !response.data.data.error
    ) {
      yield put(public_actions.success_deals_filter_info(response.data.data));
    } else {
      yield put(public_actions.failed_deals_filter_info());
    }
  } catch (error) {
    yield put(public_actions.failed_deals_filter_info());
    console.log(error);
  }
}
