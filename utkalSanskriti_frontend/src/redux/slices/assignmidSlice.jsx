import { createSlice } from '@reduxjs/toolkit';
 import {fetchBookingData}  from '../thunks/assignmidThunks';

const assignmidSlice = createSlice({
  name: 'assignmid',
  initialState: {
    assignmid: [], 
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Bookings
      .addCase(fetchBookingData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookingData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.assignmid = action.payload;
      })
      .addCase(fetchBookingData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});


export default assignmidSlice.reducer;