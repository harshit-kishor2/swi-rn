import {combineReducers, configureStore} from '@reduxjs/toolkit';
// import {AuthReducer} from './auth.slice';
import {freshFindsReducer} from './freshFinds.slice';
import {addProductReducer} from './addProduct.slice';
import SharedPreference from '../helper/SharedPreference';
import authReducer from './authSlice';
import exploreProductReducer from './exploreProductSlice';

const combinedReducer = combineReducers({
  authReducer,
  exploreProductReducer,
  freshFindsReducer,
  addProductReducer,
});

const rootReducers = (state, action) => {
  if (action?.type === 'USER_LOGOUT') {
    console.log('401 Unauth');
    SharedPreference.clearAllData();
    state = undefined;
  }

  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducers,
  //code for serialization
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
