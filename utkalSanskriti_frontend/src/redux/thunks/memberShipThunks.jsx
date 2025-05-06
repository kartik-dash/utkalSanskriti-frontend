import { createAsyncThunk } from '@reduxjs/toolkit';
import { postData } from '../api/api'; // Ensure correct API function path


export const addMembership = createAsyncThunk(
    "membership/subscribe",
    async ({ clientId, membershipType, fee }, { rejectWithValue }) => {
      try {
        const payload = { clientId, membershipType, fee };
        const response = await postData("/api/memberships", payload);
  
        let orderData = response.razorpayOrderData;
        try {
          orderData = JSON.parse(orderData);
        } catch (e) {
          // orderData is already an object
        }
  
        return { orderData, membershipType };
      } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
      }
    }
  );