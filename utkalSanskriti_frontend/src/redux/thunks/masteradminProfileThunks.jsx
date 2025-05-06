import { createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../api/api';


export const fetchMasterAdminProfileData = createAsyncThunk(
    "masterProfile/fetchMasterAdminProfileData",
    async (userId, { rejectWithValue }) => {
      try {
        const data = await getData(`/api/users/summary/${userId}`);
        console.log("lkkkk", data);
        return data;
        
      } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
      }
    }
  );