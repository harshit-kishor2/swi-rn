import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {
  addDraftInInterestListAction,
  addIntersetListOnChat,
  chatUserDetailAction,
  getChatHistoryAction,
  getChatListAction,
  getInteresteListOnChat,
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

  getIntersetListLoadingStatus: LoadingStatus.NOT_LOADED,
  getIntersetList: [],

  addInIntersetListLoadingStatus: LoadingStatus.NOT_LOADED,
  addInIntersetList: null,

  addDraftInIntersetListLoadingStatus: LoadingStatus.NOT_LOADED,
  addDraftInInterset: null,

  chatUserDetailLoadingStatus: LoadingStatus.NOT_LOADED,
  chatUserDetail: null,
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
      })

      .addCase(getInteresteListOnChat.pending, state => {
        state.getIntersetListLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getInteresteListOnChat.fulfilled, (state, action) => {
        state.getIntersetListLoadingStatus = LoadingStatus.LOADED;
        state.getIntersetList = action.payload?.data;
      })
      .addCase(getInteresteListOnChat.rejected, (state, action) => {
        state.getIntersetListLoadingStatus = LoadingStatus.FAILED;
      })

      .addCase(addDraftInInterestListAction.pending, state => {
        state.getIntersetListLoadingStatus = LoadingStatus.NOT_LOADED;
        state.addDraftInIntersetListLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(addDraftInInterestListAction.fulfilled, (state, action) => {
        state.addDraftInIntersetListLoadingStatus = LoadingStatus.LOADED;
        state.addDraftInInterset = action.payload?.data;
      })
      .addCase(addDraftInInterestListAction.rejected, (state, action) => {
        state.addDraftInIntersetListLoadingStatus = LoadingStatus.FAILED;
      })

      .addCase(addIntersetListOnChat.pending, state => {
        state.getIntersetListLoadingStatus = LoadingStatus.NOT_LOADED;
        state.addInIntersetListLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(addIntersetListOnChat.fulfilled, (state, action) => {
        state.addInIntersetListLoadingStatus = LoadingStatus.LOADED;
        state.getIntersetList = action.payload?.data;
      })
      .addCase(addIntersetListOnChat.rejected, (state, action) => {
        state.addInIntersetListLoadingStatus = LoadingStatus.FAILED;
      })

      .addCase(chatUserDetailAction.pending, state => {
        state.chatUserDetailLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(chatUserDetailAction.fulfilled, (state, action) => {
        state.chatUserDetailLoadingStatus = LoadingStatus.LOADED;
        state.chatUserDetail = action.payload?.data;
      })
      .addCase(chatUserDetailAction.rejected, (state, action) => {
        state.chatUserDetailLoadingStatus = LoadingStatus.FAILED;
      });
  },
});

/*
 * Export reducer for store configuration.
 */

export const {resetChatSliceState, onNewMessageUpdate} = reduxSlice.actions;

export const chatReducer = reduxSlice.reducer;
