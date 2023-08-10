import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import {
  forgotPasswordAction,
  logoutAction,
  stayLoginAction,
  updateProfileAction,
  userProfile,
  userSigninAction,
  userSignupAction,
  changePasswordAction
} from './auth.actions';
import { LoadingStatus, RoutesName } from '@app/helper/strings';
import NavigationService from '@app/navigations/NavigationService';

// =============================== Redux : Auth Slice ==================================

const SLICE_FEATURE_KEY = 'auth';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
  isAuthenticate: false,

  stayLoadingStatus: LoadingStatus.NOT_LOADED,
  stayError: null,

  signupLoadingStatus: LoadingStatus.NOT_LOADED,
  signupError: null,

  signinLoadingStatus: LoadingStatus.NOT_LOADED,
  signinError: null,
  userDetails: null,

  forgotPasswordLoadingStatus: LoadingStatus.NOT_LOADED,
  forgotPasswordError: null,

  changePasswordLoadingStatus: LoadingStatus.NOT_LOADED,
  changePasswordError: null,


  logoutLoadingStatus: LoadingStatus.NOT_LOADED,
  logoutError: null,

  userProfileLoadingStatus: LoadingStatus.NOT_LOADED,
  userProfileError: null,
  userProfileDetails: null,

  updateProfileLoadingStatus: LoadingStatus.NOT_LOADED,
  updateProfileError: null,
});

/**
 * Slice for all reducres
 */
const reduxSlice = createSlice({
  name: SLICE_FEATURE_KEY,
  initialState: initialState,
  reducers: {
    resetSliceState: (state, action) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: builder => {
    builder
      // Stay Login Action
      .addCase(stayLoginAction.fulfilled, (state, action) => {
        if (action.payload === 'true') {
          state.isAuthenticate = true;
        } else {
          state.isAuthenticate = false;
        }
      })
      // SignUp Action
      .addCase(userSignupAction.pending, (state, action) => {
        state.signupLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(userSignupAction.fulfilled, (state, action) => {
        state.signupLoadingStatus = LoadingStatus.LOADED;
        // state.userProfileDetails = action.payload?.data;
      })
      .addCase(userSignupAction.rejected, (state, action) => {
        state.signupLoadingStatus = LoadingStatus.FAILED;
        state.signupError = action.payload;
      })
      // Signin Action
      .addCase(userSigninAction.pending, (state, action) => {
        state.signinLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(userSigninAction.fulfilled, (state, action) => {
        state.signinLoadingStatus = LoadingStatus.LOADED;
        if (action.payload?.data?.isProfileCompleted === 'no') {
          state.userProfileDetails = action.payload.data;
          state.isAuthenticate = false;
        } else {
          state.userProfileDetails = action.payload.data;
          state.isAuthenticate = true;
        }
      })
      .addCase(userSigninAction.rejected, (state, action) => {
        state.signinLoadingStatus = LoadingStatus.FAILED;
        state.signinError = action.payload;
      })
      // Forgot password Action
      .addCase(forgotPasswordAction.pending, (state, action) => {
        state.forgotPasswordLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(forgotPasswordAction.fulfilled, (state, action) => {
        state.forgotPasswordLoadingStatus = LoadingStatus.LOADED;
      })
      .addCase(forgotPasswordAction.rejected, (state, action) => {
        state.forgotPasswordLoadingStatus = LoadingStatus.FAILED;
        state.forgotPasswordError = action.payload;
      })
      // Change password Action
      .addCase(changePasswordAction.pending, (state, action) => {
        state.changePasswordLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(changePasswordAction.fulfilled, (state, action) => {
        state.changePasswordLoadingStatus = LoadingStatus.LOADED;
      })
      .addCase(changePasswordAction.rejected, (state, action) => {
        state.changePasswordLoadingStatus = LoadingStatus.FAILED;
        state.changePasswordError = action.payload;
      })
      // logout  Action
      .addCase(logoutAction.pending, (state, action) => {
        state.logoutLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.logoutLoadingStatus = LoadingStatus.LOADED;
        state.isAuthenticate = false;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.logoutLoadingStatus = LoadingStatus.FAILED;
        state.logoutError = action.payload;
      })
      .addCase(userProfile.pending, (state, action) => {
        state.userProfileLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.userProfileLoadingStatus = LoadingStatus.LOADED;
        state.userProfileDetails = action.payload?.data;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.userProfileLoadingStatus = LoadingStatus.FAILED;
        state.userProfileError = action.payload;
      })
      .addCase(updateProfileAction.pending, (state, action) => {
        state.updateProfileLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(updateProfileAction.fulfilled, (state, action) => {
        state.updateProfileLoadingStatus = LoadingStatus.LOADED;
        state.userProfileDetails = action.payload.data;
        state.isAuthenticate = true;
      })
      .addCase(updateProfileAction.rejected, (state, action) => {
        state.updateProfileLoadingStatus = LoadingStatus.FAILED;
        state.updateProfileError = action.payload;
      });
  },
});

/*
 * Export reducer for store configuration.
 */

export const { resetSliceState } = reduxSlice.actions;

export const authReducer = reduxSlice.reducer;
