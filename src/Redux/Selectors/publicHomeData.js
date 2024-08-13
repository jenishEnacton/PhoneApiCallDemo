import {createSelector} from 'reselect';

// Selector for home_screen_data
const selectHomeScreenData = state => state?.params?.home_screen_data || {};

export const getHomeScreenData = createSelector(
  [selectHomeScreenData],
  homeScreenData => {
    return Object.values(homeScreenData);
  },
);
