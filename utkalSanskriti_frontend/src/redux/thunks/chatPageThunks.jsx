// chatPageThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { postData, getData } from '../api/api';  // Ensure your API functions are correctly set up

// Thunk for getting messages
export const getmessages = createAsyncThunk(
  "chatmessage/getmessages",
  async (clientId, { rejectWithValue }) => {
    try {
      const data = await getData(`/api/bookings/client/${clientId}`);
      return data;  // This will be the payload for fulfilled case
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Thunk for submitting messages
export const submitMessages = createAsyncThunk(
  "chatmessage/submitMessages",
  async (reviewdata, { rejectWithValue }) => {
    try {
      const data = await postData("/api/feedback", reviewdata);
      return data;  // This will be the payload for fulfilled case
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);
