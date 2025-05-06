import { createAsyncThunk } from '@reduxjs/toolkit';
import { getData, putData } from '../api/api';



export const fetchTempleAdminUsers = createAsyncThunk(
  "templeadmin/fetchTempleAdminUsers",  // Fixed action type naming
  async (bookingId, { rejectWithValue }) => {
    try {
      console.log("jjjj",bookingId);
      
      console.log('Fetching team lead users for midLevelId:', bookingId);
      const data = await getData(`/api/bookings/${bookingId}/temple_admin`);
      console.error("Error fetching team lead users:", data);
      return data;
    } catch (error) {
      console.error("Error fetching team lead users:", error);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);




export const updateTempleAdminUsers = createAsyncThunk(
  "templeadmin/updatetempleAdmin",
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
        { templeAdminId: userId } 
      );
      console.log("Update successful:", response);
      return response; 
    } catch (error) {
      console.error("Error updating team lead user:", error);

      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

