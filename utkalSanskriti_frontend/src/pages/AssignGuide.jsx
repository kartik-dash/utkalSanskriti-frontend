import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGuideUsers, fetchTotalGuideUsers, updateGuideUsers } from "../redux/thunks/GuideThunks";

const AssignGuide = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [assignedUsers, setAssignedUsers] = useState({});

  const usersPerPage = 5;
  const UserId = useSelector((state) => state.auth?.userId);
  console.log('useeee:', UserId);
  const assignguide = useSelector((state) => state.guide?.guide || []);
  const { loading, error } = useSelector((state) => state.assignguide || {});

  // Mid-level user state
  // const teamLeadlUsers = useSelector((state) => state.teamLead?.teamLead || []);
  const { totalguide } = useSelector((state) => state.guide);
  // console.log('teammmss:', teamLeadlUsers);
  const guideLoading = useSelector((state) => state.guide?.loading);
  const guideError = useSelector((state) => state.guide?.error);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(fetchGuideUsers(UserId));
    }
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter users based on search query
  const filteredUsers = assignguide.filter(
    (booking) =>
      booking.client?.firstName?.toLowerCase().includes(searchQuery) ||
      booking.client?.lastName?.toLowerCase().includes(searchQuery) ||
      booking.client?.email?.toLowerCase().includes(searchQuery) ||
      booking.client?.contactNumber?.includes(searchQuery)
  );

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage));

  const handleAssignClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
    if (UserId) {
      dispatch(fetchTotalGuideUsers(UserId));
    }
  };


  const handleSelectUser = async (user) => {
    if (!selectedBooking || !UserId) return;
  
    const { bookingId } = selectedBooking;
    const templeAdminId = UserId; // Assuming logged-in user is the top-level user
  
    try {
      const response = await dispatch(updateGuideUsers({ bookingId, templeAdminId, userId: user.userId })).unwrap();
  
      console.log("Update response:", response);
  
      // Update UI immediately
      setAssignedUsers((prev) => ({
        ...prev,
        [bookingId]: user, // Save assigned user in local state
      }));
  
      // ✅ Fetch updated booking data after assignment
      dispatch(fetchGuideUsers(UserId));
  
      setShowModal(false); // Close modal after assignment
    } catch (error) {
      console.error("Failed to assign mid-level user:", error);
    }
  };


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Booking Customers</h2>

      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="border p-2 w-60 rounded mb-4"
      />

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message || "An unknown error occurred."}</p>
      ) : (
        <>
         <div className="createuser overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 whitespace-nowrap">
            <thead>
              <tr className="text-sm sm:text-base text-xs sm:text-base bg-gray-200">
                {["Full Name", "Email", "Contact Number", "Registration Date", "Temple Name", "District", "Location", "Booking Status", "Book Date", "Action"].map((heading) => (
                  <th key={heading} className="border p-2">{heading}</th>
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
            {`${booking.client?.firstName || ""} ${booking.client?.lastName || ""}`}
          </td>
          <td className="text-xs sm:text-base border p-2">{booking.client?.email || "N/A"}</td>
          <td className="text-xs sm:text-base border p-2">{booking.client?.contactNumber || "N/A"}</td>
          <td className="text-xs sm:text-base border p-2">
            {booking.client?.createdAt ? new Date(booking.client.createdAt).toLocaleDateString() : "N/A"}
          </td>
          <td className="text-xs sm:text-base border p-2">{bookingItem?.temple?.name || "N/A"}</td> {/* Temple Name */}
          <td className="text-xs sm:text-base border p-2">{bookingItem?.temple?.districtName || "N/A"}</td> {/* District */}
          <td className="text-xs sm:text-base border p-2">{bookingItem?.temple?.location || "N/A"}</td> {/* Location */}
          <td className="text-xs sm:text-base border p-2">{booking.bookingStatus || "N/A"}</td> {/* Status */}
          <td className="text-xs sm:text-base border p-2">{booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "N/A"}</td>
          <td className="text-xs sm:text-base border p-2">
            <button
              onClick={() => handleAssignClick(booking)}
              disabled={booking.bookingStatus !== "UPDATED_BY_TEAM_LEADER"}
              className={`${
                booking.bookingStatus !== "UPDATED_BY_TEAM_LEADER"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 text-white"
              } p-2 rounded`}
            >
              {booking.bookingStatus !== "UPDATED_BY_TEAM_LEADER" ? "Assigned" : "Assign"}
            </button>
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="10" className="border p-2 text-center text-gray-500">
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
              className="bg-gray-300 text-xs sm:text-base text-gray-700 p-2 rounded"
            >
              Previous
            </button>
            <span className="text-xs sm:text-base">Page {currentPage} of {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="bg-gray-300 text-xs sm:text-base text-gray-700 p-2 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-[840px]">
            <h3 className="text-xl font-bold mb-4">Assign Booking</h3>
            <p className="mb-4">Select a guide user for {selectedBooking?.client?.firstName}.</p>

            {guideLoading ? (
              <p>Loading middle-level users...</p>
            ) : guideError ? (
              <p className="text-red-500">Error: {guideError}</p>
            ) : (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="text-sm sm:text-base border p-2">Full Name</th>
                    <th className="text-sm sm:text-base border p-2">Email</th>
                    <th className="text-sm sm:text-base border p-2">Contact Number</th>
                    <th className="text-sm sm:text-base border p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {totalguide.length > 0 ? (
                    totalguide.map((user) => (
                      <tr key={user.userId} className="text-center">
                        <td className="text-xs sm:text-base border p-2">{`${user.firstName} ${user.lastName}`}</td>
                        <td className="text-xs sm:text-base border p-2">{user.email}</td>
                        <td className="text-xs sm:text-base border p-2">{user.contactNumber || "N/A"}</td>
                        <td className="text-xs sm:text-base border p-2">
                          <button 
                          onClick={() => handleSelectUser(user)}
                          className="bg-green-500 text-white p-2 rounded">Select</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="border p-2 text-center text-gray-500">
                        No middle-level users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
            <button onClick={() => setShowModal(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignGuide;

