import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitTransportRequest } from "../redux/thunks/transportThunks";
import { getBookingDetails } from "../redux/thunks/bookingThunks";

function TransportHelp() {
  const [request, setRequest] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const dispatch = useDispatch();
  const { successMessage, error, loading } = useSelector(
    (state) => state.transportHelp
  );
  const userId = useSelector((state) => state.auth.userId);
  const { bookings } = useSelector((state) => state.booking);

  const [transportData, setTransportData] = useState({
    bookingId: "",
    userId: "",
    message: "",
  });

  useEffect(() => {
    if (userId) {
      dispatch(getBookingDetails(userId));
      setTransportData((prev) => ({ ...prev, userId }));
    }
  }, [dispatch, userId]);

  const handlePlaceChange = (e) => {
    setTransportData({ ...transportData, bookingId: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user: { userId },
      bookingId: transportData.bookingId,
      message: request,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    await dispatch(submitTransportRequest(payload));

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    setRequest("");
    setTransportData({ bookingId: "", userId, message: "" });
  };

  return (
    <div className="m-6">
    <div className="max-w-lg w-full mx-auto p-4 sm:p-6 mt-6 sm:mt-10 text-center bg-white shadow-md rounded-xl">
      <h1 className="text-xl sm:text-2xl font-bold mb-2">
        Transport & Travel Help
      </h1>
      <p className="text-gray-600 text-sm sm:text-base mb-4">
        Need assistance? Describe your issue below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 text-left">
        <label className="block text-sm font-medium text-gray-700">
          Select a Booking:
        </label>
        <select
          name="bookingId"
          value={transportData.bookingId}
          onChange={handlePlaceChange}
          className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 text-sm"
          required
        >
          <option value="">Select a Place</option>
          {bookings?.flatMap((booking) =>
            booking?.bookingItems?.map((place) => (
              <option key={place?.temple?.id} value={booking.bookingId}>
                {place?.temple?.name}
              </option>
            ))
          )}
        </select>

        <label className="block text-sm font-medium text-gray-700">
          Request Message:
        </label>
        <textarea
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          placeholder="Enter your transport request..."
          rows={4}
          className="w-full border rounded-lg p-3 text-sm"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm sm:text-base"
          disabled={loading}
        >
          {loading ? "Sending..." : "Request Help"}
        </button>
      </form>

      {showSuccess && successMessage && (
        <p className="mt-4 text-green-600 text-sm">{successMessage}</p>
      )}
      {error && <p className="mt-4 text-red-600 text-sm">Error: {error}</p>}
    </div>
    </div>
  );
}

export default TransportHelp;
