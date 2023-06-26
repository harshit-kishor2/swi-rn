import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../services/api';
import {Config} from '../helper/config';

const initialState = {
  tokenlogin: 'false',
  signuploader: 'not loaded',
  loginloader: 'not loaded',
  profileloader: 'not loaded',
  forgetloader: false,
  registrationSuccess: false,
  loginSuccess: false,
  userData: null,
  userEmail: null,
  userID: null,
  profileUserData: null,
};
// user SignUp
// -----------------------------
export const userSignup = createAsyncThunk(
  'auth/userSignup',
  async (params, thunkAPI) => {
    console.log('first', params);
    try {
      const response = await {
        url: 'https://php8.singsys.net/swi/backend/public/api/register',
        method: 'POST',
        data: params,
      };
      console.log('SignUp response', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// user Login
// -----------------------------
export const userLogin = createAsyncThunk(
  'auth/userLogin',
  async (params, thunkAPI) => {
    console.log('Login', params);
    try {
      const response = await api({
        url: 'https://php8.singsys.net/swi/backend/public/api/login',
        method: 'POST',
        data: params,
      });
      console.log('Login response', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Slices
//--------------------------------
const Authslice = createSlice({
  name: 'Authslice',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(userSignup.pending, (state, action) => {
        state.signuploader = 'loading';
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.userData = action.payload;

        console.log('registration', action.payload);
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.signuploader = 'not loaded';
      })
      .addCase(userLogin.pending, (state, action) => {
        state.loginloader = 'loading';
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loginSuccess = true;
        state.loginloader = 'loaded';

        state.profile = action.payload;
        state.tokenlogin = 'true';
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loginloader = 'not loaded';
      });
  },
});
export const AuthReducer = Authslice.reducer;
export const AuthAction = Authslice.actions;
