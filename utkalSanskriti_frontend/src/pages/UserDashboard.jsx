import React, { useEffect, useState } from 'react';
import {
  FaUser,
  FaMapMarkedAlt,
  FaBell,
  FaComments,
  FaExclamationTriangle,
  FaCalendarAlt
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfileData } from "../redux/thunks/userThunks";
import { fetchEvents } from "../redux/thunks/eventThunks";
import { sendSOSAlert } from "../redux/thunks/clientThunks";
import { getBookingDetails } from "../redux/thunks/bookingThunks";
import { useNavigate } from 'react-router-dom';  // Importing useNavigate from react-router-dom

export default function Dashboard() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const { bookings } = useSelector((state) => state.booking);
  const { userProfile } = useSelector((state) => state.user);
  const userId = useSelector((state) => state.auth?.userId);

  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sosMessage, setSosMessage] = useState("");
  const [sendEmailToGuide, setSendEmailToGuide] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState("");

  const navigate = useNavigate(); // Initialize navigate from useNavigate hook

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfileData(userId));
      dispatch(getBookingDetails(userId));
    }
  }, [dispatch, userId]);

  const [dummyBookings] = useState([
    { id: 1, place: "Konark Sun Temple", date: "2025-03-10" },
    { id: 2, place: "Jagannath Temple", date: "2025-03-12" },
    { id: 3, place: "Chilika Lake", date: "2025-03-15" },
  ]);

  const notifications = [
    "Weather alert: Possible rain tomorrow!",
    "New festival event near your location.",
    "Your booking for Jagannath Temple is confirmed!",
    "Traffic congestion near Puri Beach - Plan accordingly.",
  ];

  const chatMessages = [
    { sender: "Guide", message: "Hello! How can I assist you today?" },
    { sender: "You", message: "I need information about local transport." },
  ];

  const openSOSModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmitSOS = () => {
    if (!sosMessage.trim()) return setStatus("❌ Please enter a valid SOS message.");
    if (!selectedBookingId) return setStatus("❌ Please select a booking.");

    const sosData = {
      description: sosMessage,
      bookingId: selectedBookingId,
      sendEmailToGuide,
    };

    dispatch(sendSOSAlert({ ClientData: sosData, userId }));
    setStatus("🚨 SOS Alert Sent! Help is on the way.");
    setIsModalOpen(false);
    setSosMessage("");
    setSelectedBookingId("");
  };

  // New function to handle the redirection when "Chat Now" is clicked
  const handleChatNow = () => {
    navigate("/livechat"); // Redirect to the live chat page
  };

  return (
    <div className="container">
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Profile Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4">
          <FaUser className="text-blue-500 text-4xl" />
          <div>
            <h2 className="text-xl font-semibold">{userProfile?.fullName || "John Doe"}</h2>
            <p className="text-gray-500">{userProfile?.email || "email@example.com"}</p>
            <p className="text-gray-500">{userProfile?.contactNumber || "+91 9876543210"}</p>
          </div>
        </div>

        {/* Bookings Section - Upcoming Bookings */}
        {/* <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <FaCalendarAlt className="mr-2 text-purple-500" /> Upcoming Bookings
          </h3>

          {bookings?.length === 0 ? (
            <p className="text-gray-500">No bookings found.</p>
          ) : (
            bookings
              .filter((booking) => booking.bookingStatus === "PENDING" || booking.bookingStatus === "UPCOMING")
              .map((booking) => (
                <div key={booking.bookingId} className="p-3 border-b last:border-none">
                  <p className="font-medium text-gray-800">{booking.bookingItems[0]?.temple?.name}</p>
                  <p className="text-sm text-gray-600">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                  <span className="text-xs px-2 py-1 mt-1 inline-block rounded-full bg-yellow-100 text-yellow-700">
                    Status: {booking.bookingStatus}
                  </span>
                </div>
              ))
          )}
        </div> */}

        {/* Notifications */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <FaBell className="mr-2 text-yellow-500" /> Notifications
          </h3>
          {events.map((note, index) => (
            <div key={index} className="border rounded-xl p-4 bg-gray-50 hover:bg-white shadow transition duration-300 mb-2">
              <h4 className="font-semibold text-gray-800 mb-1">📍 {note.location}</h4>
              <p className="text-sm text-gray-600">{note.description}</p>
            </div>
          ))}
        </div>

        {/* Live Chat */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <FaComments className="mr-2 text-blue-500" /> Live Chat Support
          </h3>
          <div className="h-32 overflow-y-auto border p-2 rounded-lg bg-gray-50">
            {chatMessages.map((chat, index) => (
              <p key={index} className={`${chat.sender === "You" ? "text-right" : "text-left"} text-sm p-1`}>
                {chat.sender}: {chat.message}
              </p>
            ))}
          </div>
          {/* Updated "Chat Now" button */}
          <button
            onClick={handleChatNow}  // Call handleChatNow on click
            className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Chat Now
          </button>
        </div>

        {/* Emergency SOS */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <FaExclamationTriangle className="mr-2 text-red-500" /> Emergency SOS
          </h3>
          <button onClick={openSOSModal} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">
            Send SOS Alert
          </button>
          {status && <p className="text-sm text-green-700 mt-2">{status}</p>}
        </div>
      </div>

      {/* SOS Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Emergency Details</h2>

            <select
              value={selectedBookingId}
              onChange={(e) => setSelectedBookingId(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg mb-4"
            >
              <option value="">Select Booking</option>
              {bookings?.flatMap((booking) =>
                booking?.bookingItems?.map((item, index) => (
                  <option key={index} value={booking.bookingId}>
                    {item?.temple?.name}
                  </option>
                ))
              )}
            </select>

            <textarea
              placeholder="Describe your emergency..."
              className="w-full border p-2 rounded-lg mb-4"
              value={sosMessage}
              onChange={(e) => setSosMessage(e.target.value)}
            />

            <div className="mb-4 text-left">
              <label className="font-medium">Notify Guide:</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" checked={sendEmailToGuide === true} onChange={() => setSendEmailToGuide(true)} />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" checked={sendEmailToGuide === false} onChange={() => setSendEmailToGuide(false)} />
                  <span>No</span>
                </label>
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg">
                Cancel
              </button>
              <button onClick={handleSubmitSOS} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                Send SOS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
