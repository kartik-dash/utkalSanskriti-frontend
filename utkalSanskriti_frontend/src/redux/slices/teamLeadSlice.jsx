import { createSlice } from '@reduxjs/toolkit';
import { fetchTeamLeadUsers, updateTeamLeadUsers, fetchTeamUsers } from '../../../src/redux/thunks/teamLeadThunks';
 
 
const teamLeadSlice = createSlice({
  name: 'teamLead',
  initialState: {
    teamLead: [],
    totalTeam: [],
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
      .addCase(fetchTeamLeadUsers.pending, (state) => {
        state.fetchStatus = 'loading';
        state.error = null; // Reset error when making a new request
      })
      .addCase(fetchTeamLeadUsers.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.teamLead = Array.isArray(action.payload) ? action.payload : [];
        console.log('Fetched Team Lead Data:', state.teamLead);
      })
      .addCase(fetchTeamLeadUsers.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.payload || "Failed to fetch team leads";
      })

      //fetch TeamUsers
      
      .addCase(fetchTeamUsers.pending, (state) => {
        state.fetchStatus = 'loading';
        state.error = null; // Reset error when making a new request
      })
      .addCase(fetchTeamUsers.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.totalTeam = Array.isArray(action.payload) ? action.payload : []
        console.log('Fetched Team Lead Data:', state.teamLead);
      })
      .addCase(fetchTeamUsers.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.payload || "Failed to fetch team leads";
      })

      // Update Team Lead Users
      .addCase(updateTeamLeadUsers.pending, (state) => {
        state.updateStatus = 'loading';
        state.loading = true;
        state.success = false;
        state.error = null; // Reset error when making a new update request
      })
      .addCase(updateTeamLeadUsers.fulfilled, (state) => {
        state.updateStatus = 'succeeded';
        state.loading = false;
        state.success = true;
      })
      .addCase(updateTeamLeadUsers.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.loading = false;
        state.error = action.payload || "Failed to update team lead users";
        state.success = false;
      });
  },
});

export default teamLeadSlice.reducer;
