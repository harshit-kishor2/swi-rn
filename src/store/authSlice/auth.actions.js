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

/**
 * Api Action
 */
export const changePasswordAction = createAsyncThunk(
  `auth/changePasswordAction`,
  async (params, thunkAPI) => {
    console.log(params, 'params action=====');
    try {
      const response = await axiosRequest({
        url: `/change-password`,
        method: 'POST',
        data: params,
        // params: {type: 'user'},
      });
      console.log(response, 'response===========');
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);
/**
 * Api Action GET Notification Permission
 */
export const getNotificationPermission = createAsyncThunk(
  `auth/getNotificationPermission`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `/get-notification-status`,
        method: 'GET',
        // data: params,
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
 * Api Action Update Notification Permission
 */

export const updateNotificationPermission = createAsyncThunk(
  `auth/updateNotificationPermission`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `/update-notification-status`,
        method: 'POST',
        data: params,
      });
      console.log(response, 'response from update notification');
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);
/**
 * Api Action Update Notification Listing
 */

export const UpdateNotificationStatus = createAsyncThunk(
  `auth/UpdateNotificationStatus`,
  async (params, thunkAPI) => {
    console.log('params id=============', params?.id);
    try {
      const response = await axiosRequest({
        url: `/update-notification-read-status/${params.id}`,
        method: 'GET',
        // data: params,
      });
      console.log(response, 'response from update notification');
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
        console.log('error==============', error),
      );
    }
  },
);
export const NotificationListing = createAsyncThunk(
  `auth/NotificationListing`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `/get-user-notification-list`,
        method: 'GET',
        // data: params,
      });
      console.log(response, 'response from update notification');
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.message,
      );
    }
  },
);
