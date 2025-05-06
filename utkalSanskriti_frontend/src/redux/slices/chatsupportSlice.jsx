import { createSlice } from "@reduxjs/toolkit";
import { sendMessageClient, fetchMessageClient } from "../thunks/supportchatThunks";

const chatSlice = createSlice({
  name: "supportchat",
  initialState: {
    messages: [],
    fetchStatus: "idle",
    updateStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessageClient.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchMessageClient.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.messages = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchMessageClient.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload;
      })


      .addCase(sendMessageClient.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(sendMessageClient.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.messages.push(action.payload); // Append new message to state
      })
      .addCase(sendMessageClient.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default chatSlice.reducer;


