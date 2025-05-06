
import { createSlice } from '@reduxjs/toolkit';
import { fetchAlladmin } from '../thunks/masterAdminThunks';


const assignGuideSlice = createSlice({
  name: 'alladmin',
  initialState: {
    assignGuide: [],
    fetchStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // get master admin data

      .addCase(fetchAlladmin.pending, (state) => {
        state.fetchStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAlladmin.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.alladmin = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAlladmin.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.payload || "Failed to fetch team leads";
      });
  },
});

export default assignGuideSlice.reducer;