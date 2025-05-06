import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../redux/api/api";

const PoojaListing = () => {
  // Get the userId from Redux state
  const userId = useSelector((state) => state.auth?.userId);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
      
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const poojaListingPerPage = 5;
    
      const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
      };
    
      const filterbookings = bookings.filter((booking) => {
        const fullName = `${booking.bookingId}`.toLowerCase();
        return fullName.includes(searchQuery);
      });


  // Pagination logic
  const indexOfLastPoojaList = currentPage * poojaListingPerPage;
  const indexOfFirstPoojaList = indexOfLastPoojaList - poojaListingPerPage;
  const currentPoojalist = filterbookings.slice(indexOfFirstPoojaList, indexOfLastPoojaList);
  const totalPages = Math.ceil(filterbookings.length / poojaListingPerPage);

  useEffect(() => {
    if (!userId) {
      setError("User ID not found");
      setLoading(false);
      return;
    }
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/bookings/supportService/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Pooja Listings</h2>
      {/* Search Bar */}
      <div className="w-full mb-4 sm:w-auto">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="text-sm sm:text-base border p-2 w-full sm:w-60 rounded"
        />
      </div>
      <div className="createuser overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 whitespace-nowrap">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-sm sm:text-base border p-2">Booking ID</th>
            <th className="text-sm sm:text-base border p-2">Temple Name</th>
            <th className="text-sm sm:text-base border p-2">Book Date</th>
            <th className="text-sm sm:text-base border p-2">Pooja Selected</th>
            <th className="text-sm sm:text-base border p-2">Rudrabhisekh Selected</th>
            <th className="text-sm sm:text-base border p-2">Prasad Selected</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            currentPoojalist.map((booking) => {
              // Display only the first booking item (if available)
              const bookingItem = booking.bookingItems[0];
              return (
                <tr key={booking.bookingId} className="text-center">
                  <td className="text-xs sm:text-base border p-2">{booking.bookingId}</td>
                  <td className="text-xs sm:text-base border p-2">
                    {bookingItem?.temple?.name || "N/A"}
                  </td>
                  <td className="text-xs sm:text-base border p-2">
                    {booking.bookingDate
                      ? new Date(booking.bookingDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="text-xs sm:text-base border p-2">
                    {bookingItem?.poojaSelected ? "Yes" : "No"}
                  </td>
                  <td className="text-xs sm:text-base border p-2">
                    {bookingItem?.rudrabhisekhSelected ? "Yes" : "No"}
                  </td>
                  <td className="text-xs sm:text-base border p-2">
                    {bookingItem?.prasadSelected ? "Yes" : "No"}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="border p-2 text-center">
                No bookings found.
              </td>
            </tr>
          )}
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

export default PoojaListing;
