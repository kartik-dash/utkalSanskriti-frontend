
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerDataByStatus } from "../redux/thunks/customerThunks";

const AddCustomer = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all"); // Default tab
  const usersPerPage = 5;

  useEffect(() => {
    dispatch(fetchCustomerDataByStatus(activeTab));
  }, [dispatch, activeTab]);

  // Ensure `customers` is always an array
  const { customers = [], loading, error } = useSelector((state) => state.customer || {});
console.log('cosss:', customers);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter users by search
  const filteredUsers = customers?.filter((customer) =>
    `${customer?.firstName} ${customer?.lastName}`.toLowerCase().includes(searchQuery)
  ) || [];

  const currentUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage));

  return (
    <div className="p-6">
      <h2 className="text-base sm:text-2xl font-bold mb-4">All Customers</h2>

      {/* Search & Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 gap-4">
  {/* Search Bar */}
  <div className="w-full sm:w-auto">
    <input
      type="text"
      placeholder="Search users..."
      value={searchQuery}
      onChange={handleSearchChange}
      className="text-sm sm:text-base border p-2 w-full sm:w-60 rounded"
    />
  </div>

  {/* Status Tabs */}
  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
    {["all", "PROGRESS", "COMPLETED", "UPCOMING", "NOT_SCHEDULED"].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-2 text-sm sm:text-base rounded transition ${
          activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
        }`}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
      </button>
    ))}
  </div>
</div>


      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <>
          {/* User Table */}
          <div className="createuser overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 whitespace-nowrap">
            <thead>
              <tr className="text-sm sm:text-base bg-gray-200">
                {["First Name", "Last Name", "Email", "Contact Number", "Registration Date", "Status"].map((heading) => (
                  <th key={heading} className="border p-2">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((customer) => (
                  <tr key={customer?.userId} className="text-center">
                    <td className="text-xs sm:text-base border p-2">{customer?.firstName || "N/A"}</td>
                    <td className="text-xs sm:text-base border p-2">{customer?.lastName || "N/A"}</td>
                    <td className="text-xs sm:text-base border p-2">{customer?.email || "N/A"}</td>
                    <td className="text-xs sm:text-base border p-2">{customer?.contactNumber || "N/A"}</td>
                    <td className="text-xs sm:text-base border p-2">{customer?.createdAt || "N/A"}</td>
                    <td className="text-xs sm:text-base border p-2">{customer?.status || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="border p-2 text-center text-gray-500">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
          {/* Pagination */}
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
    </div>
  );
};

export default AddCustomer;
