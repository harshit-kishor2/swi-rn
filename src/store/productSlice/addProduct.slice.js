import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {LoadingStatus} from '@app/helper/strings';
import {
  addProductDetailAction,
  addProductImageAction,
  addProductPriceAction,
  getAllBrandAction,
  getAllDataAction,
  getAllProductDropdownAction,
  getAllProductModelAction,
  updateProductImageAction,
} from './addProduct.action';

// =============================== Redux : Test Slice ==================================

const SLICE_FEATURE_KEY = 'addProduct';

// Create entity adapter
const entityAdapter = createEntityAdapter();

// Define Initial State
const initialState = entityAdapter.getInitialState({
  getAllBrandLoadinStatus: LoadingStatus.NOT_LOADED,
  getAllBrand: [],
  getAllBrandError: null,

  getAllProductDropdownLoadingStatus: LoadingStatus.NOT_LOADED,
  getAllProductDropdown: [],
  getAllProductDropdownError: null,

  getAllProductModelLoadingStatus: LoadingStatus.NOT_LOADED,
  getAllProductModel: [],
  addProductPriceError: null,

  addProductImageLoadingStatus: LoadingStatus.NOT_LOADED,
  addProductImage: null,
  addProductImageError: null,

  addProductDetailLoadingStatus: LoadingStatus.NOT_LOADED,
  addProductDetail: null,
  addProductDetailError: null,

  addProductPriceLoadingStatus: LoadingStatus.NOT_LOADED,
  addProductPrice: null,
  addProductPriceError: null,

  //############################################Edit Product #####################################################################################

  // Get Product Details

  getAllDataActionLoadingStatus: LoadingStatus.NOT_LOADED,
  getAllDataAction: [],
  getAllDataActionError: null,

  // Get Product Details

  updateProductImageActionLoadingStatus: LoadingStatus.NOT_LOADED,
  updateProductImageAction: [],
  updateProductImageActionError: null,
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
      // getAllBrand
      .addCase(getAllBrandAction.pending, state => {
        state.getAllBrandLoadinStatus = LoadingStatus.LOADING;
      })
      .addCase(getAllBrandAction.fulfilled, (state, action) => {
        state.getAllBrandLoadinStatus = LoadingStatus.LOADED;
        state.getAllBrand = action.payload?.data;
      })
      .addCase(getAllBrandAction.rejected, (state, action) => {
        state.getAllBrandLoadinStatus = LoadingStatus.FAILED;
      })
      // getAllProductDropdownAction
      .addCase(getAllProductDropdownAction.pending, state => {
        state.getAllProductDropdownLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getAllProductDropdownAction.fulfilled, (state, action) => {
        state.getAllProductDropdownLoadingStatus = LoadingStatus.LOADED;
        state.getAllProductDropdown = action.payload?.data;
      })
      .addCase(getAllProductDropdownAction.rejected, (state, action) => {
        state.getAllProductDropdownLoadingStatus = LoadingStatus.FAILED;
      })
      // getAllProductModelAction
      .addCase(getAllProductModelAction.pending, state => {
        state.getAllProductModel = [];
        state.getAllProductModelLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getAllProductModelAction.fulfilled, (state, action) => {
        state.getAllProductModelLoadingStatus = LoadingStatus.LOADED;
        state.getAllProductModel = action.payload?.data;
      })
      .addCase(getAllProductModelAction.rejected, (state, action) => {
        state.getAllProductModelLoadingStatus = LoadingStatus.FAILED;
      })
      // addProductImageAction
      .addCase(addProductImageAction.pending, state => {
        state.addProductImageLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(addProductImageAction.fulfilled, (state, action) => {
        state.addProductImageLoadingStatus = LoadingStatus.LOADED;
        state.addProductImage = action.payload?.data;
      })
      .addCase(addProductImageAction.rejected, (state, action) => {
        state.addProductImageLoadingStatus = LoadingStatus.FAILED;
      })
      // addProductDetailAction
      .addCase(addProductDetailAction.pending, state => {
        state.addProductDetailLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(addProductDetailAction.fulfilled, (state, action) => {
        state.addProductDetailLoadingStatus = LoadingStatus.LOADED;
        state.addProductDetail = action.payload?.data;
      })
      .addCase(addProductDetailAction.rejected, (state, action) => {
        state.addProductDetailLoadingStatus = LoadingStatus.FAILED;
      })
      // addProductPriceAction
      .addCase(addProductPriceAction.pending, state => {
        state.addProductPriceLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(addProductPriceAction.fulfilled, (state, action) => {
        state.addProductPriceLoadingStatus = LoadingStatus.LOADED;
        state.addProductPrice = action.payload?.data;
      })
      .addCase(addProductPriceAction.rejected, (state, action) => {
        state.addProductPriceLoadingStatus = LoadingStatus.FAILED;
      })

      // ############################ Edit Product Details ########################################

      // addProductPriceAction
      .addCase(getAllDataAction.pending, state => {
        state.getAllDataActionLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getAllDataAction.fulfilled, (state, action) => {
        state.getAllDataActionLoadingStatus = LoadingStatus.LOADED;
        state.getAllDataAction = action.payload?.data;
      })
      .addCase(getAllDataAction.rejected, (state, action) => {
        state.getAllDataActionLoadingStatus = LoadingStatus.FAILED;
        state.getAllDataActionError = action.payload;
      })
      // Update Product  Image Action
      .addCase(updateProductImageAction.pending, state => {
        state.updateProductImageActionLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(updateProductImageAction.fulfilled, (state, action) => {
        state.updateProductImageActionLoadingStatus = LoadingStatus.LOADED;
        state.updateProductImageAction = action.payload?.data;
      })
      .addCase(updateProductImageAction.rejected, (state, action) => {
        state.updateProductImageActionLoadingStatus = LoadingStatus.FAILED;
        state.updateProductImageActionError = action.payload;
      });
  },
});

/*
 * Export reducer for store configuration.
 */

export const {resetSliceState} = reduxSlice.actions;

export const productReducer = reduxSlice.reducer;
