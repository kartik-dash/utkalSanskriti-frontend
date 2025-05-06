import React, { useState, useEffect } from 'react';
import { API_URL } from "../redux/api/api";

const DestinationListing = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await fetch(`${API_URL}/api/destinations`);
      if (!response.ok) {
        throw new Error("Failed to fetch destinations");
      }
      const data = await response.json();
      setDestinations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this destination?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/api/destinations/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Failed to delete destination");
      }

      // Remove the deleted destination from state
      setDestinations(destinations.filter(destination => destination.id !== id));
      alert("Destination deleted successfully.");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return <div>Loading popular destinations...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-6 mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Popular Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {destinations.map((destination) => (
          <div key={destination.id} className="border rounded-lg overflow-hidden shadow-lg">
            {destination.imageUrl ? (
              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
            ) : destination.imageData ? (
              <img
                src={`data:image/jpeg;base64,${destination.imageData}`}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                No Image Available
              </div>
            )}
            <div className="p-4">
              <h3 className="text-xl font-bold">{destination.name}</h3>
              <p className="text-gray-600">{destination.location}</p>
              <p className="mt-2">{destination.description}</p>
              <p className="text-gray-500 text-sm mt-1">{destination.districtName}</p>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(destination.id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationListing;
