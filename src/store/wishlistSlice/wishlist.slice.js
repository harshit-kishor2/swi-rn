import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { apiAction } from './actions';
import { LoadingStatus } from '../../helper/strings';
import { InterestListAction, wishlistAction } from "./wishlist.action"

// =============================== Redux : Test Slice ==================================

const SLICE_FEATURE_KEY = 'wishlist';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
  wishlistActionLoadingStatus: LoadingStatus.NOT_LOADED,
  wishlistAction: [],
  wishlistActionError: null,
  InterestListActionLoadingStatus: LoadingStatus.NOT_LOADED,
  InterestListAction: [],
  InterestListActionError: null,
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

      //wishlist
      .addCase(wishlistAction.pending, state => {
        state.wishlistActionLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(wishlistAction.fulfilled, (state, action) => {
        state.wishlistActionLoadingStatus = LoadingStatus.LOADED;
        state.wishlistAction = action.payload;
      })
      .addCase(wishlistAction.rejected, (state, action) => {
        state.wishlistAction = LoadingStatus.FAILED;
        state.wishlistActionError = action.payload;
      })
      //Interest list
      .addCase(InterestListAction.pending, state => {
        state.InterestListActionLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(InterestListAction.fulfilled, (state, action) => {
        state.InterestListActionLoadingStatus = LoadingStatus.LOADED;
        state.InterestListAction = action.payload;
      })
      .addCase(InterestListAction.rejected, (state, action) => {
        state.InterestListAction = LoadingStatus.FAILED;
        state.InterestListActionError = action.payload;
      });
  },
});

/*
 * Export reducer for store configuration.
 */

export const { resetSliceState } = reduxSlice.actions;

export const wishlistReducer = reduxSlice.reducer;
