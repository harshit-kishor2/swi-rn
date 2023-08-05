const { createEntityAdapter, createSlice } = require("@reduxjs/toolkit");
const { updateSellerProfile } = require("./sellerProfileEdit.action");
const { LoadingStatus } = require("@app/helper/strings");

const SLICE_FEATURE_KEY = 'updateSellerProfile';

const entityAdapter = createEntityAdapter();

const initialState = entityAdapter.getInitialState({
    getSellerProfileLoadingStatus: LoadingStatus.NOT_LOADED,
    getSellerProfile: [],
    getSellerProfileError: null,
});

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
            .addCase(updateSellerProfile.pending, state => {
                state.getSellerProfileLoadingStatus = LoadingStatus.LOADING;
            })
            .addCase(updateSellerProfile.fulfilled, (state, action) => {
                state.getSellerProfileLoadingStatus = LoadingStatus.LOADED;
                state.getSellerProfile = action.payload?.data;
            })
            .addCase(updateSellerProfile.rejected, (state, action) => {
                state.getSellerProfileLoadingStatus = LoadingStatus.FAILED;
            })
    }
});

export const { resetSliceState } = reduxSlice.actions;
export const editSellerProfile = reduxSlice.reducer; 