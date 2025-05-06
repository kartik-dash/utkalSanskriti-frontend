
import { createSlice } from '@reduxjs/toolkit';
import { forgotPassword, verifyOtp, afterVerification } from '../thunks/forgotPasswordThunks';

const initialState = {
  user: null,
  role: null,
  userId: null,
  status: 'idle',
  error: null,
};

const forgotSlice = createSlice({
  name: 'forgot',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(afterVerification.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(afterVerification.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(afterVerification.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default forgotSlice.reducer;
