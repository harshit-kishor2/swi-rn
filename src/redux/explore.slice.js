import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Config} from '../helper/config';
import api from '../services/api';
import {loadingStatus} from '../helper/constants/enum';

const initialState = {
  products: [],
  loading: loadingStatus.NOT_LOADED,
  error: null,
};

//  exploreProducts API
// -----------------------------
export const exploreProductListing = createAsyncThunk(
  'explore/Products',
  async (_, thunkAPI) => {
    try {
      const response = await api({
        url: `${Config.API_URL}products-list`,
        method: 'GET',

        headers: {
          Accept: 'application/json',
        },
      });
      console.log('Explore Product Listing', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const exploreSlice = createSlice({
  name: 'exploreSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(exploreProductListing.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(exploreProductListing.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.products = action.payload;
      })
      .addCase(exploreProductListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {actions: exploreActions, reducer: exploreReducer} = exploreSlice;
export default exploreSlice.reducer;
