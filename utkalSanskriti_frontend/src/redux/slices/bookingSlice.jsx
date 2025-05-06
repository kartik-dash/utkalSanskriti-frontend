// import { createSlice } from '@reduxjs/toolkit';
// import { fetchBookingData, createBooking, updateBooking } from '../thunks/bookingThunks';

// const bookingSlice = createSlice({
//   name: 'booking',
//   initialState: {
//     booking: [],  // Store multiple users
//     status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch Users
//       .addCase(fetchBookingData.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchBookingData.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.bookings = action.payload;  // Store users in an array
//       })
//       .addCase(fetchBookingData.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Create User
//       .addCase(createBooking.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(createBooking.fulfilled, (state, action) => {
//         state.status = 'succeeded';
    
//       })
      
//       .addCase(createBooking.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//   },
// });

// export default bookingSlice.reducer;




// soumya






import { createSlice } from "@reduxjs/toolkit";
import { bookTemple, getBookingDetails } from "../thunks/bookingThunks";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    loading: false,
    success: false,
    error: null,
    bookings: [],
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
      .addCase(bookTemple.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(bookTemple.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.bookings.push(action.payload);
      })
      .addCase(bookTemple.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBookingDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getBookingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
