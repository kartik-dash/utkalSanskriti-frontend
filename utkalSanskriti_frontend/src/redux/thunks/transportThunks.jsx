import { createAsyncThunk } from "@reduxjs/toolkit";
import { postData, getData, putData } from "../api/api";

export const submitTransportRequest = createAsyncThunk(
  "transportHelp/submitTransportRequest",
  async (request, { rejectWithValue }) => {
    try {
      console.log("Request Payload:", request);
      const response = await postData("/api/transport_help/post", request);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


// Thunk to fetch all transport requests
export const fetchTransportRequests = createAsyncThunk(
  "transportHelp/fetchTransportRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData("/api/transport_help/all");
      console.log('rrrr:', response);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);



// Thunks to fetch teamleader transport request

export const fetchTransportRequestsTeamLeader = createAsyncThunk(
  "transportHelp/fetchTransportRequestsTeamLeader",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getData (`/api/transport_help/by_team_leader/${userId}`);
      return response;
    }
    catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


//Thunks to fetch supportservice transport request

export const fetchTransportRequestsSupport = createAsyncThunk(
  "transportHelp/fetchTransportRequestsSupport",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getData (`/api/transport_help/by_support/${userId}`);
      return response;
    }
    catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


//Thunks to fetch midlevel transport request

export const fetchTransportRequestsMidlevel = createAsyncThunk(
  "transportHelp/fetchTransportRequestsMidlevel",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getData (`/api/transport_help/by_mid_level/${userId}`);
      return response;
    }
    catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateTransportHelpStatus = ({ helpMessageId, supportServiceUserId, message }) => async (dispatch) => {
  try {
    const endpoint = `/api/transport_help/${helpMessageId}/close?supportServiceId=${supportServiceUserId}&reason=${encodeURIComponent(message)}`;
    await putData(endpoint, {}); // no body needed, pass empty object

    // Refresh support-side list after update
    dispatch(fetchTransportRequestsSupport(supportServiceUserId));
  } catch (error) {
    console.error("Error updating transport help status:", error.message || error);
  }
};

































































