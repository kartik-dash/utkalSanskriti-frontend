import { createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../api/api';

export const fetchOverallCounts = createAsyncThunk(
  "overallCounts/fetchOverallCounts",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await getData(`/api/users/created_by/${userId}/overall_counts`);
      console.log("h:", data);
      return data; // Return the data directly
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

