import {combineReducers} from '@reduxjs/toolkit';
import categorySlice from './categorySlice';
import notificationSlice from './notificationSlice';
import articleSlice from './articleSlice';
import loaderSlice from './loaderSlice';

const rootReducers = combineReducers({
  category: categorySlice,
  notification: notificationSlice,
  articleReducer: articleSlice,
  loader: loaderSlice,
});

export default rootReducers;
