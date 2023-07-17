import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';

import {LoadingStatus} from '@app/helper/strings';
import {freshFindsAction} from './exploreProduct.action';

// =============================== Redux : Test Slice ==================================

const SLICE_FEATURE_KEY = 'exploreProduct';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
  freshFindLoadingStatus: LoadingStatus.NOT_LOADED,
  freshFinds: [],
  freshFindsError: null,
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
      });
  },
});

/*
 * Export reducer for store configuration.
 */

export const {resetSliceState} = reduxSlice.actions;

export const exploreProductReducer = reduxSlice.reducer;
