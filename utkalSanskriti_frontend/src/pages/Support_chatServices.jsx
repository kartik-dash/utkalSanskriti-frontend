import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageClient, fetchMessageClient } from "../redux/thunks/supportchatThunks";

const SupportChatServices = () => {
  const dispatch = useDispatch();
  // Make sure your store combines the reducer under the key "supportchat"
  const { messages, fetchStatus } = useSelector((state) => state.supportchat);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  // Hardcoded sender and recipient IDs; replace with dynamic values as needed.
  const senderId = 1;
  const recipientId = 2;

  // Fetch conversation on component mount
  useEffect(() => {
    dispatch(fetchMessageClient({ senderId, recipientId }));
  }, [dispatch, senderId, recipientId]);

  // Auto-scroll to the latest message when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleTyping = (e) => {
    setInput(e.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = {
      senderId,
      recipientId,
      content: input,
    };

    console.log("🟢 Sending to API:", newMessage);
    await dispatch(sendMessageClient(newMessage));
    setInput("");
    // Optionally, refresh the conversation after sending a message:
    dispatch(fetchMessageClient({ senderId, recipientId }));
  };

  return (
    <div className="flex w-[524px] mx-auto flex-col h-screen bg-black">
      {/* Chat Header */}
      <div className="chat w-[524px] bg-gray-200">
        <div className="border-b p-4 flex items-center shadow-sm">
          <img
            src="https://i.pravatar.cc/40?img=3"
            alt="Support Avatar"
            className="rounded-full w-10 h-10 mr-3"
          />
          <div>
            <h2 className="text-lg font-semibold">Client</h2>
            <p className="text-sm text-gray-500">Customer Support Online</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto scroll-smooth p-4 bg-gray-600 space-y-4"
      >
        {fetchStatus === "loading" && (
          <p className="text-gray-300 text-center">Loading messages...</p>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end ${
              msg.senderId === senderId ? "justify-end" : "justify-start"
            }`}
          >
            {msg.senderId !== senderId && (
              <img
                src="https://i.pravatar.cc/40?img=2"
                alt="Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <div
              className={`p-3 max-w-xs rounded-lg shadow-sm ${
                msg.senderId === senderId
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-900 border"
              }`}
            >
              {msg.text}
              <div className="text-xs text-gray-500 mt-1">
                {msg.content || "Just now"}
              </div>
            </div>
            {msg.senderId === senderId && (
              <img
                src="https://i.pravatar.cc/40?img=2"
                alt="Avatar"
                className="w-8 h-8 rounded-full ml-2"
              />
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center text-gray-300 text-sm">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse mr-1"></span>
            <span>Support agent is typing...</span>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t bg-gray-200 flex items-center">
        <input
          type="text"
          value={input}
          onChange={handleTyping}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-3 bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600"
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default SupportChatServices;
