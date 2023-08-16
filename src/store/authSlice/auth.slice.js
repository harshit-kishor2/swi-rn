import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import {
  forgotPasswordAction,
  logoutAction,
  stayLoginAction,
  updateProfileAction,
  userProfile,
  userSigninAction,
  userSignupAction,
  changePasswordAction,
  getNotificationPermission,
  updateNotificationPermission,
  NotificationListing,
  UpdateNotificationStatus,
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

  // Notification Permission
  getNotificationPermissionLoadingStatus: LoadingStatus.NOT_LOADED,
  getNotificationDetails: null,
  getNotificationError: null,

  updateNotificationPermissionLoadingStatus: LoadingStatus.NOT_LOADED,
  updateNotificationDetails: null,
  updateNotificationError: null,

  //Notification Listing

  NotificationListingLoadingStatus: LoadingStatus.NOT_LOADED,
  NotificationListingError: null,
  NotificationListing: [],
  //Notification Status Update

  UpdateNotificationStatusLoadingStatus: LoadingStatus.NOT_LOADED,
  UpdateNotificationStatusError: null,
  UpdateNotificationStatus: [],
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
      })
      .addCase(getNotificationPermission.pending, (state, action) => {
        state.getNotificationPermissionLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getNotificationPermission.fulfilled, (state, action) => {
        state.getNotificationPermissionLoadingStatus = LoadingStatus.LOADED;
        state.getNotificationDetails = action.payload.data;
      })
      .addCase(getNotificationPermission.rejected, (state, action) => {
        state.getNotificationPermissionLoadingStatus = LoadingStatus.FAILED;
        state.getNotificationError = LoadingStatus.FAILED;
        state.getNotificationError = action.payload;
      })
      .addCase(updateNotificationPermission.pending, (state, action) => {
        state.updateProfileLoadingStatus == LoadingStatus.LOADING;
      })
      .addCase(updateNotificationPermission.fulfilled, (state, action) => {
        state.updateNotificationPermissionLoadingStatus = LoadingStatus.LOADED;
        state.updateNotificationDetails = action.payload.data;
      })
      .addCase(updateNotificationPermission.rejected, (state, action) => {
        state.updateNotificationPermissionLoadingStatus = LoadingStatus.FAILED;
        state.updateNotificationError = LoadingStatus.FAILED;
        state.updateNotificationError = action.payload;
      })
      // Notification Listing Action
      .addCase(NotificationListing.pending, (state, action) => {
        state.NotificationListingLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(NotificationListing.fulfilled, (state, action) => {
        state.NotificationListingLoadingStatus = LoadingStatus.LOADED;
        state.NotificationListing = action.payload;
      })
      .addCase(NotificationListing.rejected, (state, action) => {
        state.NotificationListingLoadingStatus = LoadingStatus.FAILED;
        state.NotificationListingError = action.payload;
      })
      // Notification Listing Action
      .addCase(UpdateNotificationStatus.pending, (state, action) => {
        state.UpdateNotificationStatusLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(UpdateNotificationStatus.fulfilled, (state, action) => {
        state.UpdateNotificationStatusLoadingStatus = LoadingStatus.LOADED;
        state.UpdateNotificationStatus = action.payload;
      })
      .addCase(UpdateNotificationStatus.rejected, (state, action) => {
        state.UpdateNotificationStatusLoadingStatus = LoadingStatus.FAILED;
        state.UpdateNotificationStatusError = action.payload;
      });
  },
});

/*
 * Export reducer for store configuration.
 */

export const { resetSliceState } = reduxSlice.actions;

export const authReducer = reduxSlice.reducer;
