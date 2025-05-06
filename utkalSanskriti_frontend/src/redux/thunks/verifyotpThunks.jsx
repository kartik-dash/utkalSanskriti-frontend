
import { createAsyncThunk } from '@reduxjs/toolkit';
import { postData } from '../api/api';



export const verifyRegisterOtp = createAsyncThunk(
    'verify/verifyRegisterOtp',
    async ({ email, otp }, { rejectWithValue }) => {
      try {
        const response = await postData('api/verify_registration_otp', { email, otp });
        return response;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'An error occurred while processing your request.');
      }
    }
  );