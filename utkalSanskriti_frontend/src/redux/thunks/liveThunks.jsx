import { createAsyncThunk } from "@reduxjs/toolkit";
import { postData, getData } from "../api/api";

export const fetchConversation = createAsyncThunk(
  "chat/fetchConversation",
  async ({ userId1, userId2 }, thunkAPI) => {
    try {
      const response = await getData(
        `/api/messages/conversation?userId1=${userId1}&userId2=${userId2}`
      );
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error fetching messages");
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ senderId, recipientId, content }, thunkAPI) => {
    try {
      const response = await postData("/api/messages", {
        senderId,
        recipientId,
        content,
      });
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error sending message");
    }
  }
);