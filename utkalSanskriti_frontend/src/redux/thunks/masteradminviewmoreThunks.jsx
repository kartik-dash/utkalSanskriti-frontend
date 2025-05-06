import { createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../api/api';


  export const fetchAdminUsers = createAsyncThunk(
    "viewAdmin/fetchadminusers",
    async ({ userId, role }, { rejectWithValue }) => {
      try {
        const data = await getData(`/api/users/created_by/${userId}/descendants?role=${role}`);
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
      }
    }
  );
