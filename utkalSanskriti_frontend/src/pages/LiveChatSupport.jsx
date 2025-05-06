// import { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchConversation, sendMessage } from "../redux/thunks/liveThunks";
// // import { getBookingDetails } from "../redux/thunks/bookingThunks";
// import { useParams } from "react-router-dom";
// function LiveChat() {
//   const dispatch = useDispatch();
//   const { messages = [], loading } = useSelector((state) => state.chat || {});
//   const [message, setMessage] = useState("");
//   const scrollRef = useRef(null);

//   const userId = useSelector((state) => state.auth?.userId);
//   // const { bookings = [] } = useSelector((state) => state.booking || {});
//   // const { recipientId } = useParams();
//   const { recipientId } = useParams();
//   // console.log('recep:', clientId);
//   console.log('userr:', userId);
//   // const recipientId =
//   //   bookings.find((b) => b.supportServiceId !== null)?.supportServiceId || null;

//   // Load conversation
//   useEffect(() => {
//     if (userId && recipientId) {
//       dispatch(fetchConversation({ userId1: userId, userId2: recipientId }));
//     }
//   }, [dispatch, userId, recipientId]);

//   // Fetch bookings
//   // useEffect(() => {
//   //   if (userId) {
//   //     dispatch(getBookingDetails(userId));
//   //   }
//   // }, [dispatch, userId]); 

//   // Scroll to bottom on new message
//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleSend = () => {
//     if (!message.trim()) return;
//     dispatch(sendMessage({ senderId: userId, recipientId, content: message }));
//     setMessage("");
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-2xl">
//       <h2 className="text-2xl font-bold mb-4 text-center">Live Chat</h2>

//       <div
//         ref={scrollRef}
//         className="h-80 overflow-y-auto bg-gray-100 p-4 rounded-lg mb-4"
//       >
//         {loading ? (
//           <p className="text-center">Loading conversation...</p>
//         ) : messages.length === 0 ? (
//           <p className="text-center text-gray-500">No messages yet.</p>
//         ) : (
//           messages.map((msg, idx) => {
//             const isSentByUser =
//               msg.senderId?.toString() === userId?.toString();

//             return (
//               <div
//                 key={idx}
//                 className={`flex mb-3 ${
//                   isSentByUser ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`p-3 rounded-xl max-w-[75%] shadow-sm ${
//                     isSentByUser
//                       ? "bg-blue-600 text-white"
//                       : "bg-gray-300 text-gray-900"
//                   }`}
//                 >
//                   <p className="text-sm">{msg.content}</p>
//                   <p className="text-xs text-right mt-1 opacity-70">
//                     {new Date(msg.timestamp).toLocaleTimeString()}
//                   </p>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>

//       <div className="flex">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={handleSend}
//           className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default LiveChat;
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatHistory, sendMessageAPI } from "../redux/thunks/chatThunks";
import { receiveMessage } from "../redux/slices/chatSlice";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useParams } from "react-router-dom";
import {API_URL} from "../redux/api/api";

let stompClient = null;

const LiveChatSupport = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chat);
  const { userId } = useSelector((state) => state.auth); // logged-in user's ID
  const { recipientId } = useParams(); // Support service or other participant's ID

  const [message, setMessage] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    if (userId && recipientId) {
      dispatch(fetchChatHistory({ userId1: userId, userId2: recipientId }));
    }
  }, [dispatch, userId, recipientId]);

  // WebSocket Connection
  useEffect(() => {
    if (userId) {
      const socket = new SockJS(`${API_URL}/ws`); // Adjust as per your backend URL

      stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        onConnect: () => {
          console.log("WebSocket Connected ✅");

          // Subscribe to user-specific queue for incoming messages
          stompClient.subscribe(`/user/${userId}/queue/messages`, (payload) => {
            const incomingMessage = JSON.parse(payload.body);

            const isRelevant =
              (incomingMessage.senderId === recipientId && incomingMessage.recipientId === userId) ||
              (incomingMessage.senderId === userId && incomingMessage.recipientId === recipientId);

            if (isRelevant) {
              dispatch(receiveMessage(incomingMessage));
            }
          });
        },
        onStompError: (frame) => {
          console.error("STOMP error ❌", frame);
        },
      });

      stompClient.activate();
    }

    return () => {
      if (stompClient && stompClient.active) {
        stompClient.deactivate();
      }
    };
  }, [userId, recipientId, dispatch]);

  // Auto scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const msgObj = {
      senderId: userId,
      recipientId,
      content: message,
      timestamp: new Date().toISOString(),
    };

    // Send via WebSocket
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: "/app/chat",
        body: JSON.stringify(msgObj),
      });
    }

    // Persist to DB via REST API
    dispatch(sendMessageAPI(msgObj));

    setMessage("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-4">Live Chat</h2>

      <div ref={scrollRef} className="h-96 overflow-y-auto bg-gray-100 p-4 rounded-lg mb-4">
        {messages.length === 0 ? (
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

export default LiveChatSupport;
