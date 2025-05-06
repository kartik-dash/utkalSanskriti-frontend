import React, { useState, useEffect } from 'react';
import { API_URL } from '../redux/api/api';

const BlockedGuidelist = () => {
  const [blockedGuides, setBlockedGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blocked guides from API
  const fetchBlockedGuides = async () => {
    try {
      const response = await fetch(`${API_URL}/api/guides/blocked`);
      if (!response.ok) {
        throw new Error('Failed to fetch blocked guides');
      }
      const data = await response.json();
      setBlockedGuides(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockedGuides();
  }, []);

  // Function to unblock a guide
  const handleUnblock = async (guideId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/guide/unblock/${guideId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      if (!response.ok) {
        throw new Error('Failed to unblock guide');
      }
      const data = await response.json();
      alert(data.message);
      // Refresh the blocked guides list
      fetchBlockedGuides();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Loading blocked guides...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Blocked Guides</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Contact Number</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blockedGuides.length > 0 ? (
            blockedGuides.map((guide) => (
              <tr key={guide.userId || guide.id} className="text-center">
                <td className="border p-2">
                  {guide.firstName} {guide.lastName}
                </td>
                <td className="border p-2">{guide.email}</td>
                <td className="border p-2">{guide.contactNumber}</td>
                <td className="border p-2">{guide.status}</td>
                <td className="border p-2">
                  {/* Unblock button */}
                  <button
                    onClick={() => handleUnblock(guide.userId)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Unblock
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border p-2 text-center">
                No blocked guides found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlockedGuidelist;
