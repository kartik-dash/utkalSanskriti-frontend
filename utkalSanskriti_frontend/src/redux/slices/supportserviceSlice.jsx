
import { createSlice } from '@reduxjs/toolkit';
import { fetchSupportServiceUsers } from '../thunks/supportserviceThunks';

const supportServiceSlice = createSlice({
  name: 'supportService',
  initialState: {
    supportService: [],
    fetchStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupportServiceUsers.pending, (state) => {
        state.fetchStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchSupportServiceUsers.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.supportService = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchSupportServiceUsers.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.payload || "Failed to fetch team leads";
      });
  },
});

export default supportServiceSlice.reducer;
