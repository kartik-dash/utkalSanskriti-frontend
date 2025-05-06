// import { createSlice } from '@reduxjs/toolkit';
// import { fetchPopularDestinations } from '../thunks/destinationThunks';

// const destinationsSlice = createSlice({
//   name: 'destinations',
//   initialState: {
//     popularDestinations: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPopularDestinations.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchPopularDestinations.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.popularDestinations = action.payload;
//       })
//       .addCase(fetchPopularDestinations.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export default destinationsSlice.reducer;
