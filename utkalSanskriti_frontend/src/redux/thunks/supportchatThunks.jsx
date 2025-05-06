import { createAsyncThunk } from "@reduxjs/toolkit";
import { postData, getData } from "../api/api";

// Send Message (POST)
export const sendMessageClient = createAsyncThunk(
    "supportchat/sendMessageClient",
    async (messageData, { rejectWithValue }) => {
      try {
        console.log("🟢 Sending message:", messageData);
  
        // Send message request to the API (without authentication)
        const data = await postData("/api/messages", messageData);
  
        console.log("✅ Message sent successfully:", data);
        return data;
      } catch (error) {
        console.error("❌ Error sending message:", error);
        return rejectWithValue(error.response?.data || { message: error.message });
      }
    }
  );

// Fetch Conversation (GET)
export const fetchMessageClient = createAsyncThunk(
  "supportchat/fetchMessageClient",
  async ({ senderId, recipientId }, { rejectWithValue }) => {
    try {
      if (!senderId || !recipientId) throw new Error("User IDs are required.");
      console.log(`Fetching conversation between ${senderId} and ${recipientId}`);

      const data = await getData(`/api/messages/conversation?userId1=${recipientId}&userId2=${senderId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);