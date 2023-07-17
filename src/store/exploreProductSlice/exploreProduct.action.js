import axiosRequest from '@app/helper/axiosRequest';
import {createAsyncThunk} from '@reduxjs/toolkit';

//! ======================== Redux : Async Thunk Actions ============================

/**
 * Api Action
 */
export const freshFindsAction = createAsyncThunk(
  `exploreProduct/freshFindsAction`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `/products-list-fresh`,
        method: 'GET',
        params: params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);
