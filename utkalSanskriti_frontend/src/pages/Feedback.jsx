import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitFeedback } from "../redux/thunks/feedbackThunks";
import { getBookingDetails } from "../redux/thunks/bookingThunks";

function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState("");

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userId);
  const { bookings } = useSelector((state) => state.booking);

  useEffect(() => {
    if (userId) {
      dispatch(getBookingDetails(userId));
    }
  }, [dispatch, userId]);

  const handleSubmit = (e) => {
      e.preventDefault();
      if (!feedback.trim() || !selectedBookingId) return;
  
      const payload = {
        user: {
          userId,
        },
        // userId,
        bookingId: selectedBookingId,
        text: feedback,
      };
  
      dispatch(submitFeedback(payload));
  
      // Reset form
      setFeedback("");
      setSelectedBookingId("");
  
      // ✅ Show browser alert
      alert("Feedback sent successfully!");
    };

  return (
    <div className="m-6">
    <div className="max-w-3xl mt-6 bg-white mx-auto p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-6">Feedback & Complaints</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Booking Select Dropdown */}
        <select
          value={selectedBookingId}
          onChange={(e) => setSelectedBookingId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        >
          <option value="">-- Select Booking --</option>
          {bookings && bookings.length > 0 ? (
            bookings.map((booking) => {
              const templeNames = booking.bookingItems
                ?.map((item) => item?.temple?.name)
                .filter(Boolean)
                .join(", ");
              return (
                <option key={booking.bookingId} value={booking.bookingId}>
                  {templeNames || `Booking ID: ${booking.bookingId}`}
                </option>
              );
            })
          ) : (
            <option disabled>No bookings found</option>
          )}
        </select>

        {/* Feedback Textarea */}
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback or complaints..."
          className="w-full px-4 py-2 border rounded-lg h-24"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
        >
          Submit Feedback
        </button>
      </form>
    </div>
    </div>
  );
}

export default Feedback;
