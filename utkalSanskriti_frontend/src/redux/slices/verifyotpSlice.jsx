
import { createSlice } from '@reduxjs/toolkit';
import { verifyRegisterOtp } from '../thunks/verifyotpThunks';


const initialState = {
  user: null,
  role: null,
  userId: null,
  status: 'idle',
  error: null,
};

const forgotSlice = createSlice({
  name: 'verify',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyRegisterOtp.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(verifyRegisterOtp.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(verifyRegisterOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
      
  },
});

export default forgotSlice.reducer;
