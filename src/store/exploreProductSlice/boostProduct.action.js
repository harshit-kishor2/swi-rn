import axiosRequest from '@app/helper/axiosRequest';
import {createAsyncThunk} from '@reduxjs/toolkit';

//! ======================== Redux : Async Thunk Actions ============================

/**
 * Api Action
 */
export const boostProduct = createAsyncThunk(
  'boostProduct/now',
  async (params, thunkAPI) => {
    console.log('boostNowProduct----->>>Params', params);
    try {
      const result = await axiosRequest({
        url: '/boost-product',
        method: 'POST',
        params: params,
      });
      console.log('boostNowProduct', result);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);
