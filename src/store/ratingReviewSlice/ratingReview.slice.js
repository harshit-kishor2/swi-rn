import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { apiAction } from './actions';
import { LoadingStatus } from '../../helper/strings';
import { ratingReviewAction } from './ratingReview.action';

// =============================== Redux : Test Slice ==================================

const SLICE_FEATURE_KEY = 'reviewRating';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
    ratingReviewActionLoadingStatus: LoadingStatus.NOT_LOADED,
    ratingReviewAction: [],
    ratingReviewActionError: null,
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
            .addCase(ratingReviewAction.pending, state => {
                state.ratingReviewActionLoadingStatus = LoadingStatus.LOADING;
            })
            .addCase(ratingReviewAction.fulfilled, (state, action) => {
                state.ratingReviewActionLoadingStatus = LoadingStatus.LOADED;
                state.ratingReviewAction = action.payload;
            })
            .addCase(ratingReviewAction.rejected, (state, action) => {
                state.ratingReviewAction = LoadingStatus.FAILED;
                state.ratingReviewActionError = action.payload;
            });

    },
});

/*
 * Export reducer for store configuration.
 */

export const { resetSliceState } = reduxSlice.actions;

export const ratingReviewReducer = reduxSlice.reducer;












