import { createAsyncThunk } from "@reduxjs/toolkit";
import { postData } from '../api/api'; // Ensure correct API function path

export const submitFeedback = createAsyncThunk(
  "feedback/submitFeedback",
  async (feedbackData, { rejectWithValue }) => {
    try {
      const response = await postData("/api/complaints/post", feedbackData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
