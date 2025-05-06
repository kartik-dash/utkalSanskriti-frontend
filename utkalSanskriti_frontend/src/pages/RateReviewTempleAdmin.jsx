import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../redux/api/api";

const RateReviewTempleAdmin = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.auth?.userId);

  // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 5;

    // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviewsTempleAdmin = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);


  useEffect(() => {
    if (!userId) {
      setError("User ID is required");
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/api/feedback/temple_admin/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [userId]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
      <div className="createuser overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 whitespace-nowrap">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-sm sm:text-base py-2 px-4 border-b">Feedback ID</th>
            <th className="text-sm sm:text-base py-2 px-4 border-b">Booking ID</th>
            {/* <th className="py-2 px-4 border-b">User ID</th> */}
            <th className="text-sm sm:text-base py-2 px-4 border-b">Rating</th>
            <th className="text-sm sm:text-base py-2 px-4 border-b">Comment</th>
          </tr>
        </thead>
        <tbody>
          {currentReviewsTempleAdmin.map((review) => (
            <tr key={review.feedbackId} className="border-b">
              <td className="text-xs sm:text-base py-2 px-4 text-center">{review.feedbackId}</td>
              <td className="text-xs sm:text-base py-2 px-4 text-center">{review.bookingId}</td>
              {/* <td className="py-2 px-4 text-center">{review.userId}</td> */}
              <td className="text-xs sm:text-base py-2 px-4 text-center">{review.rating}</td>
              <td className="text-xs sm:text-base py-2 px-4 text-center">{review.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* Pagination Controls */}
    {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 text-xs sm:text-base px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 text-xs sm:text-base px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RateReviewTempleAdmin;


