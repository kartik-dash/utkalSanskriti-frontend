import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { getBookingDetails, submitReview } from "../redux/thunks/bookingThunks"; 

function RateReview() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.reviews);
  const { bookings } = useSelector((state) => state.booking);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    if (userId) {
      dispatch(getBookingDetails(userId));
    }
  }, [dispatch, userId]);

  const [reviewData, setReviewData] = useState({
    bookingId: "",
    userId,
    rating: 0,
    comment: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handlePlaceChange = (e) => {
    setReviewData({ ...reviewData, bookingId: e.target.value });
  };

  const handleStarClick = (index) => {
    setReviewData({ ...reviewData, rating: index + 1 });
  };

  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(submitReview(reviewData));

    setShowSuccess(true); // Show success message
    setTimeout(() => setShowSuccess(false), 3000); // Hide after 3 seconds

    setReviewData({ bookingId: "", rating: 0, comment: "" });
  };

  return (
    <div className="m-6">
    <div className="max-w-3xl mt-6 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-6 text-gray-800">
        Rate & Review Places
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Place Name Dropdown */}
        <select
          name="bookingId"
          value={reviewData.bookingId}
          onChange={handlePlaceChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
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

        {/* Review Comment */}
        <textarea
          name="comment"
          value={reviewData.comment}
          onChange={handleChange}
          placeholder="Write your review..."
          className="w-full px-4 py-2 border rounded-lg h-24 focus:ring focus:ring-blue-300"
          required
        />

        {/* Star Rating */}
        <div className="flex justify-center space-x-2">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`text-3xl cursor-pointer ${
                index < reviewData.rating ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => handleStarClick(index)}
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full text-lg font-semibold"
        >
          Submit Review
        </button>
      </form>

      {/* Success Message */}
      {showSuccess && (
        <div className="text-center p-4 bg-green-200 text-green-700 rounded-md mt-4">
          ✅ Message Sent Successfully!
        </div>
      )}

      {/* Submission Status */}
      {status === "loading" && <p className="text-center text-gray-500">Submitting...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
    </div>
  );
}

export default RateReview;
