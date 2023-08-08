import axiosRequest from '@app/helper/axiosRequest';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {err} from 'react-native-svg/lib/typescript/xml';

export const updateSellerProfile = createAsyncThunk(
  `updateSellerProfile/updateSellerProfile`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `/update-profile`,
        method: `POST`,
      });
      console.log('=>>API>>>>>>>>>', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.method,
      );
    }
  },
);

export const getSellerProfile = createAsyncThunk(
  `getSellerProfile/getSellerProfile`,
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `/user-profile`,
        method: `GET`,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response ? error.response?.data : error?.method,
      );
    }
  },
);
