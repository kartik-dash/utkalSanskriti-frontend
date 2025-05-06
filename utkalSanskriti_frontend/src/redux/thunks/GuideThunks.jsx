import { createAsyncThunk } from '@reduxjs/toolkit';
import { getData, putData } from '../api/api';

export const fetchGuideUsers = createAsyncThunk(
  "guide/fetchGuideUsers",  // Fixed action type naming
  async (templeAdminId, { rejectWithValue }) => {
    try {
      console.log('Fetching team lead users for templeAdminId:', templeAdminId);
      const data = await getData(`/api/bookings/temple_admin/${templeAdminId}`);
      console.log('Data fetched:', data);
      return data;
    } catch (error) {
      console.error("Error fetching team lead users:", error);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);



//update

export const updateGuideUsers = createAsyncThunk(
  "guide/updateGuideUsers",
  async ({ bookingId, templeAdminId, userId }, { rejectWithValue }) => {
    try {
      if (!bookingId || !templeAdminId || !userId) {
        throw new Error("Missing required parameters: bookingId, midLevelId, or userId");
      }

      const response = await putData(
        `/api/bookings/assign_guide/${bookingId}?guideId=${userId}&templeAdminId=${templeAdminId}`
      );

      console.log("Update successful:", response);
      return response; 

    } catch (error) {
      console.error("Error updating team lead user:", error);

      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);


// assigned particular midlevel user data

export const fetchTotalGuideUsers = createAsyncThunk(
  "guide/fetchTotalGuideUsers",  // Fixed action type naming
  async (templeAdminId, { rejectWithValue }) => {
    try {
     
      const data = await getData(`/api/users/guide/${templeAdminId}`);
      console.log('Data fetched:', data);
      return data;
    } catch (error) {
      console.error("Error fetching team lead users:", error);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);