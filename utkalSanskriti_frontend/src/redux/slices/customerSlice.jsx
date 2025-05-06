import { createSlice } from '@reduxjs/toolkit';
import { fetchCustomerDataByStatus } from "../thunks/customerThunks";

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customers: [],  // Store multiple users
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchCustomerDataByStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomerDataByStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers = action.payload;  // Store users in an array
      })
      .addCase(fetchCustomerDataByStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

  },
});

export default customerSlice.reducer;
