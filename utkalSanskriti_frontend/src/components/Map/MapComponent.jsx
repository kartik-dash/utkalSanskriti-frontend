// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Polyline } from "react-leaflet";
// import { divIcon } from "leaflet";
// import "leaflet/dist/leaflet.css";

// const MapComponent = ({ product, userLocation }) => {
//   const [routeCoordinates, setRouteCoordinates] = useState([]);
//   const [routeLoading, setRouteLoading] = useState(false);
//   const [routeError, setRouteError] = useState(null);

//   useEffect(() => {
//     if (userLocation && product) {
//       calculateRoute();
//     }
//   }, [userLocation]);

//   const calculateRoute = async () => {
//     setRouteLoading(true);
//     setRouteError(null);
//     try {
//       const response = await fetch(
//         `https://router.project-osrm.org/route/v1/driving/${userLocation.lng},${userLocation.lat};${product.longitude},${product.latitude}?overview=full&geometries=geojson`
//       );

//       const data = await response.json();
//       if (data.routes?.[0]?.geometry?.coordinates) {
//         const convertedCoords = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
//         setRouteCoordinates(convertedCoords);
//       }
//     } catch (error) {
//       setRouteError("Failed to calculate route. Please try again later.");
//       console.error("Routing error:", error);
//     } finally {
//       setRouteLoading(false);
//     }
//   };

//   // Destination icon
//   const templeIcon = divIcon({
//     className: "custom-icon",
//     html: `<div style="background-color: black; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; color: white;">X</div>`,
//     iconSize: [30, 30],
//     iconAnchor: [15, 30],
//     popupAnchor: [0, -30],
//   });

//   // User location icon
//   const userIcon = divIcon({
//     className: "user-icon",
//     html: `<div style="background-color: blue; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; color: white;">U</div>`,
//     iconSize: [30, 30],
//     iconAnchor: [15, 30],
//     popupAnchor: [0, -30],
//   });

//   return (
//     <div className="p-8 mt-8 bg-gray-100 rounded-lg shadow-md">
//       {routeLoading && <p className="text-blue-500 mb-2">Calculating route...</p>}
//       {routeError && <p className="text-red-500 mb-2">{routeError}</p>}

//       <MapContainer
//   center={[product.latitude, product.longitude]}
//   zoom={13}
//   style={{ width: "100%", height: "500px", zIndex: 1 }} // Ensure z-index is lower than the header
//   className="rounded-lg shadow-lg"
//   zoomControl={false}
// >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />

//         <Marker position={[product.latitude, product.longitude]} icon={templeIcon}>
//           <Popup>
//             <div className="flex flex-col">
//               <h3 className="font-bold text-xl">{product.name}</h3>
//               <p>{product.location}</p>
//               <p>{product.description}</p>
//             </div>
//           </Popup>
//         </Marker>

//         {userLocation && (
//           <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
//             <Popup>
//               <div className="flex flex-col">
//                 <h3 className="font-bold text-lg">Your Location</h3>
//                 <p className="text-sm">
//                   Latitude: {userLocation.lat.toFixed(4)}
//                   <br />
//                   Longitude: {userLocation.lng.toFixed(4)}
//                 </p>
//               </div>
//             </Popup>
//           </Marker>
//         )}

//         {routeCoordinates.length > 0 && (
//           <Polyline positions={routeCoordinates} color="#3b82f6" weight={4} lineJoin="round" lineCap="round" />
//         )}

//         <ZoomControl position="topright" />
//       </MapContainer>

//       <button
//         onClick={calculateRoute}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         disabled={routeLoading}
//       >
//         {routeLoading ? "Calculating..." : "Refresh Route"}
//       </button>
//     </div>
//   );
// };

// export default MapComponent;


import React from 'react';

const MapComponent = ({ product }) => {
  const { latitude, longitude, name } = product;

  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4 text-white">Temple Location</h2>
      <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
        <iframe
          title={name}
          src={mapUrl}
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default MapComponent;