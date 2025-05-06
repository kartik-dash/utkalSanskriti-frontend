import { createAsyncThunk } from '@reduxjs/toolkit';
import { postData } from '../api/api';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      
      const data = await postData('/api/login', { email, password });
      return data;  // Assuming the response contains user data
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);




// authThunks.js (or wherever your thunks are defined)
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // Make the API call without manually passing the token
      const response = await postData('/api/auth/logout', {});  
      console.log('Logout successful:', response);
      
      // Optionally clear the token from localStorage
      localStorage.removeItem('token');

      return response;
    } catch (error) {
      console.error('Logout failed:', error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
