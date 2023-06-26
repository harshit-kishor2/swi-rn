import {configureStore} from '@reduxjs/toolkit';
import combineReducer from '../redux';
// import combineReducer from '../redux';

const store = configureStore({reducer: combineReducer});
export default store;
