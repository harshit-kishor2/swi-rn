import {configureStore} from '@reduxjs/toolkit';
import combineReducer from '../redux';
// import combineReducer from '../redux';

const store = configureStore({
  reducer: combineReducer,
  //code for serialization
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
