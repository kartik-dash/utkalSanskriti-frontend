import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ParticularTransportHelp = () => {
  const [helpRequests, setHelpRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = useSelector((state) => state.auth?.userId); 
  useEffect(() => {
    if (!userId) return;

    const fetchHelpRequests = async () => {
      try {
        const response = await fetch(`/api/transport_help/by_user/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setHelpRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHelpRequests();
  }, [userId]);

  if (loading) return <div className="text-center text-gray-700">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">User SOS Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Booking ID</th>
              <th className="py-3 px-6 text-left">User ID</th>
              <th className="py-3 px-6 text-left">Message</th>
              <th className="py-3 px-6 text-left">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {helpRequests.map((request) => (
              <tr key={request.helpMessageId} className="hover:bg-gray-100 transition">
                <td className="py-3 px-6">{request.helpMessageId}</td>
                <td className="py-3 px-6">{request.userId}</td>
                <td className="py-3 px-6">{request.message}</td>
                <td className="py-3 px-6">{new Date(request.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParticularTransportHelp;
