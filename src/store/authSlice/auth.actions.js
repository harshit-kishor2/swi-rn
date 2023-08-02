//! ======================== Redux : Async Thunk Actions ============================

import {SharedPreference} from '@app/helper';
import axiosRequest from '@app/helper/axiosRequest';
import {createAsyncThunk} from '@reduxjs/toolkit';

/**
 * Api Action
 */
export const stayLoginAction = createAsyncThunk(
  `auth/stayLoginAction`,
  async (params, thunkAPI) => {
    try {
      let response = await SharedPreference.getItem(
        SharedPreference.keys.IS_AUTHENTICATE,
        'false',
      );
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
export const userSigninAction = createAsyncThunk(
  `auth/userSigninAction`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `/login`,
        method: 'POST',
        data: params,
      });
      SharedPreference.setItem(
        SharedPreference.keys.TOKEN,
        response?.data?.token,
      );

      if (response.data?.isProfileCompleted !== 'no') {
        SharedPreference.setItem(SharedPreference.keys.IS_AUTHENTICATE, 'true');
      }
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
export const userSignupAction = createAsyncThunk(
  `auth/userSignupAction`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `/register`,
        method: 'POST',
        data: params,
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
export const forgotPasswordAction = createAsyncThunk(
  `auth/forgotPasswordAction`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `/forgot-password`,
        method: 'POST',
        data: params,
        params: {type: 'user'},
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
export const logoutAction = createAsyncThunk(
  `auth/logoutAction`,
  async (params, thunkAPI) => {
    try {
      // const response = await axiosRequest({
      //   url: `/forgot-password`,
      //   method: 'POST',
      //   data: params,
      // });
      SharedPreference.multiRemove([
        SharedPreference.keys.IS_AUTHENTICATE,
        SharedPreference.keys.TOKEN,
      ]);
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);

export const userProfile = createAsyncThunk(
  'auth/userProfile',
  async (val, thunkAPI) => {
    try {
      const result = await axiosRequest({
        url: '/user-profile',
        method: 'GET',
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
export const updateProfileAction = createAsyncThunk(
  `auth/updateProfileAction`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `update-profile`,
        method: 'POST',
        data: params,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      SharedPreference.setItem(SharedPreference.keys.IS_AUTHENTICATE, 'true');
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);
