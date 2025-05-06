// src/redux/slices/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    loading: false,
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
      state.loading = false;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setMessages,
  addMessage,
  receiveMessage,
  clearMessages,
  setLoading,
} = chatSlice.actions;

export default chatSlice.reducer;
