// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPopularDestinations } from "../redux/thunks/destinationThunks";
// import { Link } from "react-router-dom";

// function PopularDestinations() {
//   const dispatch = useDispatch();
//   const { popularDestinations, status, error } = useSelector(
//     (state) => state.destinations
//   );

//   useEffect(() => {
//     dispatch(fetchPopularDestinations());
//   }, [dispatch]);

//   if (status === "loading") {
//     return <p className="text-center">Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500">{error}</p>;
//   }

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold text-center mb-6">Popular Destinations</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {popularDestinations.map((place) => {
//           // Use imageUrl if available; otherwise, convert imageData to a data URL.
//           const imageSrc = place.imageUrl 
//             ? place.imageUrl 
//             : `data:image/jpeg;base64,${place.imageData}`;

//           return (
//             <div key={place.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
//               <img
//                 src={imageSrc}
//                 alt={place.name}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h2 className="text-xl font-bold">{place.name}</h2>
//                 <p className="text-gray-600">{place.location}</p>
//                 <p className="mt-2 text-gray-700">
//                   {place.description.slice(0, 80)}...
//                 </p>
//                 <p className="text-gray-600 mt-1">
//                   District: {place.districtName}
//                 </p>
//                 {/* If you have a rating field, you can uncomment below */}
//                 {/* <div className="flex items-center mt-2">
//                   <span className="text-yellow-500 text-lg">⭐ {place.rating}</span>
//                 </div> */}
//                 <Link
//                   to={`/destination/${place.id}`}
//                   className="mt-4 block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default PopularDestinations;

import React, { useState, useEffect } from 'react';
import {API_URL} from "../redux/api/api";

const PopularDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(`${API_URL}/api/destinations`);
        if (!response.ok) {
          throw new Error("Failed to fetch destinations");
        }
        const data = await response.json();
        console.log("Fetched destinations:", data);
        setDestinations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

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
              <div className="img-sec overflow-hidden h-60">
              <img
                src={`data:image/jpeg;base64,${destination.imageData}`}
                alt={destination.name}
                className="w-full"
              />
              </div>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
