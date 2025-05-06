import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSupportServiceUsers } from "../redux/thunks/supportserviceThunks";
import { useNavigate } from "react-router-dom";

const AllvisitorsSupportService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState("ALL");

  const usersPerPage = 5;
  const userId = useSelector((state) => state.auth?.userId);
  const { supportService = [], fetchStatus, error } = useSelector((state) => state.supportService || {});

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token && userId) {
      dispatch(fetchSupportServiceUsers(userId));
    }
  }, [dispatch, userId]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter users based on search query & selected tab
  const filteredUsers = supportService.filter((booking) => {
    const matchesSearch =
      booking.client?.firstName?.toLowerCase().includes(searchQuery) ||
      booking.client?.lastName?.toLowerCase().includes(searchQuery) ||
      booking.client?.email?.toLowerCase().includes(searchQuery) ||
      booking.client?.contactNumber?.includes(searchQuery);

    const matchesTab = selectedTab === "ALL" || booking.bookingStatus === selectedTab;

    return matchesSearch && matchesTab;
   });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage));
  const currentUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  // 👉 Chat Button Click Handler — now passes clientId
  const handleChatClick = (recipientId) => {
    navigate(`/livechat/${recipientId}`);
  };

  return (
    <div className="p-6">
      
      <h2 className="text-base sm:text-2xl font-bold mb-4">All Booking Customers</h2>

      <div className="flex flex-col sm:flex-row sm:items-center mb-4 space-y-2 sm:space-y-0">
  {/* Search input */}
  <input
    type="text"
    placeholder="Search users..."
    value={searchQuery}
    onChange={handleSearchChange}
    className="border p-2 rounded w-full sm:w-60"
  />

  {/* Tab buttons */}
  <div className="overflow-x-auto whitespace-nowrap ml-4">
    <div className="inline-flex space-x-2 sm:space-x-4">
      {["ALL", "CONFIRM", "UNDER PROCESS", "COMPLETED"].map((tab) => (
        <button
          key={tab}
          onClick={() => setSelectedTab(tab)}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm transition ${
            selectedTab === tab
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>
</div>


      {fetchStatus === "loading" ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message || "An unknown error occurred."}</p>
      ) : (
        <>
        <div className="createuser overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-gray-200 text-center">
                {[
                  "Full Name",
                  "Email",
                  "Contact Number",
                  "Registration Date",
                  "Temple Name",
                  "District",
                  "Location",
                  "Booking Status",
                  "Book Date",
                ].map((heading) => (
                  <th key={heading} className="border p-2">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((booking) => {
                  const bookingItem = booking.bookingItems?.[0];
                  return (
                    <tr key={booking.bookingId} className="text-center hover:bg-gray-50">
                      <td className="border p-2">
                        {`${booking.client?.firstName || ""} ${booking.client?.lastName || ""}`}
                      </td>
                      <td className="border p-2">{booking.client?.email || "N/A"}</td>
                      <td className="border p-2">{booking.client?.contactNumber || "N/A"}</td>
                      <td className="border p-2">
                        {booking.client?.createdAt ? new Date(booking.client.createdAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="border p-2">{bookingItem?.temple?.name || "N/A"}</td>
                      <td className="border p-2">{bookingItem?.temple?.districtName || "N/A"}</td>
                      <td className="border p-2">{bookingItem?.temple?.location || "N/A"}</td>
                      <td className="border p-2">{booking.bookingStatus || "N/A"}</td>
                      <td className="border p-2">
                        {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "N/A"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="border p-2 text-center text-gray-500">
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
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="bg-gray-300 text-xs sm:text-base text-gray-700 p-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-xs sm:text-base">Page {currentPage} of {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              className="bg-gray-300 text-xs sm:text-base text-gray-700 p-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllvisitorsSupportService;
