import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';

import {LoadingStatus} from '@app/helper/strings';
import {
  addWishListAction,
  freshFindsAction,
  getBannerAction,
  getBrandListingAction,
  getProductChartAction,
  getProductDetailsAction,
  getTopNotchWatchAction,
  getTrendyWatchAction,
} from './exploreProduct.action';

// =============================== Redux : Test Slice ==================================

const SLICE_FEATURE_KEY = 'exploreProduct';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
  freshFindLoadingStatus: LoadingStatus.NOT_LOADED,
  freshFinds: [],
  freshFindsError: null,

  bannerListLoadingStatus: LoadingStatus.NOT_LOADED,
  bannerList: [],
  bannerListError: null,

  trendyWatchesLoadingStatus: LoadingStatus.NOT_LOADED,
  trendyWatches: [],
  trendyWatchesError: null,

  topNotchWatchLoadingStatus: LoadingStatus.NOT_LOADED,
  topNotchWatch: [],
  isLoadMore: false,
  topNotchWatchError: null,

  productDetailsLoadingStatus: LoadingStatus.NOT_LOADED,
  productDetails: null,
  productDetailsError: null,

  productChartLoadingStatus: LoadingStatus.NOT_LOADED,
  productChart: null,
  productChartError: null,

  brandListLoadingStatus: LoadingStatus.NOT_LOADED,
  brandList: null,
  brandListError: null,

  addWishListLoadingStatus: LoadingStatus.NOT_LOADED,
  addWishListError: null,
});

/**
 * Slice for all reducres
 */
const reduxSlice = createSlice({
  name: SLICE_FEATURE_KEY,
  initialState: initialState,
  reducers: {
    resetSliceState: (state, action) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: builder => {
    builder
      // Fresh Find
      .addCase(freshFindsAction.pending, state => {
        state.freshFindLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(freshFindsAction.fulfilled, (state, action) => {
        state.freshFindLoadingStatus = LoadingStatus.LOADED;
        state.freshFinds = action.payload?.data;
      })
      .addCase(freshFindsAction.rejected, (state, action) => {
        state.freshFindLoadingStatus = LoadingStatus.FAILED;
        state.freshFindsError = action.payload;
      })
      // Banner List
      .addCase(getBannerAction.pending, state => {
        state.bannerListLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getBannerAction.fulfilled, (state, action) => {
        state.bannerListLoadingStatus = LoadingStatus.LOADED;
        state.bannerList = action.payload?.data;
      })
      .addCase(getBannerAction.rejected, (state, action) => {
        state.bannerListLoadingStatus = LoadingStatus.FAILED;
        state.bannerListError = action.payload;
      })
      // Trendy Watch
      .addCase(getTrendyWatchAction.pending, state => {
        state.trendyWatchesLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getTrendyWatchAction.fulfilled, (state, action) => {
        state.trendyWatchesLoadingStatus = LoadingStatus.LOADED;
        state.trendyWatches = action.payload?.data;
      })
      .addCase(getTrendyWatchAction.rejected, (state, action) => {
        state.trendyWatchesLoadingStatus = LoadingStatus.FAILED;
        state.trendyWatchesError = action.payload;
      })
      // Top Notch Watch
      .addCase(getTopNotchWatchAction.pending, state => {
        state.topNotchWatchLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getTopNotchWatchAction.fulfilled, (state, action) => {
        state.topNotchWatchLoadingStatus = LoadingStatus.LOADED;
        if (action.payload?.data?.next_page_url) {
          state.isLoadMore = true;
        } else {
          state.isLoadMore = false;
        }
        state.topNotchWatch = action.payload?.data?.data;
      })
      .addCase(getTopNotchWatchAction.rejected, (state, action) => {
        state.topNotchWatchLoadingStatus = LoadingStatus.FAILED;
        state.topNotchWatchError = action.payload;
      })
      // Product details
      .addCase(getProductDetailsAction.pending, state => {
        state.productDetailsLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getProductDetailsAction.fulfilled, (state, action) => {
        state.productDetailsLoadingStatus = LoadingStatus.LOADED;
        state.productDetails = action.payload?.data;
      })
      .addCase(getProductDetailsAction.rejected, (state, action) => {
        state.productDetailsLoadingStatus = LoadingStatus.FAILED;
        state.productDetailsError = action.payload;
      })

      // product chart
      .addCase(getProductChartAction.pending, state => {
        state.productChartLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getProductChartAction.fulfilled, (state, action) => {
        state.productChartLoadingStatus = LoadingStatus.LOADED;
        state.productChart = action.payload?.data;
      })
      .addCase(getProductChartAction.rejected, (state, action) => {
        state.productChartLoadingStatus = LoadingStatus.FAILED;
        state.productChartError = action.payload;
      })

      // Add wishlist
      .addCase(addWishListAction.pending, state => {
        state.addWishListLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(addWishListAction.fulfilled, (state, action) => {
        state.addWishListLoadingStatus = LoadingStatus.LOADED;
      })
      .addCase(addWishListAction.rejected, (state, action) => {
        state.addWishListLoadingStatus = LoadingStatus.FAILED;
        state.addWishListError = action.payload;
      })
      // Brand List
      .addCase(getBrandListingAction.pending, state => {
        state.brandListLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getBrandListingAction.fulfilled, (state, action) => {
        state.brandListLoadingStatus = LoadingStatus.LOADED;
        state.brandList = action.payload?.data;
      })
      .addCase(getBrandListingAction.rejected, (state, action) => {
        state.brandListLoadingStatus = LoadingStatus.FAILED;
        state.brandListError = action.payload;
      });
  },
});

/*
 * Export reducer for store configuration.
 */

export const {resetSliceState} = reduxSlice.actions;

export const exploreProductReducer = reduxSlice.reducer;
