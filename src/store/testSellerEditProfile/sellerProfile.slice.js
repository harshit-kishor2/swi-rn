const {createEntityAdapter, createSlice} = require('@reduxjs/toolkit');
const {
  updateSellerProfile,
  getSellerProfile,
} = require('./sellerProfileEdit.action');
const {LoadingStatus} = require('@app/helper/strings');

const SLICE_FEATURE_KEY = 'updateSellerProfile';

const entityAdapter = createEntityAdapter();

const initialState = entityAdapter.getInitialState({
  getSellerProfileLoadingStatus: LoadingStatus.NOT_LOADED,
  getSellerProfile: [],
  getSellerProfileError: null,
  updateSellerProfileLoadingStatus: LoadingStatus.NOT_LOADED,
  updateSellerProfile: [],
  updateSellerProfileError: null,
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

      .addCase(getSellerProfile.pending, state => {
        state.getSellerProfileLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getSellerProfile.fulfilled, (state, action) => {
        state.getSellerProfileLoadingStatus = LoadingStatus.LOADED;
        state.getSellerProfile = action.payload?.data;
      })
      .addCase(getSellerProfile.rejected, (state, action) => {
        state.getSellerProfileLoadingStatus = LoadingStatus.FAILED;
      })

      .addCase(updateSellerProfile.pending, state => {
        state.updateSellerProfileLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(updateSellerProfile.fulfilled, (state, action) => {
        state.updateSellerProfileLoadingStatus = LoadingStatus.LOADED;
        state.updateSellerProfile = action.payload?.data;
      })
      .addCase(updateSellerProfile.rejected, (state, action) => {
        state.updateSellerProfileLoadingStatus = LoadingStatus.FAILED;
      });
  },
});

export const {resetSliceState} = reduxSlice.actions;
export const updateSellerProfileReducer = reduxSlice.reducer;
// export const getSellerProfileReducer = reduxSlice.reducer;
