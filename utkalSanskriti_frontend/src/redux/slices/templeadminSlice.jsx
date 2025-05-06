
import { createSlice } from '@reduxjs/toolkit';
import { fetchTempleAdminUsers, updateTempleAdminUsers } from '../thunks/templeadminThunks';

const templeAdminSlice = createSlice({
  name: 'templeadmin',
  initialState: {
    templeadmin: [],
    fetchStatus: 'idle',
    updateStatus: 'idle',
    error: null,
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Temple Admin Users
      .addCase(fetchTempleAdminUsers.pending, (state) => {
        state.fetchStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchTempleAdminUsers.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.templeadmin = action.payload || [];
        // state.templeadmin = Array.isArray(action.payload) ? action.payload : [];
        console.log('Fetched Team Lead Data:', state.templeadmin);
      })
      .addCase(fetchTempleAdminUsers.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.payload || "Failed to fetch admin users";
      })
      
      // Update Temple Admin Users
      .addCase(updateTempleAdminUsers.pending, (state) => {
        state.updateStatus = 'loading';
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateTempleAdminUsers.fulfilled, (state) => {
        state.updateStatus = 'succeeded';
        state.loading = false;
        state.success = true;
      })
      .addCase(updateTempleAdminUsers.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.loading = false;
        state.error = action.payload || "Failed to update admin users";
        state.success = false;
      });
  },
});

export default templeAdminSlice.reducer;


