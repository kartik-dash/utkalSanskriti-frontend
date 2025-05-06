import { createSlice } from '@reduxjs/toolkit';
import { fetchOverallCounts } from '../thunks/masteradmindetailsThunks';

const initialState = {
  overallCounts: {}, // Store data as an object instead of an array
  fetchStatus: 'idle',
  error: null,
};

const overallCountsSlice = createSlice({
  name: 'overallCounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOverallCounts.pending, (state) => {
        state.fetchStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchOverallCounts.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.overallCounts = action.payload || {}; // Ensure it's an object
        console.log('Fetched Team Lead Data:', state.overallCounts);
      })
      .addCase(fetchOverallCounts.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.payload?.message || 'Failed to fetch overall counts';
      })
  },
});


export default overallCountsSlice.reducer;
