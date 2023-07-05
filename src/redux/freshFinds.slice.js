import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../services/api'; // assuming you have an API utility file
import {Config} from '../helper/config';

const initialState = {
  freshFindsProducts: [],
  freshFindsProductsLoading: false,
  freshFindsProductserror: null,
};

export const fetchFreshFinds = createAsyncThunk(
  'explore/fetchFreshFinds',
  async (_, thunkAPI) => {
    try {
      const response = await api({
        url: `${Config.API_URL}products-list-fresh`,
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      console.log('Fresh finds', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const freshFindsSlice = createSlice({
  name: 'freshFinds',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFreshFinds.pending, state => {
        state.freshFindsProductsLoading = true;
        state.freshFindsProductserror = null;
      })
      .addCase(fetchFreshFinds.fulfilled, (state, action) => {
        state.freshFindsProductsLoading = false;
        state.freshFindsProducts = action?.payload?.data;
      })
      .addCase(fetchFreshFinds.rejected, (state, action) => {
        state.freshFindsProductsLoading = false;
        state.freshFindsProductserror = action.payload;
      });
  },
});

export const freshFindsActions = freshFindsSlice.actions;

export default freshFindsSlice.reducer;
