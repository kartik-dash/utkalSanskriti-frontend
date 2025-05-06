
import { createSlice } from '@reduxjs/toolkit';
import { fetchAllassignGuideUsers } from '../thunks/allassignguideThunks';

const assignGuideSlice = createSlice({
  name: 'assignGuide',
  initialState: {
    assignGuide: [],
    fetchStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllassignGuideUsers.pending, (state) => {
        state.fetchStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAllassignGuideUsers.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.assignGuide = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAllassignGuideUsers.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.payload || "Failed to fetch team leads";
      });
  },
});

export default assignGuideSlice.reducer;