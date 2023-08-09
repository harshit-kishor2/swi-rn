import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {apiAction} from './actions';
import {LoadingStatus} from '../../helper/strings';

// =============================== Redux : Test Slice ==================================

const SLICE_FEATURE_KEY = 'boostProductSlice';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
  boostProductData: null,
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
});

/*
 * Export reducer for store configuration.
 */

export const {resetBoostProductSliceState} = reduxSlice.actions;

export const boostProductReducer = reduxSlice.reducer;
