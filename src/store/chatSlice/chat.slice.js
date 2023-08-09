import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {
  getChatHistoryAction,
  getChatListAction,
  sendMessageAction,
  socketJoinAction,
} from './chat.action';
import {LoadingStatus} from '../../helper/strings';
import {addObjectAndUpdate} from '@app/helper/commonFunction';

// =============================== Redux : Test Slice ==================================

const SLICE_FEATURE_KEY = 'chat';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
  chatListLoadingStatus: LoadingStatus.NOT_LOADED,
  chatList: [],

  chatHistoryLoadingStatus: LoadingStatus.NOT_LOADED,
  chatHistory: [],

  sendMessageLoadingStatus: LoadingStatus.NOT_LOADED,
  sendMessage: null,

  socketJoinLoadingStatus: LoadingStatus.NOT_LOADED,
  socketJoin: null,
});

/**
 * Slice for all reducres
 */
const reduxSlice = createSlice({
  name: SLICE_FEATURE_KEY,
  initialState: initialState,
  reducers: {
    resetChatSliceState: (state, action) => {
      return {
        ...initialState,
      };
    },
    onNewMessageUpdate: (state, action) => {
      state.chatHistory = addObjectAndUpdate(state.chatHistory, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getChatListAction.pending, state => {
        state.chatListLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getChatListAction.fulfilled, (state, action) => {
        state.chatListLoadingStatus = LoadingStatus.LOADED;
        state.chatList = action.payload?.data;
      })
      .addCase(getChatListAction.rejected, (state, action) => {
        state.chatListLoadingStatus = LoadingStatus.FAILED;
      })
      .addCase(getChatHistoryAction.pending, state => {
        state.chatHistoryLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getChatHistoryAction.fulfilled, (state, action) => {
        state.chatHistoryLoadingStatus = LoadingStatus.LOADED;
        state.chatHistory = action.payload?.data;
      })
      .addCase(getChatHistoryAction.rejected, (state, action) => {
        state.chatHistoryLoadingStatus = LoadingStatus.FAILED;
      })
      .addCase(socketJoinAction.pending, state => {
        state.socketJoinLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(socketJoinAction.fulfilled, (state, action) => {
        state.socketJoinLoadingStatus = LoadingStatus.LOADED;
      })
      .addCase(socketJoinAction.rejected, (state, action) => {
        state.socketJoinLoadingStatus = LoadingStatus.FAILED;
      })
      .addCase(sendMessageAction.pending, state => {
        state.sendMessageLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(sendMessageAction.fulfilled, (state, action) => {
        state.sendMessageLoadingStatus = LoadingStatus.LOADED;
        state.sendMessage = action.payload?.data;
      })
      .addCase(sendMessageAction.rejected, (state, action) => {
        state.sendMessageLoadingStatus = LoadingStatus.FAILED;
      });
  },
});

/*
 * Export reducer for store configuration.
 */

export const {resetChatSliceState, onNewMessageUpdate} = reduxSlice.actions;

export const chatReducer = reduxSlice.reducer;
