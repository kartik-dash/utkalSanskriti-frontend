
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { getData, postData, putData, deleteData } from '../api/api';


// export const fetchBookingData = createAsyncThunk(
//   "booking/fetchBookingData",
//   async (_, { rejectWithValue }) => {
//     try {
//       console.log("Fetching booking data...");
//       const data = await getData(`/api/users/clients`);
//       console.log("Fetched data:", data); // Log response
//       return data;
//     } catch (error) {
//       console.error("Error fetching data:", error); // Log errors
//       return rejectWithValue(error.response?.data || { message: error.message });
//     }
//   }
// );


// // Create User (POST)
// export const createBooking = createAsyncThunk(
//   'booking/createBooking',
//   async (templeData, { rejectWithValue }) => {
//     try {
//       const token = sessionStorage.getItem('token'); // Get token from sessionStorage

//       if (!token) {
//         throw new Error('Authorization token is missing.');
//       }

//       const data = await postData(`/api/temple_details/add`, templeData, { 
//         Authorization: `Bearer ${token}` // Pass headers correctly 
//       });

//       return data; // Return the response data
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: error.message });
//     }
//   }
// );


// Update User (PUT)
export const updateTemple = createAsyncThunk(
  'user/updateUser',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const data = await putData(`/api/temple_details/${templeId}`, userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);


// // Delete User (DELETE)
// export const deleteTemple = createAsyncThunk(
//   'user/deleteUser',
//   async (userId, { rejectWithValue }) => {
//     try {
//       await deleteData(`/api/users/${userId}`);
//       return userId;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: error.message });
//     }
//   }
// );



// export const bookTemple = createAsyncThunk(
//   "temple/book",
//   async (templeId, { rejectWithValue }) => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const response = await postData(`/api/temple/book/${templeId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: error.message });
//     }
//   }
// );





// soumya 



import { createAsyncThunk } from '@reduxjs/toolkit';
import { postData, getData } from '../api/api';

export const bookTemple = createAsyncThunk(
  "booking/bookTemple",
  async ({ clientId, bookingData }, { rejectWithValue }) => {
    console.log('booking:', bookingData);
    try {
      const url = `/api/bookings?clientId=${clientId}`;
      const response = await postData(url, bookingData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getBookingDetails = createAsyncThunk(
  "booking/getBookingDetails",
  async (clientId, { rejectWithValue }) => {
    try {
      const data = await getData(`/api/bookings/client/${clientId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);
export const submitReview = createAsyncThunk(
  "booking/submitReview",
  async (reviewdata, { rejectWithValue }) => {
    try {
      const data = await postData("/api/feedback", reviewdata);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);




