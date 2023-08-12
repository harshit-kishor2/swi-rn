import {AxiosRequest} from '@app/helper';
import {createAsyncThunk} from '@reduxjs/toolkit';

//! ======================== Redux : Async Thunk Actions ============================

/**
 * Api Action
 */
export const sellerProductListingAction = createAsyncThunk(
  'profileSection/sellerProductListingAction',
  async (params, thunkAPI) => {
    try {
      const result = await AxiosRequest({
        url: `/seller-products/${params.userId}`,
        method: 'GET',
        params: params,
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);

/**
 * Api Action
 */
export const profileAboutAction = createAsyncThunk(
  'profileSection/profileAboutAction',
  async (params, thunkAPI) => {
    try {
      const result = await AxiosRequest({
        url: `/user-profile`,
        method: 'GET',
        params: params, //userId
      });
      console.log('TTTTTTTTTTTTTTTTT', result);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);

export const coinHistoryAction = createAsyncThunk(
  'profileSection/coinHistoryAction',
  async (params, thunkAPI) => {
    try {
      const result = await AxiosRequest({
        url: `/coins-history`,
        method: 'GET',
        params: params,
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);

export const changeProductStatusAction = createAsyncThunk(
  'profileSection/changeProductStatusAction',
  async (params, thunkAPI) => {
    try {
      const result = await AxiosRequest({
        url: `product-status/${params?.product_id}`,
        method: 'GET',
        params: {product_status: params?.product_status},
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);
