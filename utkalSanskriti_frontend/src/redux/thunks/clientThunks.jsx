
import { createAsyncThunk } from '@reduxjs/toolkit';
import { postData } from '../api/api';

// Create Client (POST)
export const createClient = createAsyncThunk(
  'client/createClient',
  async (ClientData, { rejectWithValue }) => {
    try {
      // Remove token check
      const data = await postData(`/api/register`, ClientData); // No Authorization header

      return data; // Return the response data
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);




export const sendSOSAlert = createAsyncThunk(
  "client/emergencyAlert",
  async ({ ClientData, userId }, { rejectWithValue }) => {
    try {
      const data = await postData(`/api/emergency/alert?clientId=${userId}`, ClientData); // API call

      return data; // Return response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);