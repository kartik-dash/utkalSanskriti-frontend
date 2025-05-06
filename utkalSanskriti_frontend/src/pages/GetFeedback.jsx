
import React, { useState, useEffect } from 'react';
import { API_URL } from "../redux/api/api";

const GetFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 5;

  
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`${API_URL}/api/complaints/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch feedbacks');
        }
        const data = await response.json();
        setFeedbacks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page on new search
  };

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const fullName = `${feedback.user.firstName} ${feedback.user.lastName}`.toLowerCase();
    return fullName.includes(searchQuery);
  });

  // Pagination logic
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);
  const totalPages = Math.ceil(filteredFeedbacks.length / feedbacksPerPage);

  if (loading) {
    return <div className="text-center py-6">Loading feedbacks...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-6">Error: {error}</div>;
  }

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">User Feedback</h2>

      {/* Search Bar */}
      <div className="w-full sm:w-auto mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="text-sm sm:text-base border p-2 w-full sm:w-60 rounded"
        />
      </div>

      {/* Feedback Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 whitespace-nowrap">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-sm sm:text-base py-2 px-4 border-b">Complaint ID</th>
              <th className="text-sm sm:text-base py-2 px-4 border-b">User Name</th>
              <th className="text-sm sm:text-base py-2 px-4 border-b">Text</th>
              <th className="text-sm sm:text-base py-2 px-4 border-b">Created At</th>
            </tr>
          </thead>
          <tbody>
            {currentFeedbacks.map((feedback) => (
              <tr key={feedback.complaintId} className="border-b hover:bg-gray-50">
                <td className="text-xs sm:text-base py-2 px-4 text-center">{feedback.complaintId}</td>
                <td className="text-xs sm:text-base py-2 px-4 text-center">
                  {feedback.user.firstName} {feedback.user.lastName}
                </td>
                <td className="text-xs sm:text-base py-2 px-4 text-center">{feedback.text}</td>
                <td className="text-xs sm:text-base py-2 px-4 text-center">
                  {new Date(feedback.createdAt).toLocaleString()}
                </td>
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

export default GetFeedback;
