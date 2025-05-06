
import { createAsyncThunk } from '@reduxjs/toolkit';
import { postData } from '../api/api';

export const forgotPassword = createAsyncThunk(
  'forgot/forgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await postData('/api/forgot_password', { email });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'An error occurred while processing your request.');
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'verify/verifyOtp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await postData('/api/verify_otp', { email, otp });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'An error occurred while processing your request.');
    }
  }
);

export const afterVerification = createAsyncThunk(
  'verification/afterVerification',
  async ({ email, newPassword, confirmNewPassword }, { rejectWithValue }) => {
    try {
      const response = await postData('/api/change_password_after_verification', { email, newPassword, confirmNewPassword });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'An error occurred while processing your request.');
    }
  }
);
