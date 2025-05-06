
import { createSlice } from '@reduxjs/toolkit';
import { fetchAdminUsers } from '../thunks/masteradminviewmoreThunks';

const masteradminviewmoreSlice = createSlice({
  name: 'viewAdmin',
  initialState: {
    viewAdmin: [],
    fetchStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.fetchStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.viewAdmin = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.payload || "Failed to fetch team leads";
      });
  },
});

export default masteradminviewmoreSlice.reducer;