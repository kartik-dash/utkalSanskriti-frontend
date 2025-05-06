import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../api/api";

export const fetchDomestic = createAsyncThunk(
  "domestic/fetchDomestic",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData("/api/users/clients/by_country");
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const fetchDomesticCount = createAsyncThunk(
  "domestic/fetchDomesticCount",
  async ( _, { rejectWithValue }) => {
    try {
      const data = await getData ("/api/users/clients/count/india");
      return data;
    }
    catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const fetchAllVisitorsManagementCount = createAsyncThunk(
  "AllManagement/fetchAllVisitorsManagementCount",
  async ( _, { rejectWithValue }) => {
    try {
      const data = await getData ("/api/bookings/count");
      return data;
    }
    catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


