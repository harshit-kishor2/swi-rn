import {combineReducers} from '@reduxjs/toolkit';
import {AuthReducer} from './auth.slice';
import {exploreReducer} from './explore.slice';
import {freshFindsReducer} from './freshFinds.slice';
import {addProductReducer} from './addProduct.slice';

const combineReducer = combineReducers({
  AuthReducer,
  exploreReducer,
  freshFindsReducer,
  addProductReducer,
});

export default combineReducer;
