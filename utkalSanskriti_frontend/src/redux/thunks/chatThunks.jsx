// src/redux/thunks/chatThunks.js
import axios from 'axios';
import { setMessages, addMessage } from '../slices/chatSlice';
import { API_URL } from "../api/api";

// Fetch entire chat history between sender and recipient
export const fetchChatHistory = ({ userId1, userId2 }) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/messages/conversation?userId1=${userId1}&userId2=${userId2}`
    );
    dispatch(setMessages(response.data));
  } catch (error) {
    console.error('Error fetching chat history:', error);
  }
};

// Send message via REST API (optional fallback to persist)
export const sendMessageAPI = (messageData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/api/messages`, messageData);
    dispatch(addMessage(response.data)); // Add to Redux store as well
  } catch (error) {
    console.error('Error sending message via API:', error);
  }
};
