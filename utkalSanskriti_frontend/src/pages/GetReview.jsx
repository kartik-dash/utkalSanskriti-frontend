// import React, { useState, useEffect } from "react";
// import {API_URL} from "../redux/api/api";

// const GetReview = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//    // Pagination state
//       const [currentPage, setCurrentPage] = useState(1);
//       const reviewsPerPage = 5;
  
//       const filterReviews = reviews.filter((review) => {
//         const fullName = `${review.bookingId}`.toLowerCase();
//         return fullName.includes(searchQuery);
//       });

//       // Pagination logic
//   const indexOfLastReview = currentPage * reviewsPerPage;
//   const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
//   const currentReviews = filterReviews.slice(indexOfFirstReview, indexOfLastReview);
//   const totalPages = Math.ceil(filterReviews.length / reviewsPerPage);


//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };





//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await fetch(`${API_URL}/api/feedback`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch reviews");
//         }
//         const data = await response.json();
//         setReviews(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, []);

//   if (loading) return <div>Loading reviews...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="w-full mx-auto p-4">
//       <h2 className="text-base sm:text-2xl font-bold mb-4">User Reviews</h2>
//       {/* Search Bar */}
//       <div className="w-full mb-4 sm:w-auto">
//         <input
//           type="text"
//           placeholder="Search users..."
//           value={searchQuery}
//           onChange={handleSearchChange}
//           className="text-sm sm:text-base border p-2 w-full sm:w-60 rounded"
//         />
//       </div>

//       <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border border-gray-300 whitespace-nowrap">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="text-sm sm:text-base py-2 px-4 border-b">Feedback ID</th>
//             <th className="text-sm sm:text-base py-2 px-4 border-b">Booking ID</th>
//             <th className="text-sm sm:text-base py-2 px-4 border-b">Rating</th>
//             <th className="text-sm sm:text-base py-2 px-4 border-b">Comment</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentReviews.map((review) => (
//             <tr key={review.feedbackId} className="border-b">
//               <td className="text-xs sm:text-base py-2 px-4 text-center">{review.feedbackId}</td>
//               <td className="text-xs sm:text-base py-2 px-4 text-center">{review.bookingId}</td>
//               <td className="text-xs sm:text-base py-2 px-4 text-center">{review.rating}</td>
//               <td className="text-xs sm:text-base py-2 px-4 text-center">{review.comment}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
    
//     {/* Pagination Controls */}
//     {totalPages > 1 && (
//         <div className="mt-4 flex justify-center items-center gap-4">
//           <button
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//             disabled={currentPage === 1}
//             className="bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span className="text-sm">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//             disabled={currentPage === totalPages}
//             className="bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GetReview;




import React, { useState, useEffect } from "react";
import { API_URL } from "../redux/api/api";
import { FaStar } from "react-icons/fa";

const GetReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  // Filter logic
  const filteredReviews = reviews.filter((review) =>
    `${review.bookingId}`.toLowerCase().includes(searchQuery)
  );

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page on search
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/api/feedback`);
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
  }, []);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">User Reviews</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Booking ID..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="text-sm sm:text-base border p-2 w-full sm:w-60 rounded"
        />
      </div>

      {/* Reviews Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 whitespace-nowrap">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-sm sm:text-base py-2 px-4 border-b">Feedback ID</th>
              <th className="text-sm sm:text-base py-2 px-4 border-b">Booking ID</th>
              <th className="text-sm sm:text-base py-2 px-4 border-b">User Name</th>
              <th className="text-sm sm:text-base py-2 px-4 border-b">Rating</th>
              <th className="text-sm sm:text-base py-2 px-4 border-b">Comment</th>
            </tr>
          </thead>
          <tbody>
            {currentReviews.map((review) => (
              <tr key={review.feedbackId} className="border-b">
                <td className="text-xs sm:text-base py-2 px-4 text-center">{review.feedbackId}</td>
                <td className="text-xs sm:text-base py-2 px-4 text-center">{review.bookingId}</td>
                <td className="text-xs sm:text-base py-2 px-4 text-center">
                  {review.user?.firstName} {review.user?.lastName}
                </td>
                <td className="text-xs sm:text-base py-2 px-4 text-center flex justify-center items-center gap-1">
                  {review.rating}
                  <FaStar className="text-yellow-500" />
                </td>
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
            className="bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default GetReview;
