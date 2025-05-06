// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { getData } from '../api/api';

// export const fetchPopularDestinations = createAsyncThunk(
//   "destinations/fetchPopular",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await getData("/api/destinations");
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );
