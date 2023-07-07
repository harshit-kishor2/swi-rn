import {combineReducers} from '@reduxjs/toolkit';
import {AuthReducer} from './auth.slice';
import {exploreReducer} from './explore.slice';
import frehFindsReducer from './freshFinds.slice';
import {addProductReducer} from './addProduct.slice';

const combineReducer = combineReducers({
  AuthReducer,
  exploreReducer,
  frehFindsReducer,
  addProductReducer,
});

export default combineReducer;
