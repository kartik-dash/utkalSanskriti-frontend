import { createAsyncThunk } from "@reduxjs/toolkit";
import { postData, getData,deleteData } from "../api/api";

export const submitEvent = createAsyncThunk(
  "event/submitEvent",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await postData("/api/events/add-with-image", formData, {
        "Content-Type": "multipart/form-data",
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchEvents = createAsyncThunk(
  'event/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData('/api/events'); // Update endpoint as per your backend
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      await deleteData(`/api/events/${eventId}`);
      return eventId; // Return eventId to update Redux store
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);