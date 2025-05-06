
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../api/api';

export const fetchAllassignGuideUsers = createAsyncThunk(
  "supportService/fetchAllassignGuideUsers",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await getData(`/api/bookings/guide/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);