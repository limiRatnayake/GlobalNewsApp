import {combineReducers} from '@reduxjs/toolkit';
import categorySlice from './categorySlice';
import notificationSlice from './notificationSlice';

const rootReducers = combineReducers({
  category: categorySlice,
  notification: notificationSlice,
});

export default rootReducers;
