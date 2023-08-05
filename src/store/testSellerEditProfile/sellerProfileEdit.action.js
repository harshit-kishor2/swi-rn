import axiosRequest from "@app/helper/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { err } from "react-native-svg/lib/typescript/xml";

export const updateSellerProfile = createAsyncThunk(
    `updateSellerProfile/updateSellerProfile`,
    async (params, thunkAPI) => {
        try {
            const response = await axiosRequest({
                url: `/update-profile`,
                method: `get`
            });
            return response;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response ? error.response?.data : error?.method,
            )
        }
    },

)