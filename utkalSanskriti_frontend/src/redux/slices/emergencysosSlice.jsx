import { createSlice } from '@reduxjs/toolkit';
 import {fetchSosData}  from '../thunks/emergencysosThunks';

const assignmidSlice = createSlice({
  name: 'emergenysos',
  initialState: {
    emergenysos: [], 
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Bookings
      .addCase(fetchSosData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSosData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.emergenysos = action.payload;
      })
      .addCase(fetchSosData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});


export default assignmidSlice.reducer;