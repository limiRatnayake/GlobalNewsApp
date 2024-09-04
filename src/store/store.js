import {configureStore} from '@reduxjs/toolkit';

import rootReducers from './reducers';
import {thunk} from 'redux-thunk';

const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});

export default store;
