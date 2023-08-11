import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { apiAction } from './actions';
import { LoadingStatus } from '../../helper/strings';
import { RateUserAction, purchaseProductListingAction, ratingReviewAction, ratingReviewAsBuyerAction } from './ratingReview.action';

// =============================== Redux : Test Slice ==================================

const SLICE_FEATURE_KEY = 'reviewRating';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
    ratingReviewActionLoadingStatus: LoadingStatus.NOT_LOADED,
    ratingReviewAction: [],
    ratingReviewActionError: null,

    ratingReviewAsBuyerActionLoadingStatus: LoadingStatus.NOT_LOADED,
    ratingReviewAsBuyerAction: [],
    ratingReviewAsBuyerActionError: null,


    purchaseProductListingActionLoadingStatus: LoadingStatus.NOT_LOADED,
    purchaseProductListingAction: [],
    purchaseProductListingActionError: null,


    RateUserActionLoadingStatus: LoadingStatus.NOT_LOADED,
    RateUserAction: [],
    RateUserActionError: null,
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

            //rating review
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
            })

            //rating as buyer
            .addCase(ratingReviewAsBuyerAction.pending, state => {
                state.ratingReviewAsBuyerActionLoadingStatus = LoadingStatus.LOADING;
            })
            .addCase(ratingReviewAsBuyerAction.fulfilled, (state, action) => {
                state.ratingReviewAsBuyerActionLoadingStatus = LoadingStatus.LOADED;
                state.ratingReviewAsBuyerAction = action.payload;
            })
            .addCase(ratingReviewAsBuyerAction.rejected, (state, action) => {
                state.ratingReviewAsBuyerAction = LoadingStatus.FAILED;
                state.ratingReviewAsBuyerActionError = action.payload;
            })
            //Purchase Product Listing as buyer
            .addCase(purchaseProductListingAction.pending, state => {
                state.purchaseProductListingActionLoadingStatus = LoadingStatus.LOADING;

            })
            .addCase(purchaseProductListingAction.fulfilled, (state, action) => {
                state.purchaseProductListingActionLoadingStatus = LoadingStatus.LOADED;

                state.purchaseProductListingAction = action.payload;
            })
            .addCase(purchaseProductListingAction.rejected, (state, action) => {
                state.ratingReviewAsBuyerAction = LoadingStatus.FAILED;
                state.purchaseProductListingActionError = action.payload;

            })
            //Add rating
            .addCase(RateUserAction.pending, state => {
                state.RateUserActionLoadingStatus = LoadingStatus.LOADING;
                console.log("loading")
            })
            .addCase(RateUserAction.fulfilled, (state, action) => {
                state.RateUserActionLoadingStatus = LoadingStatus.LOADED;
                console.log("loaded")
                state.RateUserAction = action.payload;
            })
            .addCase(RateUserAction.rejected, (state, action) => {
                state.RateUserAction = LoadingStatus.FAILED;
                state.RateUserActionError = action.payload;
                console.log("Error")
            });

    },
});

/*
 * Export reducer for store configuration.
 */

export const { resetSliceState } = reduxSlice.actions;

export const ratingReviewReducer = reduxSlice.reducer;












