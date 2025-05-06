import { createAsyncThunk } from '@reduxjs/toolkit';
import { getData, putData } from '../api/api';

export const fetchSupportUsers = createAsyncThunk(
  "support/fetchSupportUsers",  // Fixed action type naming
  async (teamLeaderId, { rejectWithValue }) => {
    try {
      console.log('Fetching team lead users for teamLeadId:', teamLeaderId);
      const data = await getData(`/api/bookings/teamLeader/${teamLeaderId}`);
      console.log('Data fetched:', data);
      return data;
    } catch (error) {
      console.error("Error fetching team lead users:", error);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);



export const updateSupportUsers = createAsyncThunk(
  "support/updateSupportUsers",
  async ({ bookingId, teamLeaderId, userId }, { rejectWithValue }) => {
    try {
      if (!bookingId || !teamLeaderId || !userId) {
        throw new Error("Missing required parameters: bookingId, teamLeaderId, or userId");
      }

      console.log("Updating booking:", bookingId);
      console.log("Top-Level ID:", teamLeaderId);
      console.log("Team-Leader User ID:", userId);

      // Corrected API call with topLevelId instead of midLevelId
      const response = await putData(
        `/api/bookings/assign_by_team_leader/${bookingId}?teamLeaderId=${teamLeaderId}`, 
        { supportServiceId: userId } 
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

export const fetchSupportserviceUsers = createAsyncThunk(
  "support/fetchSupportserviceUsers",  // Fixed action type naming
  async (teamleaderId, { rejectWithValue }) => {
    try {
     
      const data = await getData(`/api/users/support/${teamleaderId}`);
      console.log('Data fetched:', data);
      return data;
    } catch (error) {
      console.error("Error fetching team lead users:", error);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);