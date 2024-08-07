// store.js
import reducer from './Reducers/index';
import rootSaga from './Sagas';
import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
// import {createLogger} from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

// const logger = createLogger({
//   predicate: () => true,
//   diff: true,
//   duration: true,
// });

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
