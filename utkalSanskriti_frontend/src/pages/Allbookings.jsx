
import React, { useEffect, useState } from "react";
import { API_URL } from "../redux/api/api";

const Allbookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const bookingPerPage = 10;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filterbookings = bookings.filter((booking) => {
    const fullName = `${booking.bookingId}`.toLowerCase();
    return fullName.includes(searchQuery);
  });


  // Pagination logic
  const indexOfLastbooking = currentPage * bookingPerPage;
  const indexOfFirstbooking = indexOfLastbooking - bookingPerPage;
  const currentbookings = filterbookings.slice(indexOfFirstbooking, indexOfLastbooking);
  const totalPages = Math.ceil(filterbookings.length / bookingPerPage);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/bookings/associations/all`)
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching data");
        setLoading(false);
      });
  }, []);

  const handleShowDetails = (role, user) => {
    if (user) {
      setSelectedRole(role);
      setSelectedUser(user);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setSelectedRole("");
  };

  const renderUserButton = (role, user) => {
    return user ? (
      <button
        className="text-blue-600 hover:underline"
        onClick={() => handleShowDetails(role, user)}
      >
        {user.firstName} {user.lastName}
      </button>
    ) : (
      <span className="text-gray-500">N/A</span>
    );
  };

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-base sm:text-2xl font-bold mb-4">All Bookings</h2>

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

      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 whitespace-nowrap">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-sm sm:text-base border p-2">Booking ID</th>
                <th className="text-sm sm:text-base border p-2">Client</th>
                <th className="text-sm sm:text-base border p-2">Top Level</th>
                <th className="text-sm sm:text-base border p-2">Mid Level</th>
                <th className="text-sm sm:text-base border p-2">Team Leader</th>
                <th className="text-sm sm:text-base border p-2">Support Service</th>
                <th className="text-sm sm:text-base border p-2">Temple Admin</th>
                <th className="text-sm sm:text-base border p-2">Guide</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                currentbookings.map((booking) => (
                  <tr key={booking.bookingId} className="text-center">
                    <td className="text-xs sm:text-base border p-2">{booking.bookingId}</td>
                    <td className="text-xs sm:text-base border p-2">
                      {renderUserButton("Client", booking.client)}
                    </td>
                    <td className="text-xs sm:text-base border p-2">
                      {renderUserButton("Top Level", booking.topLevel)}
                    </td>
                    <td className="text-xs sm:text-base border p-2">
                      {renderUserButton("Mid Level", booking.midLevel)}
                    </td>
                    <td className="text-xs sm:text-base border p-2">
                      {renderUserButton("Team Leader", booking.teamLeader)}
                    </td>
                    <td className="text-xs sm:text-base border p-2">
                      {renderUserButton(
                        "Support Service",
                        booking.supportService
                      )}
                    </td>
                    <td className="text-xs sm:text-base border p-2">
                      {renderUserButton("Temple Admin", booking.templeAdmin)}
                    </td>
                    <td className="text-xs sm:text-base border p-2">
                      {renderUserButton("Guide", booking.assignedGuide)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="border p-2 text-center">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Popup */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 m-6 rounded shadow-lg w-96">
            <h3 className="text-sm sm:text-xl font-bold mb-4">{selectedRole} Details</h3>
            <div className="space-y-2">
              <p className="text-sm sm:text-base">
                <strong>ID:</strong> {selectedUser.userId}
              </p>
              <p className="text-sm sm:text-base">
                <strong>Name:</strong> {selectedUser.firstName}{" "}
                {selectedUser.lastName}
              </p>
              <p className="text-sm sm:text-base">
                <strong>Role:</strong> {selectedUser.role}
              </p>
              <p className="text-sm sm:text-base">
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p className="text-sm sm:text-base">
                <strong>Contact:</strong> {selectedUser.contactNumber}
              </p>
              <p className="text-sm sm:text-base">
                <strong>Status:</strong> {selectedUser.status}
              </p>
              {selectedUser.createdAt && (
                <p className="text-sm sm:text-base">
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedUser.createdAt).toLocaleString()}
                </p>
              )}
            </div>
            <button
              className="mt-4 bg-red-500 text-sm sm:text-base text-white px-2 py-1 sm:px-4 sm:py-2 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
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

export default Allbookings;
