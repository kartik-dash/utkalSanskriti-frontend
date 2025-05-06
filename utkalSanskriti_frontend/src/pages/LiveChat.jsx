import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { fetchChatHistory, sendMessageAPI } from "../redux/thunks/chatThunks";
import { receiveMessage } from "../redux/slices/chatSlice";
import { getBookingDetails } from "../redux/thunks/bookingThunks";

let stompClient = null;

const LiveChat = () => {

  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chat);
  const { userId } = useSelector((state) => state.auth);
  const { bookings } = useSelector((state) => state.booking);
  const [message, setMessage] = useState("");
  const scrollRef = useRef();

  const recipientId =
    bookings?.find((b) => b.supportServiceId !== null)?.supportServiceId || null;

  // Ensure API_URL is correctly set
  const API_URL = process.env.REACT_APP_API_URL; // Or replace with actual API URL

  useEffect(() => {
    if (userId) {
      dispatch(getBookingDetails(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId && recipientId) {
      dispatch(fetchChatHistory({ userId1: userId, userId2: recipientId }));
    }
  }, [dispatch, userId, recipientId]);

  useEffect(() => {
    if (!userId || !recipientId || !API_URL) return;

    const socket = new SockJS(`${API_URL}/ws`); // ✅ FIXED TEMPLATE STRING
    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Connected to WebSocket");

        stompClient.subscribe("/topic/messages", (message) => {
          try {
            const data = JSON.parse(message.body);

            if (
              (data.senderId === userId && data.recipientId === recipientId) ||
              (data.senderId === recipientId && data.recipientId === userId)
            ) {
              dispatch(receiveMessage(data));
            }
          } catch (error) {
            console.error("Error parsing WebSocket message:", error);
          }
        });
      },
      onStompError: (err) => console.error("❌ WebSocket error:", err),
      onWebSocketClose: () => console.log("🛑 WebSocket Disconnected"),
    });

    stompClient.activate();

    return () => {
      if (stompClient && stompClient.active) {
        stompClient.deactivate();
      }
    };
  }, [userId, recipientId, dispatch, API_URL]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const messageData = {
      senderId: userId,
      recipientId,
      content: message,
      timestamp: new Date().toISOString(),
    };

    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: "/app/chat",
        body: JSON.stringify(messageData),
      });
    }

    dispatch(sendMessageAPI(messageData));

    setMessage("");
  };

  return (
    <div className="max-w-3xl mt-6 mx-auto p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-4">Live Chat</h2>

      <div ref={scrollRef} className="h-96 overflow-y-auto bg-gray-100 p-4 rounded-lg mb-4">
        {messages?.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg, index) => {
            const isSender = msg.senderId?.toString() === userId?.toString();
            return (
              <div key={index} className={`flex mb-3 ${isSender ? "justify-end" : "justify-start"}`}>
                <div
                  className={`p-3 rounded-xl max-w-[75%] shadow-md ${
                    isSender ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs text-right mt-1 opacity-70">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default LiveChat; 
