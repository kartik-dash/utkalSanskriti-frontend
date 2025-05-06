

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getData,putData } from '../api/api';

export const fetchMidLevelUsers = createAsyncThunk(
  "midLevel/fetchMidLevelUsers",
  async (topLevelId, { rejectWithValue }) => {
    try {
      console.log('Fetching mid-level users for templeId:',topLevelId);
      const data = await getData(`/api/users/midlevel/${topLevelId}`);
      console.log('data:', data);
      return data;
    } catch (error) {
      console.error("Error fetching mid-level users:", error);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const updateMidLevelUser = createAsyncThunk(
  "midLevel/updateMidLevelUser",
  async ({ bookingId, topLevelId, userId }, { rejectWithValue }) => {
    try {
      if (!bookingId || !topLevelId || !userId) {
        throw new Error("Missing required parameters: bookingId, topLevelId, or userId");
      }

      console.log("Updating booking:", bookingId);
      console.log("Top-Level ID:", topLevelId);
      console.log("Mid-Level User ID:", userId);

      // Send the request to update the mid-level user
      const response = await putData(
        `/api/bookings/assign_by_top_level/${bookingId}?topLevelId=${topLevelId}`, 
        { updatedByMidLevel: userId } // Ensure correct key name
      );

      console.log("Update successful:", response);
      return response; // Return updated data

    } catch (error) {
      console.error("Error updating mid-level user:", error);

      // Ensure error response is properly handled
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);
