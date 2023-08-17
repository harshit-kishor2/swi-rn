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
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
export const getInteresteListOnChat = createAsyncThunk(
  'chat/getInteresteListOnChat',
  async (val, thunkAPI) => {
    try {
      const result = await axiosRequest({
        url: '/interest-list',
        method: 'GET',
        params: val, //- ?seller_id=36&user_id=5&keyword=test
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
export const addIntersetListOnChat = createAsyncThunk(
  'chat/addIntersetListOnChat',
  async (val, thunkAPI) => {
    try {
      const result = await axiosRequest({
        url: 'interest-list',
        method: 'POST',
        params: val, //- ?seller_id=36&user_id=5&all_selected=_2,149_1,152_4&selected[0]=152_4&selected[1]=155_&keyword=test
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
export const addDraftInInterestListAction = createAsyncThunk(
  'chat/addDraftInInterestListAction',
  async (val, thunkAPI) => {
    try {
      const result = await axiosRequest({
        url: '/add-draft-interest',
        method: 'POST',
        data: val, //- ?seller_id=36&user_id=7&brand_id=3&model_id=18&condition=pre_owned
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
export const chatUserDetailAction = createAsyncThunk(
  'profileSection/chatUserDetailAction',
  async (params, thunkAPI) => {
    try {
      const result = await axiosRequest({
        url: `/user-profile`,
        method: 'GET',
        params: params, //userId
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);
