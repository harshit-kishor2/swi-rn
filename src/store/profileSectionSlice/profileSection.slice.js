import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {apiAction} from './actions';
import {LoadingStatus} from '../../helper/strings';
import {
  changeProductStatusAction,
  coinHistoryAction,
  onFollowClickAction,
  profileAboutAction,
  sellerProductListingAction,
} from './profileSection.action';

// =============================== Redux : Test Slice ==================================

const SLICE_FEATURE_KEY = 'profileSection';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
  sellerProductListingLoadingStatus: LoadingStatus.NOT_LOADED,
  sellerProductListing: [],
  sellerProductListingError: null,

  profileAboutLoadingStatus: LoadingStatus.NOT_LOADED,
  profileAbout: null,
  profileAboutError: null,

  coinHistoryLoadingStatus: LoadingStatus.NOT_LOADED,
  coinHistory: [],
  coinHistoryError: null,

  changeProductStatusLoadingStatus: LoadingStatus.NOT_LOADED,
  changeProductStatus: [],
  changeProductStatusError: null,

  followLoadingStatus: LoadingStatus.NOT_LOADED,
  followError: null,
});

/**
 * Slice for all reducres
 */
const reduxSlice = createSlice({
  name: SLICE_FEATURE_KEY,
  initialState: initialState,
  reducers: {
    resetProfileSectionSliceState: (state, action) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sellerProductListingAction.pending, state => {
        state.sellerProductListingLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(sellerProductListingAction.fulfilled, (state, action) => {
        state.sellerProductListingLoadingStatus = LoadingStatus.LOADED;
        state.sellerProductListing = action.payload?.data;
      })
      .addCase(sellerProductListingAction.rejected, (state, action) => {
        state.sellerProductListingLoadingStatus = LoadingStatus.FAILED;
        state.sellerProductListingError = action.payload;
      })
      .addCase(profileAboutAction.pending, state => {
        state.profileAboutLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(profileAboutAction.fulfilled, (state, action) => {
        state.profileAboutLoadingStatus = LoadingStatus.LOADED;
        state.profileAbout = action.payload?.data;
      })
      .addCase(profileAboutAction.rejected, (state, action) => {
        state.profileAboutLoadingStatus = LoadingStatus.FAILED;
        state.profileAboutError = action.payload;
      })
      .addCase(coinHistoryAction.pending, state => {
        state.coinHistoryLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(coinHistoryAction.fulfilled, (state, action) => {
        state.coinHistoryLoadingStatus = LoadingStatus.LOADED;
        state.coinHistory = action.payload?.data;
      })
      .addCase(coinHistoryAction.rejected, (state, action) => {
        state.coinHistoryLoadingStatus = LoadingStatus.FAILED;
        state.coinHistoryError = action.payload;
      })
      .addCase(changeProductStatusAction.pending, state => {
        state.changeProductStatusLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(changeProductStatusAction.fulfilled, (state, action) => {
        state.changeProductStatusLoadingStatus = LoadingStatus.LOADED;
        state.changeProductStatus = action.payload?.data;
      })
      .addCase(changeProductStatusAction.rejected, (state, action) => {
        state.changeProductStatusLoadingStatus = LoadingStatus.FAILED;
        state.changeProductStatusError = action.payload;
      })
      .addCase(onFollowClickAction.pending, state => {
        state.followLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(onFollowClickAction.fulfilled, (state, action) => {
        state.followLoadingStatus = LoadingStatus.LOADED;
        // state.changeProductStatus = action.payload?.data;
      })
      .addCase(onFollowClickAction.rejected, (state, action) => {
        state.followLoadingStatus = LoadingStatus.FAILED;
        state.followError = action.payload;
      });
  },
});

/*
 * Export reducer for store configuration.
 */

export const {resetProfileSectionSliceState} = reduxSlice.actions;

export const profileSectionReducer = reduxSlice.reducer;
