import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminUsers } from "../redux/thunks/masteradminviewmoreThunks";
import { useLocation } from "react-router-dom";

const MasteradminViewmore = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Get userId from auth state
  const userId = useSelector((state) => state.auth?.userId);
  // Get the viewAdmin slice from Redux
  const { viewAdmin, fetchStatus, error } = useSelector((state) => state.viewAdmin || {});
  console.log("viewAdmin:", viewAdmin);

  // Use location to get role from state or query parameter
  const location = useLocation();
  const roleFromState = location.state?.role;
  const queryParams = new URLSearchParams(location.search);
  const roleFromQuery = queryParams.get("role");
  const role = roleFromState || roleFromQuery; // Fallback to query param if state is missing

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    // Dispatch only if token, userId, and role are available
    if (token && userId && role) {
      dispatch(fetchAdminUsers({ userId, role }));
    }
  }, [dispatch, userId, role]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter users based on search query using direct user properties
  const filteredUsers = viewAdmin.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchQuery) ||
      user.lastName?.toLowerCase().includes(searchQuery) ||
      user.email?.toLowerCase().includes(searchQuery) ||
      user.contactNumber?.includes(searchQuery)
  );

  const usersPerPage = 5;
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage));

  return (
    <div className="p-6">
      {/* Dynamically change heading based on role */}
      <h2 className="text-base sm:text-2xl font-bold mb-4">
        {role ? `View ${role} Details` : "All Details"}
      </h2>

      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="border p-2 w-60 rounded mb-4"
      />

      {fetchStatus === "loading" ? (
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
                {["Full Name", "Email", "Contact Number", "Registration Date"].map((heading) => (
                  <th key={heading} className="border p-2">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.userId} className="text-center">
                    <td className="text-xs sm:text-base border p-2">{`${user.firstName || ""} ${user.lastName || ""}`}</td>
                    <td className="text-xs sm:text-base border p-2">{user.email || "N/A"}</td>
                    <td className="text-xs sm:text-base border p-2">{user.contactNumber || "N/A"}</td>
                    <td className="text-xs sm:text-base border p-2">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border p-2 text-center text-gray-500">
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
            <span className="text-xs sm:text-base">
              Page {currentPage} of {totalPages}
            </span>
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
    </div>
  );
};

export default MasteradminViewmore;
