import axiosRequest from '@app/helper/axiosRequest'
import { createAsyncThunk } from '@reduxjs/toolkit'

//! ======================== Redux : Async Thunk Actions ============================

/**
 * Api Action
 */
export const ratingReviewAction = createAsyncThunk(
    'ratingReview/ratingReviewListingAction',
    async (params, thunkAPI) => {
        try {
            // console.log(params, "at Seller Review action====>>>>")
            const result = await axiosRequest({
                url: `/single-user-rating/${params?.user_id}?type=${params?.type}&filter=${params?.filter}`,
                method: 'GET',
                params: params,
            })
            // console.log(result, 'Seller Review Result ==========')
            return result
        } catch (error) {
            // console.log(error, 'Review Error=========>>>>>')
            return thunkAPI.rejectWithValue(
                error.response ? error.response?.data : error.data
            )
        }
    }
)
export const ratingReviewAsBuyerAction = createAsyncThunk(
    'ratingReview/ratingReviewAsBuyerAction',
    async (params, thunkAPI) => {
        try {
            console.log(params, "at Review action====>>>>")

            const result = await axiosRequest({

                url: `/given-rating-as-buyer/${params?.user_id}?filter=${params?.filter}`,
                method: 'GET',
                params: params,
            })

            console.log(result, 'Review Result ==========')
            return result
        } catch (error) {
            console.log(error, 'Review Error=========>>>>>')
            return thunkAPI.rejectWithValue(
                error.response ? error.response?.data : error.data
            )
        }
    }
)

export const purchaseProductListingAction = createAsyncThunk(
    'ratingReview/purchaseProductListingAction',
    async (params, thunkAPI) => {
        try {
            console.log(params, "at purchase action====>>>>")

            const result = await axiosRequest({

                url: `/get-purchased-product`,
                method: 'GET',
                params: params,
            })

            console.log(result, 'purchase Result ==========')
            return result
        } catch (error) {
            console.log(error, 'purchase Error=========>>>>>')
            return thunkAPI.rejectWithValue(
                error.response ? error.response?.data : error.data
            )
        }
    }
)


export const RateUserAction = createAsyncThunk(
    'ratingReview/RateUserAction',
    async (params, thunkAPI) => {
        try {
            console.log(params, "at add rating action====>>>>")

            const result = await axiosRequest({

                url: `/add-rating`,
                method: 'POST',
                data: params,
            })

            console.log(result, 'add rating Result ==========')
            return result
        } catch (error) {
            console.log(error, 'add rating Error=========>>>>>')
            return thunkAPI.rejectWithValue(
                error.response ? error.response?.data : error.data
            )
        }
    }
)
