import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Config} from '../helper/config';
import api from '../services/api';
import {loadingStatus} from '../helper/constants/enum';
import {fire} from 'react-native-alertbox';

const initialState = {
  //states for explore product listing
  products: [],
  loading: loadingStatus.NOT_LOADED,
  error: null,
  // state for explore banner listing
  bannerLoading: loadingStatus.NOT_LOADED,
  bannerList: [],
  bannerListError: null,
  // state for trendy watches products
  trendyWatchesProducts: [],
  trendyWatchesProductsLoading: loadingStatus.NOT_LOADED,
  trendyWatchesProductsError: null,
  // state for product added in wishList
  productAddWishListLoading: loadingStatus.NOT_LOADED,
  productAddWishListError: null,
  productAddWishListData: {},
};

//  exploreProducts API

export const exploreProductListing = createAsyncThunk(
  'explore/Products',
  async ({page}, thunkAPI) => {
    console.log('page---- ', page);
    try {
      const response = await api({
        url: `${Config.API_URL}products-list`,
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        params: {
          page: page,
        },
      });
      console.log('Explore Product Listing', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
// Explore banner api
export const exploreBannerListing = createAsyncThunk(
  'explore/BannerList',
  async (_, thunkAPI) => {
    try {
      const response = await api({
        url: `${Config.API_URL}banner-list`,
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      console.log('Explore Banner Listing', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
// Explore trendy products api
export const exploreTrendyWatchesListing = createAsyncThunk(
  'explore/TrendyWatchesListing',
  async (_, thunkAPI) => {
    try {
      const response = await api({
        url: `${Config.API_URL}products-list-top`,
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      console.log('TrendyWatchesListing', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// product addition in wishlist
export const addWishlist = createAsyncThunk(
  'explore/addWishlist',
  async ({product_id, user_id}, thunkAPI) => {
    console.log('WishListadding---- ', product_id, user_id);
    try {
      const response = await api({
        url: `${Config.API_URL}add-wishlist`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        params: {
          product_id: product_id,
          user_id: user_id,
        },
      });
      console.log('product added in wishlist', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
const exploreSlice = createSlice({
  name: 'exploreSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(exploreProductListing.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(exploreProductListing.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.products = action?.payload;
        console.log('state.products', state.products);
      })
      .addCase(exploreProductListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      })
      .addCase(exploreBannerListing.pending, state => {
        state.bannerLoading = true;
      })
      .addCase(exploreBannerListing.fulfilled, (state, action) => {
        state.bannerLoading = false;
        console.log(action.payload, 'sdnns');
        state.bannerList = action?.payload;
      })
      .addCase(exploreBannerListing.rejected, (state, action) => {
        state.bannerLoading = false;
        state.bannerListError = action?.payload;
      })
      .addCase(exploreTrendyWatchesListing.pending, state => {
        state.trendyWatchesProductsLoading = true;
      })
      .addCase(exploreTrendyWatchesListing.fulfilled, (state, action) => {
        state.trendyWatchesProductsLoading = false;
        console.log(action.payload, 'Trendy watches');
        state.trendyWatchesProducts = action?.payload;
      })
      .addCase(exploreTrendyWatchesListing.rejected, (state, action) => {
        state.trendyWatchesProductsLoading = false;
        state.trendyWatchesProductsError = action?.payload;
      })
      .addCase(addWishlist.pending, state => {
        state.productAddWishListLoading = true;
      })
      .addCase(addWishlist.fulfilled, (state, action) => {
        state.productAddWishListLoading = false;
        console.log(action.payload, 'WISHLIST RESPONSE');
        state.productAddWishListData = action?.payload;
        fire({
          title: 'Product added in wishlist.',
          message: action.payload.message,
          actions: [
            {
              text: 'Ok',
              style: 'cancel',
            },
          ],
        });
      })
      .addCase(addWishlist.rejected, (state, action) => {
        state.productAddWishListLoading = false;
        state.productAddWishListError = action?.payload;
      });
  },
});
export const {actions: exploreActions, reducer: exploreReducer} = exploreSlice;
export default exploreSlice.reducer;
