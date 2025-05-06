import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingData } from "../redux/thunks/assignmidThunks";

const AllVisitorsManagement = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;
  const assignmid = useSelector((state) => state.assignmid?.assignmid || []);
  const { loading, error } = useSelector((state) => state.assignmid || {});

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(fetchBookingData());
    }
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter bookings based on search query
  const filteredUsers = assignmid.filter(
    (booking) =>
      booking.client?.firstName?.toLowerCase().includes(searchQuery) ||
      booking.client?.lastName?.toLowerCase().includes(searchQuery) ||
      booking.client?.contactNumber?.includes(searchQuery)
  );

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage));


  return (

    <div className="p-6">
      <h2 className="text-base sm:text-2xl font-bold mb-4">All Booking Visitors</h2>

      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="text-sm sm:text-base border p-2 w-60 rounded mb-4"
      />

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">
          Error: {error.message || "An unknown error occurred."}
        </p>
      ) : (
        <>
        <div className="createuser overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 whitespace-nowrap">
            <thead>
              <tr className="text-sm sm:text-base bg-gray-200">
                {[
                  "Full Name",
                  "Temple Name",
                  "District",
                  "Book Date",
                ].map((heading) => (
                  <th key={heading} className="border p-2">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((booking) => {
                  const bookingItem = booking.bookingItems?.[0]; // Get first booking item if exists
                  return (
                    <tr key={booking.bookingId} className="text-center">
                      <td className="text-xs sm:text-base border p-2">
                        {`${booking.client?.firstName || ""} ${
                          booking.client?.lastName || ""
                        }`}
                      </td>                      
                      <td className="text-xs sm:text-base border p-2">
                        {bookingItem?.temple?.name || "N/A"}
                      </td>
                      <td className="text-xs sm:text-base border p-2">
                        {bookingItem?.temple?.districtName || "N/A"}
                      </td>
                      <td className="text-xs sm:text-base border p-2">
                        {booking.bookingDate
                          ? new Date(booking.bookingDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                  
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="10"
                    className="border p-2 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
          <div className="mt-4 flex justify-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="bg-gray-300 text-sm sm:text-base text-gray-700 p-2 rounded"
            >
              Previous
            </button>
            <span className="text-sm sm:text-base">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="bg-gray-300 text-sm sm:text-base text-gray-700 p-2 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllVisitorsManagement;
