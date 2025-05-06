import { createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../api/api';

export const fetchSosData = createAsyncThunk(
  "emergenysos/fetchSosData",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching booking data...");
      const data = await getData(`/api/emergency/alerts`);
      console.log("Fetched data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);