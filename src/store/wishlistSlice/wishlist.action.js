import axiosRequest from "@app/helper/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const wishlistAction = createAsyncThunk(
    'wishlist/wishlistAction',
    async (params, thunkAPI) => {
        try {

            const result = await axiosRequest({
                url: `/get-wishlist`,
                method: 'GET',
                params: params,
            })
            console.log(result, 'asdfghjklkjhgfdsdfghjklkjhgfdfghjk')
            return result
        } catch (error) {
            console.log(error, 'ksuhdfdfk=========>>>>>')
            return thunkAPI.rejectWithValue(
                error.response ? error.response?.data : error.data
            )
        }
    }
)
export const InterestListAction = createAsyncThunk(
    'wishlist/InterestListAction',
    async (params, thunkAPI) => {
        try {

            const result = await axiosRequest({
                url: `/get-interest-list`,
                method: 'GET',
                params: params,
            })
            console.log(result, 'asdfghjklkjhgfdsdfghjklkjhgfdfghjk')
            return result
        } catch (error) {
            console.log(error, 'ksuhdfdfk=========>>>>>')
            return thunkAPI.rejectWithValue(
                error.response ? error.response?.data : error.data
            )
        }
    }
)