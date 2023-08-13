import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';

import {LoadingStatus} from '@app/helper/strings';
import {
  addPriceAlert,
  addWishListAction,
  freshFindsAction,
  freshFindsSearchingAction,
  getBannerAction,
  getBrandListingAction,
  getProductChartAction,
  getProductDetailsAction,
  getTopNotchWatchAction,
  getTopNotchWatchSearchingAction,
  getTrendyWatchAction,
  productInsights,
  removePriceAlert,
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

  freshFindSearchingLoadingStatus: LoadingStatus.NOT_LOADED,
  freshFindsSearching: [],
  freshFindsSearchingError: null,

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

  topNotchWatchSearchingLoadingStatus: LoadingStatus.NOT_LOADED,
  topNotchWatchSearching: [],

  topNotchWatchSearchingError: null,

  productDetailsLoadingStatus: LoadingStatus.NOT_LOADED,
  productDetails: null,
  productDetailsError: null,

  productChartLoadingStatus: LoadingStatus.NOT_LOADED,
  productChart: null,
  productChartError: null,

  brandListLoadingStatus: LoadingStatus.NOT_LOADED,
  brandList: [],
  brandListError: null,

  addWishListLoadingStatus: LoadingStatus.NOT_LOADED,
  addWishListError: null,

  productInsightsInfoLoadingStatus: LoadingStatus.NOT_LOADED,
  productInsightsInfo: [],
  productInsightsInfoError: null,

  priceAlertLoadingStatus: LoadingStatus.NOT_LOADED,
  priceAlert: {},
  priceAlertError: null,

  removePriceAlertLoadingStatus: LoadingStatus.NOT_LOADED,
  removePriceAlert: {},
  removePriceAlertError: null,
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
    resetserachstate: (state, action) => {
      return {
        ...state,
        topNotchWatchSearching: [],
      };
    },
    resetfreshFindsState: (state, action) => {
      return {
        ...state,
        freshFindsSearching: [],
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
      })
      .addCase(getTopNotchWatchSearchingAction.pending, state => {
        state.topNotchWatchSearchingLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getTopNotchWatchSearchingAction.fulfilled, (state, action) => {
        state.topNotchWatchSearchingLoadingStatus = LoadingStatus.LOADED;
        console.log(action?.payload?.data?.data, 'dfghjkhhn');
        state.topNotchWatchSearching = action?.payload?.data?.data;
      })
      .addCase(getTopNotchWatchSearchingAction.rejected, (state, action) => {
        state.topNotchWatchSearchingError = LoadingStatus.FAILED;
        state.topNotchWatchError = action.payload;
      })
      .addCase(freshFindsSearchingAction.pending, state => {
        state.freshFindSearchingLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(freshFindsSearchingAction.fulfilled, (state, action) => {
        (state.freshFindSearchingLoadingStatus = LoadingStatus.LOADED),
          console.log(action.payload.data, '^^^^^^^^^^^^^^^^^^^^^^^^^^^');
        state.freshFindsSearching = action.payload.data;
      })
      .addCase(freshFindsSearchingAction.rejected, (state, action) => {
        state.freshFindSearchingLoadingStatus = LoadingStatus.FAILED;
        state.freshFindsSearchingError = action.payload;
      })
      .addCase(productInsights.pending, state => {
        state.productInsightsInfoLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(productInsights.fulfilled, (state, action) => {
        (state.productInsightsInfoLoadingStatus = LoadingStatus.LOADED),
          (state.productInsightsInfo = action.payload.data);
      })
      .addCase(productInsights.rejected, (state, action) => {
        state.productInsightsInfoLoadingStatus = LoadingStatus.FAILED;
        state.productInsightsInfoError = action.payload;
      })
      .addCase(addPriceAlert.pending, state => {
        state.priceAlertLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(addPriceAlert.fulfilled, (state, action) => {
        (state.priceAlertLoadingStatus = LoadingStatus.LOADED),
          (state.priceAlert = action.payload.data);
      })
      .addCase(addPriceAlert.rejected, (state, action) => {
        state.priceAlertLoadingStatus = LoadingStatus.FAILED;
        state.priceAlertError = action.payload;
      })
      .addCase(removePriceAlert.pending, state => {
        state.removePriceAlertLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(removePriceAlert.fulfilled, (state, action) => {
        (state.removePriceAlertLoadingStatus = LoadingStatus.LOADED),
          (state.removePriceAlert = action.payload.data);
      })
      .addCase(removePriceAlert.rejected, (state, action) => {
        state.removePriceAlertLoadingStatus = LoadingStatus.FAILED;
        state.removePriceAlertError = action.payload;
      });
  },
});

/*
 * Export reducer for store configuration.
 */

export const {resetSliceState, resetserachstate, resetfreshFindsState} =
  reduxSlice.actions;

export const exploreProductReducer = reduxSlice.reducer;
