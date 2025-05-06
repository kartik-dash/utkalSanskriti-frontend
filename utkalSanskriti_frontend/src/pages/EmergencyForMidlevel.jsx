import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../redux/api/api";

const EmergencyForMidlevel = () => {
  const userRole = useSelector((state) => state.auth.role);
  const userId = useSelector((state) => state.auth?.userId);

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const emergencymidPerPage = 10;

  const [selectedAlert, setSelectedAlert] = useState(null); // for popup
  const [showPopup, setShowPopup] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filterAlerts = alerts.filter((alert) => {
    const fullName = `${alert.client.firstName} ${alert.client.lastName}`.toLowerCase();
    return fullName.includes(searchQuery);
  });

  const indexOfLastemergency = currentPage * emergencymidPerPage;
  const indexOfFirstemergency = indexOfLastemergency - emergencymidPerPage;
  const currentAlerts = filterAlerts.slice(indexOfFirstemergency, indexOfLastemergency);
  const totalPages = Math.ceil(filterAlerts.length / emergencymidPerPage);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/emergency/alerts/by-role?roleType=${userRole}&id=${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch emergency alerts");
        }
        const data = await response.json();
        setAlerts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userRole && userId) {
      fetchAlerts();
    }
  }, [userRole, userId]);

  if (loading) return <p className="text-center text-gray-500">Loading alerts...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Emergency Alerts</h2>

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
              <th className="text-sm sm:text-base border p-2">Name</th>
              <th className="text-sm sm:text-base border p-2">Email</th>
              <th className="text-sm sm:text-base border p-2">Phone Number</th>
              <th className="text-sm sm:text-base border p-2">Message</th>
              <th className="text-sm sm:text-base border p-2">Status</th>
              <th className="text-sm sm:text-base border p-2">Time</th>
              <th className="text-sm sm:text-base border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {alerts.length > 0 ? (
              currentAlerts.map((alert) => (
                <tr key={alert.id} className="text-center border-b">
                  <td className="text-xs sm:text-base border p-2">{alert.bookingId}</td>
                  <td className="text-xs sm:text-base border p-2">{`${alert.client.firstName} ${alert.client.lastName}`}</td>
                  <td className="text-xs sm:text-base border p-2">{alert.client.email}</td>
                  <td className="text-xs sm:text-base border p-2">{alert.client.contactNumber}</td>
                  <td className="text-xs sm:text-base border p-2">{alert.description}</td>
                  <td className="text-xs sm:text-base border p-2">{alert.status}</td>
                  <td className="text-xs sm:text-base border p-2">{new Date(alert.timestamp).toLocaleString()}</td>
                  <td className="text-xs sm:text-base border p-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                      onClick={() => {
                        setSelectedAlert(alert);
                        setShowPopup(true);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="border p-2 text-center text-gray-500">
                  No emergency alerts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* {/ Pagination /} */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 text-xs sm:text-base px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 text-xs sm:text-base px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* {/ Popup Modal /} */}
      {showPopup && selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-md">
            <h3 className="text-xl font-semibold mb-4">Close Message</h3>
            <p className="text-gray-700 mb-6">
              {selectedAlert.closeMessage || "No close message available."}
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyForMidlevel;
