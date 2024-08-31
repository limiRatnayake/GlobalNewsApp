import {combineReducers} from '@reduxjs/toolkit';
import categorySlice from './categorySlice';
import notificationSlice from './notificationSlice';
import articleSlice from './articleSlice';

const rootReducers = combineReducers({
  category: categorySlice,
  notification: notificationSlice,
  articleReducer: articleSlice,
});

export default rootReducers;
