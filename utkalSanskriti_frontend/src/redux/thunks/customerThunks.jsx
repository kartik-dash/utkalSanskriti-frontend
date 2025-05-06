import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../api/api";


export const fetchCustomerDataByStatus = createAsyncThunk(
  'customers/fetchByStatus',
  async (status, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const url = status === "all" ? "/api/users/clients" : `/api/users/status/${status}`;
      const response = await getData(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('respo:', response);
      return response;

    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);
