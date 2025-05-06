
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSupportUsers, updateSupportUsers, fetchSupportserviceUsers } from "../redux/thunks/supportThunks";
import { fetchTempleAdminUsers, updateTempleAdminUsers } from "../redux/thunks/templeadminThunks";

const AssignSupport = ({ bookingId }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedAdminBooking, setSelectedAdminBooking] = useState(null);
  const [assignedUsers, setAssignedUsers] = useState({});

  const usersPerPage = 5;
  const UserId = useSelector((state) => state.auth?.userId);
  const assignsupport = useSelector((state) => state.support?.support || []);
  const { loading, error } = useSelector((state) => state.assignsupport || {});
  const { totalSupport } = useSelector((state) => state.support);
  const supportLoading = useSelector((state) => state.support?.loading);
  const supportError = useSelector((state) => state.support?.error);


  const templeError = useSelector((state) => state.templeadmin?.error);
  const templeLoading = useSelector((state) => state.templeadmin?.loading);
  const { templeadmin } = useSelector((state) => state.templeadmin);
  // console.log('dakkkkkraa:', templeadmin.email);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(fetchSupportUsers(UserId));
    }
  }, [dispatch]);


  useEffect(() => {
    if (bookingId) {
      dispatch(fetchTempleAdminUsers(bookingId));
    }
  }, [dispatch, bookingId])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };


  // Filter users based on search query
  const filteredUsers = assignsupport.filter(
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
      dispatch(fetchSupportserviceUsers(UserId));
    }
  };


  const handleAssignAdminClick = (booking) => {
    console.log(templeadmin);  // Log to check if data is being fetched properly
    setSelectedAdminBooking(booking);
    setShowAdminModal(true);
    if (booking.bookingId) {
      dispatch(fetchTempleAdminUsers(booking.bookingId)); // ✅ Fetch temple admins using bookingId
    }
  };


  const handleSelectUser = async (user) => {
    if (!selectedBooking || !UserId) return;
    const { bookingId } = selectedBooking;
    const teamLeaderId = UserId;

    try {
      const response = await dispatch(updateSupportUsers({ bookingId, teamLeaderId, userId: user.userId })).unwrap();
      console.log("Update response:", response);
      setAssignedUsers((prev) => ({
        ...prev,
        [bookingId]: user,
      }));
      dispatch(fetchSupportUsers(UserId));
      setShowModal(false);
    } catch (error) {
      console.error("Failed to assign mid-level user:", error);
    }
  };

  const handleSelectAdmin = async (user) => {
    if (!selectedAdminBooking || !UserId) return;

    const { bookingId } = selectedAdminBooking;
    const teamLeaderId = UserId;
    try {
      const response = await dispatch(updateTempleAdminUsers({ bookingId, teamLeaderId, userId: user.userId })).unwrap();
      console.log("Admin assignment response:", response);
      setAssignedUsers((prev) => ({
        ...prev,
        [bookingId]: user,
      }));
      dispatch(fetchTempleAdminUsers(UserId));
      setShowAdminModal(false); // Close admin modal
    } catch (error) {
      console.error("Failed to assign admin:", error);
    }
  };



  return (
    <div className="p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">All Booking Customers</h2>

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
              <tr className="text-sm sm:text-base bg-gray-200">
                {["Full Name", "Email", "Contact Number", "Registration Date", "Temple Name", "District", "Location", "Booking Status", "Book Date", "Action"].map((heading) => (
                  <th key={heading} className="border p-2">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((booking) => {
                  const bookingItem = booking.bookingItems?.[0];
                  return (
                    <tr key={booking.bookingId} className="text-center">
                      <td className="text-xs sm:text-base border p-2">{`${booking.client?.firstName || ""} ${booking.client?.lastName || ""}`}</td>
                      <td className="text-xs sm:text-base border p-2">{booking.client?.email || "N/A"}</td>
                      <td className="text-xs sm:text-base border p-2">{booking.client?.contactNumber || "N/A"}</td>
                      <td className="text-xs sm:text-base border p-2">{booking.client?.createdAt ? new Date(booking.client.createdAt).toLocaleDateString() : "N/A"}</td>
                      <td className="text-xs sm:text-base border p-2">{bookingItem?.temple?.name || "N/A"}</td>
                      <td className="text-xs sm:text-base border p-2">{bookingItem?.temple?.districtName || "N/A"}</td>
                      <td className="text-xs sm:text-base border p-2">{bookingItem?.temple?.location || "N/A"}</td>
                      <td className="text-xs sm:text-base border p-2">{booking.bookingStatus || "N/A"}</td>
                      <td className="text-xs sm:text-base border p-2">{booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "N/A"}</td>
                      <td className="text-xs sm:text-base border p-2 flex flex-col items-center gap-2">
                        <button
                          onClick={() => handleAssignClick(booking)}
                          className={`bg-yellow-500 text-white p-2 rounded ${booking.supportServiceId ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          disabled={!!booking.supportServiceId} // Disable if supportServiceId is not null
                        >
                          Assign Support
                        </button>
                        <button
                          onClick={() => handleAssignAdminClick(booking)}
                          className={`bg-green-500 text-white p-2 rounded ${booking.templeAdminId ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          disabled={!!booking.templeAdminId} // Disable if templeAdminId is not null
                        >
                           Temple Admin
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
              className="bg-gray-300 text-sm sm:text-base text-gray-700 p-2 rounded"
            >
              Previous
            </button>
            <span className="text-sm sm:text-base">Page {currentPage} of {totalPages}</span>
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

      {/* Assign Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded m-4 shadow-lg w-[840px]">
            <h3 className="text-xl font-bold mb-4">Assign Booking</h3>
            <p className="mb-4">Select a support user for {selectedBooking?.client?.firstName}.</p>

            {supportLoading ? (
              <p>Loading middle-level users...</p>
            ) : templeError ? (
              <p className="text-red-500">Error: {templeError}</p>
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
                  {totalSupport && totalSupport.length > 0 ? (
                    totalSupport.map((user) => (
                      <tr key={user.userId} className="text-center">
                        <td className="text-xs sm:text-base text-xs sm:text-base border p-2">{`${user.firstName} ${user.lastName}`}</td>
                        <td className="text-xs sm:text-base text-xs sm:text-base border p-2">{user.email}</td>
                        <td className="text-xs sm:text-base text-xs sm:text-base border p-2">{user.contactNumber || "N/A"}</td>
                        <td className="text-xs sm:text-base text-xs sm:text-base border p-2">
                          <button
                            onClick={() => handleSelectUser(user)}
                            className="bg-green-500 text-white p-2 rounded"
                          >
                            Select
                          </button>
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

      {/* Assign Admin Modal */}

      {showAdminModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded m-4 shadow-lg w-[840px]">
            <h3 className="text-xl font-bold mb-4">Assign Admin</h3>
            <p className="mb-4">Select an temple-admin for {selectedAdminBooking?.client?.firstName}.</p>

            {templeLoading ? (
              <p>Loading admin users...</p>
            ) : templeError ? (
              <p className="text-red-500">Error: {templeError}</p>
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

                  {Array.isArray(templeadmin) && templeadmin.length > 0 ? (
                    templeadmin.map((user) => (
                      <tr key={user.userId} className="text-center">
                        <td className="text-xs sm:text-base border p-2">{`${user.firstName} ${user.lastName}`}</td>
                        <td className="text-xs sm:text-base border p-2">{user.email}</td>
                        <td className="text-xs sm:text-base border p-2">{user.contactNumber || "N/A"}</td>
                        <td className="text-xs sm:text-base border p-2">
                          <button
                            onClick={() => handleSelectAdmin(user)}
                            className="bg-green-500 text-white p-2 rounded"
                          >
                            Select
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : templeadmin && typeof templeadmin === "object" ? (
                    <tr key={templeadmin.userId} className="text-center">
                      <td className="text-xs sm:text-base border p-2">{`${templeadmin.firstName} ${templeadmin.lastName}`}</td>
                      <td className="text-xs sm:text-base border p-2">{templeadmin.email}</td>
                      <td className="text-xs sm:text-base border p-2">{templeadmin.contactNumber || "N/A"}</td>
                      <td className="text-xs sm:text-base border p-2">
                        <button
                          onClick={() => handleSelectAdmin(templeadmin)}
                          className="bg-green-500 text-white p-2 rounded"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="4" className="border p-2 text-center text-gray-500">
                        No admin users found.
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            )}

            <button onClick={() => setShowAdminModal(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignSupport;





