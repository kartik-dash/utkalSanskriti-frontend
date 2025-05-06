import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from '../api/api';


export const fetchInternationalData = createAsyncThunk (
    "international/fetchInternationalData",
    async (_, { rejectWithValue }) => {
        try {
            const data = await getData ("/api/users/clients/not_from_india");
            return data;
        } catch (error) {
             return rejectWithValue(error.response?.data || {message: error.message });
        }
    }
);

export const fetchInternationalcount = createAsyncThunk (
    "international/fetchInternationalcount",
    async (_, { rejectWithValue }) => {
        try {
            const data = await getData ("/api/users/clients/count/except-india");
            return data;
        }catch (error) {
            return rejectWithValue(error.response?.data || {message: error.message });
        }
    }
);


