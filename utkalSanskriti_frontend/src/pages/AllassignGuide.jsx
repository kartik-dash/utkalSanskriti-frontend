
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllassignGuideUsers } from "../redux/thunks/allassignguideThunks"

const AllassignGuide = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState("ALL");


  const usersPerPage = 5;
  const userId = useSelector((state) => state.auth?.userId);
  const { assignGuide, fetchStatus, error } = useSelector((state) => state.assignGuide || {});

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token && userId) {
      dispatch(fetchAllassignGuideUsers(userId));
    }
  }, [dispatch, userId]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter users based on search query
  const filteredUsers = assignGuide.filter((booking) => {
    const matchesSearch =
      booking.client?.firstName?.toLowerCase().includes(searchQuery) ||
      booking.client?.lastName?.toLowerCase().includes(searchQuery) ||
      booking.client?.email?.toLowerCase().includes(searchQuery) ||
      booking.client?.contactNumber?.includes(searchQuery);

    const matchesTab = selectedTab === "ALL" || booking.bookingStatus === selectedTab;

    return matchesSearch && matchesTab;
   });

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage));



  return (
    <div className="p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">All Booking Customers</h2>
      
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border p-2 w-60 rounded"
        />

        <div className="flex ml-4 space-x-4">
          {["ALL", "CONFIRM", "UNDER PROCESS", "COMPLETED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded ${
                selectedTab === tab ? "bg-blue-500 text-white" : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {fetchStatus === "loading" ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message || "An unknown error occurred."}</p>
      ) : (
        <>
         <div className="createuser overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 whitespace-nowrap">
            <thead>
              <tr className="bg-gray-200">
                {["Full Name", "Email", "Contact Number", "Registration Date", "Temple Name", "District", "Location", "Booking Status", "Book Date"].map((heading) => (
                  <th key={heading} className="text-sm sm:text-base border p-2">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((booking) => {
                  const bookingItem = booking.bookingItems?.[0]; 
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
                      <td className="text-xs sm:text-base border p-2">{bookingItem?.temple?.name || "N/A"}</td>
                      <td className="text-xs sm:text-base border p-2">{bookingItem?.temple?.districtName || "N/A"}</td>
                      <td className="text-xs sm:text-base border p-2">{bookingItem?.temple?.location || "N/A"}</td>
                      <td className="text-xs sm:text-base border p-2">{booking.bookingStatus || "N/A"}</td>
                      <td className="text-xs sm:text-base border p-2">{booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "N/A"}</td>
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
              className="bg-gray-300 text-gray-700 p-2 rounded"
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="bg-gray-300 text-gray-700 p-2 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllassignGuide;
