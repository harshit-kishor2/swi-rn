import axiosRequest from '@app/helper/axiosRequest';
import {createAsyncThunk} from '@reduxjs/toolkit';

//! ======================== Redux : Async Thunk Actions ============================

/**
 * Api Action
 */
export const getChatListAction = createAsyncThunk(
  'chat/getChatListAction',
  async (val, thunkAPI) => {
    try {
      const result = await axiosRequest({
        url: '/friends-list',
        method: 'GET',
        params: val,
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
export const getChatHistoryAction = createAsyncThunk(
  'chat/getChatHistoryAction',
  async (val, thunkAPI) => {
    try {
      const result = await axiosRequest({
        url: '/chat-detail',
        method: 'GET',
        params: val,
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
export const socketJoinAction = createAsyncThunk(
  'chat/soccketJoinAction',
  async (val, thunkAPI) => {
    try {
      const result = await axiosRequest({
        url: '/join',
        method: 'POST',
        data: val,
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
export const sendMessageAction = createAsyncThunk(
  'chat/sendMessageAction',
  async (val, thunkAPI) => {
    try {
      const result = await axiosRequest({
        url: '/send-message',
        method: 'POST',
        data: val,
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);
