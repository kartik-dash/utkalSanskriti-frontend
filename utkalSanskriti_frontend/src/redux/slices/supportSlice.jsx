import { createSlice } from '@reduxjs/toolkit';
import { fetchSupportUsers, updateSupportUsers, fetchSupportserviceUsers } from '../thunks/supportThunks';
 
 
const supportSlice = createSlice({
  name: 'support',
  initialState: {
    support: [],
    totalSupport: [],
    fetchStatus: 'idle', // Status for fetching
    updateStatus: 'idle', // Status for updating
    error: null,
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Team Lead Users
      .addCase(fetchSupportUsers.pending, (state) => {
        state.fetchStatus = 'loading';
        state.error = null; // Reset error when making a new request
      })
      .addCase(fetchSupportUsers.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.support = Array.isArray(action.payload) ? action.payload : [];
        console.log('Fetched Team Lead Data:', state.support);
      })
      .addCase(fetchSupportUsers.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.payload || "Failed to fetch team leads";
      })

      //fetch TeamUsers
      
      .addCase(fetchSupportserviceUsers.pending, (state) => {
        state.fetchStatus = 'loading';
        state.error = null; // Reset error when making a new request
      })
      .addCase(fetchSupportserviceUsers.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.totalSupport = Array.isArray(action.payload) ? action.payload : [];
        console.log('Fetched Team Lead Data:', state.support);
      })
      .addCase(fetchSupportserviceUsers.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.payload || "Failed to fetch team leads";
      })

      // Update Team Lead Users
      .addCase(updateSupportUsers.pending, (state) => {
        state.updateStatus = 'loading';
        state.loading = true;
        state.success = false;
        state.error = null; // Reset error when making a new update request
      })
      .addCase(updateSupportUsers.fulfilled, (state) => {
        state.updateStatus = 'succeeded';
        state.loading = false;
        state.success = true;
      })
      .addCase(updateSupportUsers.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.loading = false;
        state.error = action.payload || "Failed to update team lead users";
        state.success = false;
      });
  },
});

export default supportSlice.reducer;
