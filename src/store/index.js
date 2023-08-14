import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import {AuthReducer} from './auth.slice';
import SharedPreference from '../helper/SharedPreference';
import authReducer from './authSlice';
import exploreProductReducer, {
  addToCompareReducer,
} from './exploreProductSlice';
import exploreReducer from './explore.slice';
import { productReducer, productStateReducer } from './productSlice';
import sellersProfileReducer from './sellersProfileSclice';
import wishlistReducer from './wishlistSlice';
import chatReducer from './chatSlice';
import profileSectionReducer from './profileSectionSlice';
import { updateSellerProfileReducer } from './testSellerEditProfile';
import ratingReviewReducer from './ratingReviewSlice';
import { boostProductReducer } from './exploreProductSlice/boostProduct.slice';

const combinedReducer = combineReducers({
  authReducer,
  exploreProductReducer,
  productReducer,
  productStateReducer,
  exploreReducer,
  profileSectionReducer,

  addToCompareReducer,
  sellersProfileReducer,
  wishlistReducer,
  chatReducer,
  updateSellerProfileReducer,
  ratingReviewReducer,
  boostProductReducer,

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
