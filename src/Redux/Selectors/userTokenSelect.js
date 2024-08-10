import {createSelector} from 'reselect';

const getParamState = state => state.otp;

export const getUserToken = createSelector(
  [getParamState],
  params => params.userToken,
);
