import { createSlice } from '@reduxjs/toolkit';
import { fetchGuideUsers, fetchTotalGuideUsers, updateGuideUsers } from '../thunks/GuideThunks';
 
 
const guideSlice = createSlice({
  name: 'guide',
  initialState: {
    guide: [],
    totalguide: [],
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
      .addCase(fetchGuideUsers.pending, (state) => {
        state.fetchStatus = 'loading';
        state.error = null; // Reset error when making a new request
      })
      .addCase(fetchGuideUsers.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.guide = Array.isArray(action.payload) ? action.payload : [];
        console.log('Fetched Team Lead Data:', state.guide);
      })
      .addCase(fetchGuideUsers.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.payload || "Failed to fetch team leads";
      })

      //fetch TeamUsers
      .addCase(fetchTotalGuideUsers.pending, (state) => {
        state.fetchStatus = 'loading';
        state.error = null; // Reset error when making a new request
      })
      .addCase(fetchTotalGuideUsers.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.totalguide = Array.isArray(action.payload) ? action.payload : [];
        console.log('Fetched Guide Users:', state.totalguide); // ✅ Corrected log statement
      })
      .addCase(fetchTotalGuideUsers.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.payload || "Failed to fetch guide users"; // ✅ Corrected error message
      })

       // Update Team Lead Users
             .addCase(updateGuideUsers.pending, (state) => {
               state.updateStatus = 'loading';
               state.loading = true;
               state.success = false;
               state.error = null; // Reset error when making a new update request
             })
             .addCase(updateGuideUsers.fulfilled, (state) => {
               state.updateStatus = 'succeeded';
               state.loading = false;
               state.success = true;
             })
             .addCase(updateGuideUsers.rejected, (state, action) => {
               state.updateStatus = 'failed';
               state.loading = false;
               state.error = action.payload || "Failed to update team lead users";
               state.success = false;
             });


  },
});

export default guideSlice.reducer;


