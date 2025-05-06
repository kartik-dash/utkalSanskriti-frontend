
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../api/api';

export const fetchSupportServiceUsers = createAsyncThunk(
  "supportService/fetchSupportServiceUsers",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await getData(`/api/bookings/supportService/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);
