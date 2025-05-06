// chatPageSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { submitMessages, getmessages } from "../thunks/chatPageThunks";  // Import thunks

const bookingSlice = createSlice({
  name: "chatmessage",
  initialState: {
    loading: false,
    success: false,
    error: null,
    bookings: [],  // This will hold the list of messages
  },
  reducers: {
    resetBookingState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitMessages.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.bookings.push(action.payload);  // Push the new message to the bookings array
      })
      .addCase(submitMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Handle error response
      })
      .addCase(getmessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getmessages.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;  // Set the list of messages
      })
      .addCase(getmessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Handle error response
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
