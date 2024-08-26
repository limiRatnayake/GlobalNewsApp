import {combineReducers} from '@reduxjs/toolkit';
import categorySlice from './categorySlice';

const rootReducers = combineReducers({
  category: categorySlice,
});

export default rootReducers;
