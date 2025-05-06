import { createSlice } from '@reduxjs/toolkit';
import { fetchMidLevelUsers } from "../thunks/midLevelThunks";
import { updateMidLevelUser } from "../thunks/midLevelThunks";

const midLevelSlice = createSlice({
  name: 'midLevel',
  initialState: {
    midLevel: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMidLevelUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMidLevelUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.midLevel = Array.isArray(action.payload) ? action.payload : [];
        console.log('statedata:', state.midLevel);
      })
      .addCase(fetchMidLevelUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })


      //update users 
      
          .addCase(updateMidLevelUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(updateMidLevelUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
          })
          .addCase(updateMidLevelUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })

      
  },
});


export default midLevelSlice.reducer;


