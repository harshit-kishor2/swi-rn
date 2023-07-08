import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import {Config} from '../helper/config';
import api from '../services/api';
import {fire} from 'react-native-alertbox';

export const addProductsAdapter = createEntityAdapter();
export const addProductSlice = 'ADD_PRODUCT_SLICE';

export const productDropdownAction = createAsyncThunk(
  'productDropdownAction',
  async (params, thunkAPI) => {
    try {
      const response = await api({
        url: 'get-product-dropdown',
        method: 'GET',
        params: params,
        headers: {
          Accept: 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.log('error from product drop down list', error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getProductBrand = createAsyncThunk(
  'getProductBrand',
  async (params, thunkAPI) => {
    try {
      const response = await api({
        url: 'brand-list',
        method: 'GET',
        params: params,
      });
      // console.log('response from get product brand', response);
      return response;
    } catch (error) {
      console.log('error from get product brand', error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getProductModel = createAsyncThunk(
  'getProductModel',
  async (params, thunkAPI) => {
    try {
      const response = await api({
        url: `model-list/${params.id}`,
        method: 'GET',
      });
      console.log('response from get product Model', response);
      return response;
    } catch (error) {
      console.log('error from get product Model', error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);
//-----------------------------------------------
// Add product
export const addProductDetail = createAsyncThunk(
  'addProductDetail',
  async (params, thunkAPI) => {
    try {
      const response = await api({
        url: 'add-product-mobile',
        method: 'POST',
        params: params,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('--->>response from get product details', response);
      return response;
    } catch (error) {
      console.log('error from get product Model', error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const initialState = addProductsAdapter.getInitialState({
  dropdownLoading: false,
  dropdownData: null,
  brandLoading: false,
  brandData: null,
  modelLoading: false,
  modelData: null,
});

export const productSlice = createSlice({
  name: addProductSlice,
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(productDropdownAction.pending, (state, action) => {
        state.dropdownLoading = 'loading';
      })
      .addCase(productDropdownAction.fulfilled, (state, action) => {
        state.dropdownLoading = 'loaded';
        state.dropdownData = action.payload;
      })
      .addCase(productDropdownAction.rejected, (state, action) => {
        state.dropdownLoading = 'error';
      })
      .addCase(getProductBrand.pending, (state, action) => {
        state.brandLoading = 'loading';
      })
      .addCase(getProductBrand.fulfilled, (state, action) => {
        state.brandLoading = 'loaded';
        state.brandData = action.payload;
      })
      .addCase(getProductBrand.rejected, (state, action) => {
        state.brandLoading = 'error';
      })
      .addCase(getProductModel.pending, (state, action) => {
        state.modelLoading = 'loading';
      })
      .addCase(getProductModel.fulfilled, (state, action) => {
        state.modelLoading = 'loaded';
        state.modelData = action.payload;
      })
      .addCase(getProductModel.rejected, (state, action) => {
        state.modelLoading = 'error';
      });
  },
});

export const addProductActions = productSlice.actions;
export const addProductReducer = productSlice.reducer;

export const productDropdownLoading = state => {
  return state.addProductReducer.dropdownLoading === 'loading' ? true : false;
};

export const productDropdownData = state => {
  return state.addProductReducer.dropdownData;
};

export const productBrandLoading = state => {
  return state.addProductReducer.brandLoading === 'loading' ? true : false;
};

export const productBrandData = state => {
  return state.addProductReducer.brandData;
};

export const productModelLoading = state => {
  return state.addProductReducer.modelLoading === 'loading' ? true : false;
};

export const productModelData = state => {
  return state.addProductReducer.modelData;
};
