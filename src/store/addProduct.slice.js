import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import {Config} from '../helper/config';
import api from '../services/api';
import {fire} from 'react-native-alertbox';
import axiosRequest from '@app/helper/axiosRequest';

export const addProductsAdapter = createEntityAdapter();
export const addProductSlice = 'ADD_PRODUCT_SLICE';

export const productDropdownAction = createAsyncThunk(
  'productDropdownAction',
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: 'get-product-dropdown',
        method: 'GET',
        params: params,
        headers: {
          Accept: 'application/json',
        },
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getProductBrand = createAsyncThunk(
  'getProductBrand',
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: 'brand-list',
        method: 'GET',
        params: params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getProductModel = createAsyncThunk(
  'getProductModel',
  async (params, thunkAPI) => {
    try {
      const response = await axiosRequest({
        url: `model-list/${params.id}`,
        method: 'GET',
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
//-----------------------------------------------
// Add product
export const addProductDetail = createAsyncThunk(
  'addProductDetail',

  async (params, thunkAPI) => {
    console.log('add product params', params);
    try {
      const response = await axiosRequest({
        url: 'add-product-mobile',
        method: 'POST',
        data: params,
        headers: {
          'Content-Type': 'multipart/form-data',
          // Accept: 'application/json',
        },
        params: {
          step: 'first',
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

//-----------------------------------------------------------------
//update product of second page
export const updateSecondProductDetail = createAsyncThunk(
  'updateSecondProductDetail',

  async (params, thunkAPI) => {
    console.log(
      'update-product-data/{product_id}',
      `update-product-data/${params?.productID}`,
    );
    try {
      const response = await axiosRequest({
        url: `update-product-data/${params?.productID}`,
        method: 'POST',
        data: params,
        headers: {
          'Content-Type': 'multipart/form-data',
          // Accept: 'application/json',
        },
        params: {
          step: 'second',
        },
      });
      console.log('--->>response from update product details', response);
      return response;
    } catch (error) {
      console.log('error from get product Model', error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);
//-----------------------------------------------------------------
//update product of third page
export const updateThirdProductDetail = createAsyncThunk(
  'updateThirdProductDetail',

  async (params, thunkAPI) => {
    console.log(
      'update-product-data/{product_id}',
      `update-product-data/${params?.productID}`,
    );

    try {
      const response = await axiosRequest({
        url: `update-product-data/${params?.productID}`,
        method: 'POST',
        data: params,
        headers: {
          'Content-Type': 'multipart/form-data',
          // Accept: 'application/json',
        },
        params: {
          step: 'third',
        },
      });
      console.log('--->>response from update Third product details', response);
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
  product_id: '',
  firstformloading: null,
  secondformloading: null,
  thirdformloading: null,
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
      })
      .addCase(addProductDetail.pending, (state, action) => {
        state.firstformloading = 'loading';
      })
      .addCase(addProductDetail.fulfilled, (state, action) => {
        state.firstformloading = 'loaded';
        state.product_id = action.payload?.data?.id;
      })
      .addCase(addProductDetail.rejected, (state, action) => {
        state.firstformloading = 'error';
      })
      .addCase(updateSecondProductDetail.pending, (state, action) => {
        state.secondformloading = 'loading';
      })
      .addCase(updateSecondProductDetail.fulfilled, (state, action) => {
        state.secondformloading = 'loaded';
      })
      .addCase(updateSecondProductDetail.rejected, (state, action) => {
        state.secondformloading = 'error';
      })
      .addCase(updateThirdProductDetail.pending, (state, action) => {
        state.thirdformloading = 'loading';
      })
      .addCase(updateThirdProductDetail.fulfilled, (state, action) => {
        state.thirdformloading = 'loaded';
      })
      .addCase(updateThirdProductDetail.rejected, (state, action) => {
        state.thirdformloading = 'error';
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
export const productFirstLoading = state => {
  return state.addProductReducer.firstformloading === 'loading' ? true : false;
};
export const pID = state => {
  return state.addProductReducer.product_id;
};
export const productSecondLoading = state => {
  return state.addProductReducer.secondformloading === 'loading' ? true : false;
};
export const productThirdLoading = state => {
  return state.addProductReducer.thirdformloading === 'loading' ? true : false;
};
