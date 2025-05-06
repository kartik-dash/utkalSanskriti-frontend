import { createAsyncThunk } from '@reduxjs/toolkit';
import { getData, putData } from '../api/api';

export const fetchTeamLeadUsers = createAsyncThunk(
  "teamLead/fetchTeamLeadUsers",  // Fixed action type naming
  async (midLevelId, { rejectWithValue }) => {
    try {
      console.log('Fetching team lead users for midLevelId:', midLevelId);
      const data = await getData(`/api/bookings/midlevel/${midLevelId}`);
      console.log('Data fetched:', data);
      return data;
    } catch (error) {
      console.error("Error fetching team lead users:", error);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);



export const updateTeamLeadUsers = createAsyncThunk(
  "teamLead/updateTeamLeadUsers",
  async ({ bookingId, midLevelId, userId }, { rejectWithValue }) => {
    try {
      if (!bookingId || !midLevelId || !userId) {
        throw new Error("Missing required parameters: bookingId, midLevelId, or userId");
      }

      console.log("Updating booking:", bookingId);
      console.log("Top-Level ID:", midLevelId);
      console.log("Team-Leader User ID:", userId);

      // Corrected API call with topLevelId instead of midLevelId
      const response = await putData(
        `/api/bookings/assign_by_mid_level/${bookingId}?midLevelId=${midLevelId}`, 
        { updatedByTeamLeader: userId } 
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

export const fetchTeamUsers = createAsyncThunk(
  "teamLead/fetchTeamUsers",  // Fixed action type naming
  async (midLevelId, { rejectWithValue }) => {
    try {
     
      const data = await getData(`/api/users/teamleader/${midLevelId}`);
      console.log('Data fetched:', data);
      return data;
    } catch (error) {
      console.error("Error fetching team lead users:", error);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);