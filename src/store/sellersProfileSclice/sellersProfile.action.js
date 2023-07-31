import { createAsyncThunk } from '@reduxjs/toolkit'

//! ======================== Redux : Async Thunk Actions ============================

/**
 * Api Action
 */
export const sellerProductListingAction = createAsyncThunk(
    'sellersProfile/sellerProductListingAction',
    async (params, thunkAPI) => {
        try {
            const result = await axiosRequest({
              url: '/seller-products/{id}',
              method: 'GET',
              data: params,
            })
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response ? error.response?.data : error.data
            )
        }
    }
)