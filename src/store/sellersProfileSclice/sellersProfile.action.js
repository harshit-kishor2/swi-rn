import axiosRequest from '@app/helper/axiosRequest'
import { createAsyncThunk } from '@reduxjs/toolkit'

//! ======================== Redux : Async Thunk Actions ============================

/**
 * Api Action
 */
export const sellerProductListingAction = createAsyncThunk(
    'sellersProfile/sellerProductListingAction',
    async (params, thunkAPI) => {
        try {
            console.log(params,"at action====>>>>")
            const result = await axiosRequest({
              url: `/seller-products/${params.id}`,
              method: 'GET',
              params: params,
            })
            console.log(result,'asdfghjklkjhgfdsdfghjklkjhgfdfghjk')
            return result
        } catch (error) {
            console.log(error,'=========>>>>>')
            return thunkAPI.rejectWithValue(
                error.response ? error.response?.data : error.data
            )
        }
    }
)