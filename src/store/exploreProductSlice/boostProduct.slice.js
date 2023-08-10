import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {apiAction} from './actions';
import {LoadingStatus} from '../../helper/strings';
import {boostProduct} from './boostProduct.action';

// =============================== Redux : Test Slice ==================================

const SLICE_FEATURE_KEY = 'boostProductSlice';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
  boostProductLoading: LoadingStatus.NOT_LOADED,
  boostProductData: {},
  boostProductError: null,
});

/**
 * Slice for all reducres
 */
const reduxSlice = createSlice({
  name: SLICE_FEATURE_KEY,
  initialState: initialState,
  reducers: {
    resetBoostProductSliceState: (state, action) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(boostProduct.pending, state => {
        state.boostProductLoading = LoadingStatus.LOADING;
      })
      .addCase(boostProduct.fulfilled, (state, action) => {
        console.log(action.payload, '===>>>boostProductActionPayload');
        state.boostProductLoading = LoadingStatus.LOADED;
        state.boostProductData = action.payload;
      })
      .addCase(boostProduct.rejected, (state, action) => {
        state.boostProductLoading = LoadingStatus.FAILED;
        state.boostProductError = action.payload;
      });
  },
});

/*
 * Export reducer for store configuration.
 */

export const {resetBoostProductSliceState} = reduxSlice.actions;

export const boostProductReducer = reduxSlice.reducer;
