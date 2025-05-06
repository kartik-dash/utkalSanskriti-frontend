import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../redux/api/api";

const EmergencyForSupportlevel = () => {
  const userRole = useSelector((state) => state.auth.role);
  const userId = useSelector((state) => state.auth?.userId);

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const emergencymidPerPage = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [replyStatus, setReplyStatus] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filterAlerts = alerts.filter((alert) => {
    const fullName = `${alert.client.firstName} ${alert.client.lastName}`.toLowerCase();
    return fullName.includes(searchQuery);
  });

  const indexOfLast = currentPage * emergencymidPerPage;
  const indexOfFirst = indexOfLast - emergencymidPerPage;
  const currentAlerts = filterAlerts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filterAlerts.length / emergencymidPerPage);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/api/emergency/alerts/by-role?roleType=${userRole}&id=${userId}`
      );
      if (!response.ok) throw new Error("Failed to fetch emergency alerts");
      const data = await response.json();
      setAlerts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRole && userId) fetchAlerts();
  }, [userRole, userId]);

  const openModal = (alert) => {
    setSelectedAlert(alert);
    setReplyMessage("");
    setIsModalOpen(true);
    setReplyStatus("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAlert(null);
  };

  const handleSendReply = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/emergency/alerts/${selectedAlert.id}/close`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            closeMessage: replyMessage,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to close alert");

      setReplyStatus("✅ Action updated successfully.");
      setTimeout(() => {
        closeModal();
        fetchAlerts();
        setReplyStatus(""); // clear message after reload
      }, 1500);
    } catch (error) {
      setReplyStatus(`❌ Error: ${error.message}`);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading alerts...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Emergency Alerts</h2>

      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="text-sm sm:text-base border p-2 w-full sm:w-60 mb-4 rounded"
      />

      <div className="createuser overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 whitespace-nowrap">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-sm border p-2">Booking ID</th>
              <th className="text-sm border p-2">Name</th>
              <th className="text-sm border p-2">Email</th>
              <th className="text-sm border p-2">Phone</th>
              <th className="text-sm border p-2">Message</th>
              <th className="text-sm border p-2">Time</th>
              <th className="text-sm border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {alerts.length > 0 ? (
              currentAlerts.map((alert) => (
                <tr key={alert.id} className="text-center border-b">
                  <td className="text-xs border p-2">{alert.bookingId}</td>
                  <td className="text-xs border p-2">
                    {alert.client.firstName} {alert.client.lastName}
                  </td>
                  <td className="text-xs border p-2">{alert.client.email}</td>
                  <td className="text-xs border p-2">{alert.client.contactNumber}</td>
                  <td className="text-xs border p-2">{alert.description}</td>
                  <td className="text-xs border p-2">
                    {new Date(alert.timestamp).toLocaleString()}
                  </td>
                  <td className="text-xs border p-2">
                    <button
                      onClick={() => openModal(alert)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Action
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="border p-2 text-center text-gray-500">
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
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* {/ Modal /} */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <h3 className="text-xl font-semibold mb-4">Send Reply</h3>
            <textarea
              className="w-full border p-2 rounded mb-4"
              rows="4"
              placeholder="Type your message..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
            ></textarea>
            {replyStatus && (
              <p className={`text-sm mb-2 ${replyStatus.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
                {replyStatus}
              </p>
            )}
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSendReply}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyForSupportlevel;
