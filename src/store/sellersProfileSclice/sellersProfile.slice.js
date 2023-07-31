import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {apiAction} from './actions';
import {LoadingStatus} from '../../helper/strings';
import { sellerProductListingAction} from "../sellersProfileSclice/sellersProfile.action"

// =============================== Redux : Test Slice ==================================

const SLICE_FEATURE_KEY = 'sellersProfile';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
  sellerProductListingActionLoadingStatus: LoadingStatus.NOT_LOADED,
  sellerProductListingAction: [],
  sellerProductListingActionError: null,
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

    //product Details
      .addCase(sellerProductListingAction.pending, state => {
        state.sellerProductListingActionLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(sellerProductListingAction.fulfilled, (state, action) => {
        state.sellerProductListingActionLoadingStatus = LoadingStatus.LOADED;
        state.sellerProductListingAction = action.payload;
      })
      .addCase(sellerProductListingAction.rejected, (state, action) => {
        state.sellerProductListingAction = LoadingStatus.FAILED;
        state.sellerProductListingActionError= action.payload;
      });
  },
});

/*
 * Export reducer for store configuration.
 */

export const {resetSliceState} = reduxSlice.actions;

export const sellersProfileReducer = reduxSlice.reducer;
