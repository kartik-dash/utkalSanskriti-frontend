
import React, { useState, useEffect, useRef } from "react";
import { TfiSharethis } from "react-icons/tfi";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaComments, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveMessage } from "../../redux/slices/chatSlice";
import { fetchChatHistory, sendMessageAPI } from "../../redux/thunks/chatThunks";
import { getBookingDetails } from "../../redux/thunks/bookingThunks";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // ✅ FIX API_URL (Use .env)

const Slideshow = ({ images }) => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chat);
  const { userId } = useSelector((state) => state.auth);
  const { bookings } = useSelector((state) => state.booking);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const scrollRef = useRef(null);
  let stompClient = useRef(null);

  const recipientId = bookings?.find((b) => b.supportServiceId !== null)?.supportServiceId || null;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

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
    if (!userId || !recipientId) return;

    const socket = new SockJS(`${API_URL}/ws`);
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Connected to WebSocket");
        stompClient.current.subscribe("/topic/messages", (message) => {
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

    stompClient.current.activate();

    return () => {
      if (stompClient.current && stompClient.current.active) {
        stompClient.current.deactivate();
      }
    };
  }, [userId, recipientId, dispatch]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleChatClick = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setShowChat(true);
    } else {
      setShowPopup(true);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const messageData = {
      senderId: userId,
      recipientId,
      content: message,
      timestamp: new Date().toISOString(),
    };

    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.publish({
        destination: "/app/chat",
        body: JSON.stringify(messageData),
      });
    }

    dispatch(sendMessageAPI(messageData));
    setMessage("");
  };

  return (
    <>
      <div className="relative w-full h-[600px]">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="w-full h-full object-cover rounded-lg shadow-lg"
          loading="lazy"
        />
        <div className="absolute bottom-5 left-5 text-white bg-black bg-opacity-50 p-2 sm:p-4 rounded-lg shadow-md">
          <p className="text-sm sm:text-lg font-semibold">{images[currentIndex].caption}</p>
        </div>

        {/* Share Button */}
        <div className="fixed top-80 right-0 group z-50">
          <div className="bg-white p-1 sm:p-3 rounded-full shadow-lg cursor-pointer">
            <TfiSharethis className="text-blue-500 text-xl" />
          </div>
          <ul className="absolute right-0 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 p-3 rounded-lg shadow-lg transition-all duration-500 ease-in-out transform">
            <li className="p-1 sm:p-3 rounded-full bg-white m-2 hover:bg-gray-100 transition-all duration-300">
                <Link to="https://facebook.com">
                  <FaFacebook className="text-blue-600 text-xl" />
                </Link>
            </li>
            <li className="p-1 sm:p-3 rounded-full bg-white m-2 hover:bg-gray-100 transition-all duration-300">
                <Link to="https://instagram.com">
                  <FaInstagram className="text-pink-600 text-xl" />
                </Link>
            </li>
            <li className="p-1 sm:p-3 rounded-full bg-white m-2 hover:bg-gray-100 transition-all duration-300">
                <Link to="https://twitter.com">
                  <FaTwitter className="text-blue-400 text-xl" />
                </Link>
            </li>
            <li className="p-1 sm:p-3 rounded-full bg-white m-2 hover:bg-gray-100 transition-all duration-300">
                <Link to="https://youtube.com">
                  <FaYoutube className="text-red-600 text-xl" />
                </Link>
            </li>
          </ul>
        </div>

        {/* Chat Button */}
        <div className="fixed bottom-20 right-0 group z-50">
          <div onClick={handleChatClick} className="bg-white p-1 sm:p-3 rounded-full shadow-lg cursor-pointer">
            <FaComments className="text-green-500 text-xl" />
          </div>
        </div>
      </div>

      {/* Chat Window */}
      {showChat && (
        <div className="fixed right-5 bottom-20 w-80 h-104 bg-white shadow-lg rounded-lg p-4 z-50 border">
          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-lg font-semibold">Live Chat</p>
            <FaTimes className="text-gray-500 cursor-pointer" onClick={() => setShowChat(false)} />
          </div>
          <div className="h-72 overflow-y-auto p-2" ref={scrollRef}>
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                  msg.senderId === userId ? 'justify-end' : 'justify-start'
                } my-2`}
                              >
                  <div
                  className={`p-2 rounded-lg max-w-[70%] ${
                  msg.senderId === userId
                    ? 'bg-blue-500 text-white' // User's messages
                    : 'bg-gray-300 text-black' // Support's messages
                }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">Start chatting...</p>
            )}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded-full pl-4 pr-12 focus:outline-none focus:border-blue-500"
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600 transition-colors -ml-12"
              onClick={handleSendMessage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Login Required Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold mb-4">Please log in to access chat</p>
            <div className="flex justify-center space-x-4">
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Login</button>
              </Link>
              <button onClick={() => setShowPopup(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Slideshow;
