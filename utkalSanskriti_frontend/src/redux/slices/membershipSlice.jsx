import { createSlice } from "@reduxjs/toolkit";
import { addMembership } from '../thunks/memberShipThunks';

const membershipSlice = createSlice({
    name: "membership",
    initialState: {
      status: "idle", // idle, loading, succeeded, failed
      error: null,
      orderData: null,
      membershipType: "",
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addMembership.pending, (state) => {
          state.status = "loading";
        })
        .addCase(addMembership.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.orderData = action.payload.orderData;
          state.membershipType = action.payload.membershipType;
        })
        .addCase(addMembership.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });  
    },
  });
  
  export default membershipSlice.reducer;