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

/**
 * Api Action
 */
export const getBannerAction = createAsyncThunk(
  `exploreProduct/getBannerAction`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `/banner-list`,
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

/**
 * Api Action
 */
export const getTrendyWatchAction = createAsyncThunk(
  `exploreProduct/getTrendyWatchAction`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `/products-list-top`,
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

/**
 * Api Action
 */
export const getProductDetailsAction = createAsyncThunk(
  `exploreProduct/getProductDetailsAction`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `/product-details/${params?.product_id}`,
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

/**
 * Api Action
 */
export const getProductChartAction = createAsyncThunk(
  `exploreProduct/getProductChartAction`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `/products-chart`,
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

/**
 * Api Action
 */
export const getBrandListingAction = createAsyncThunk(
  `exploreProduct/getBrandListingAction`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `/brand-list`,
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

/**
 * Api Action
 */
export const getTopNotchWatchAction = createAsyncThunk(
  `exploreProduct/getTopNotchWatchAction`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `/products-list`,
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

/**
 * Api Action
 */
export const addWishListAction = createAsyncThunk(
  `exploreProduct/addWishListAction`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `add-wishlist/${params?.product_id}`,
        method: 'POST',
        // params: params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);
