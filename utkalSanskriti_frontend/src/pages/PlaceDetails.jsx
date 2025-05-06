// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { bookTemple } from "../redux/thunks/bookingThunks";

// const PlaceDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const place = location.state;
//   const dispatch = useDispatch();
//   const { loading, success, error } = useSelector((state) => state.booking);
//   const UserId = useSelector((state) => state.auth.userId);
//   const [isBookingOpen, setBookingOpen] = useState(false);
//   const [bookingDetails, setBookingDetails] = useState({
//     templeId: place?.id || "",
//     date: "",
//     poojaSelected: false,
//     rudrabhisekhSelected: false,
//     prasadSelected: false,
//   });

//   if (!place) {
//     return <p className="text-center text-gray-500">No place selected.</p>;
//   }

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setBookingDetails({
//       ...bookingDetails,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleBookingSubmit = (e) => {
//     e.preventDefault();
  
//     if (!bookingDetails.date) {
//       alert("Please select a booking date.");
//       return;
//     }
  
//     if (!UserId) {
//       alert("User is not logged in.");
//       return;
//     }
  
//     const formattedBooking = {
//       bookingDate: new Date(bookingDetails.date).toISOString(),
//       bookingItems: [
//         {
//           templeId: bookingDetails.templeId,
//           poojaSelected: bookingDetails.poojaSelected,
//           rudrabhisekhSelected: bookingDetails.rudrabhisekhSelected,
//           prasadSelected: bookingDetails.prasadSelected,
//         },
//       ],
//     };
  
//     dispatch(bookTemple({ clientId: UserId, bookingData: formattedBooking }))
//       .then((res) => {
//         if (res.payload) {
//           alert("Booking successful!");
//           setBookingOpen(false);
//         }
//       })
//       .catch((err) => alert("Booking failed!"));
//   };
  

//   return (
//     <div className="min-h-screen bg-gray-50 flex justify-center items-center p-8">
//       <div className="max-w-3xl bg-white shadow-md rounded-lg p-6 relative">
//         <img
//             src={`data:image/png;base64,${temple.imageBase64}`}
//             alt={temple.name} // Do not change this alt text
//             className="w-20 h-20 object-cover rounded"
//           />
//         <h1 className="text-3xl font-bold text-gray-800">{place.name}</h1>
//         <p className="text-gray-600 mt-2">{place.description}</p>
//         <div className="flex items-center mt-4">
//           <span className="text-yellow-500 font-semibold text-lg">⭐ {place.rating}</span>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-between mt-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
//           >
//             Go Back
//           </button>

//           <button
//             onClick={() => setBookingOpen(true)}
//             className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
//           >
//             Book Now
//           </button>
//         </div>
//       </div>

//       {/* Booking Modal */}
//       {isBookingOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Your Visit</h2>

//             <form onSubmit={handleBookingSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-gray-600 text-sm font-medium">Temple Name</label>
//                 <input
//                   type="text"
//                   value={place.name}
//                   readOnly
//                   className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
//                 />
//               </div>

//               <input type="hidden" name="templeId" value={bookingDetails.templeId} />

//               <div>
//                 <label className="block text-gray-600 text-sm font-medium">Booking Date</label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={bookingDetails.date}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-600 text-sm font-medium">Select Services</label>
//                 <div className="flex flex-col space-y-2">
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="poojaSelected"
//                       checked={bookingDetails.poojaSelected}
//                       onChange={handleInputChange}
//                       className="mr-2"
//                     />
//                     Pooja
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="rudrabhisekhSelected"
//                       checked={bookingDetails.rudrabhisekhSelected}
//                       onChange={handleInputChange}
//                       className="mr-2"
//                     />
//                     Rudrabhishek
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="prasadSelected"
//                       checked={bookingDetails.prasadSelected}
//                       onChange={handleInputChange}
//                       className="mr-2"
//                     />
//                     Prasad
//                   </label>
//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="flex justify-end space-x-3">
//                 <button type="button" onClick={() => setBookingOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition">
//                   Cancel
//                 </button>

//                 <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
//                   {loading ? "Booking..." : "Confirm Booking"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlaceDetails;




// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { bookTemple } from "../redux/thunks/bookingThunks";

// const PlaceDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const place = location.state;
//   const { loading } = useSelector((state) => state.booking);
//   const UserId = useSelector((state) => state.auth?.userId);

//   const [isBookingOpen, setBookingOpen] = useState(false);
//   const [bookingDetails, setBookingDetails] = useState({
//     templeId: place?.id || "",
//     date: "",
//     poojaSelected: false,
//     rudrabhisekhSelected: false,
//     prasadSelected: false,
//   });

//   if (!place) {
//     return <p className="text-center text-gray-500">No place selected.</p>;
//   }

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setBookingDetails({
//       ...bookingDetails,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleBookingSubmit = async (e) => {
//     e.preventDefault();

//     if (!bookingDetails.date) {
//       alert("Please select a booking date.");
//       return;
//     }

//     if (!UserId) {
//       alert("User is not logged in.");
//       return;
//     }

//     const formattedBooking = {
//       bookingDate: new Date(bookingDetails.date).toISOString(),
//       bookingItems: [
//         {
//           templeId: bookingDetails.templeId,
//           poojaSelected: bookingDetails.poojaSelected,
//           rudrabhisekhSelected: bookingDetails.rudrabhisekhSelected,
//           prasadSelected: bookingDetails.prasadSelected,
//         },
//       ],
//     };

//     try {
//       const response = await dispatch(bookTemple({ clientId: UserId, bookingData: formattedBooking })).unwrap();
//       if (response) {
//         alert("Booking successful!");
//         setBookingOpen(false);
//       }
//     } catch (error) {
//       alert("Booking failed!");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex justify-center items-center p-8">
//       <div className="max-w-3xl bg-white shadow-md rounded-lg p-6 relative">
//         {place.imageBase64 && (
//           <img
//             src={`data:image/png;base64,${place.imageBase64}`}
//             alt={place.name}
//             className="w-100 h-100 object-cover rounded"
//           />
//         )}
//         <h1 className="text-3xl font-bold text-gray-800">{place.name}</h1>
//         <p className="text-gray-600 mt-2">{place.description}</p>
//         <div className="flex items-center mt-4">
//           <span className="text-yellow-500 font-semibold text-lg">⭐ {place.rating}</span>
//         </div>

//         <div className="flex justify-between mt-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
//           >
//             Go Back
//           </button>

//           <button
//             onClick={() => setBookingOpen(true)}
//             className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
//           >
//             Book Now
//           </button>
//         </div>
//       </div>

//       {isBookingOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Your Visit</h2>

//             <form onSubmit={handleBookingSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-gray-600 text-sm font-medium">Temple Name</label>
//                 <input
//                   type="text"
//                   value={place.name}
//                   readOnly
//                   className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
//                 />
//               </div>

//               <input type="hidden" name="templeId" value={bookingDetails.templeId} />

//               <div>
//                 <label className="block text-gray-600 text-sm font-medium">Booking Date</label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={bookingDetails.date}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-600 text-sm font-medium">Select Services</label>
//                 <div className="flex flex-col space-y-2">
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="poojaSelected"
//                       checked={bookingDetails.poojaSelected}
//                       onChange={handleInputChange}
//                       className="mr-2"
//                     />
//                     Pooja
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="rudrabhisekhSelected"
//                       checked={bookingDetails.rudrabhisekhSelected}
//                       onChange={handleInputChange}
//                       className="mr-2"
//                     />
//                     Rudrabhishek
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name="prasadSelected"
//                       checked={bookingDetails.prasadSelected}
//                       onChange={handleInputChange}
//                       className="mr-2"
//                     />
//                     Prasad
//                   </label>
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-3">
//                 <button type="button" onClick={() => setBookingOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition">
//                   Cancel
//                 </button>

//                 <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
//                   {loading ? "Booking..." : "Confirm Booking"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlaceDetails;



import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bookTemple } from "../redux/thunks/bookingThunks";

const PlaceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const place = location.state;
  const { loading } = useSelector((state) => state.booking);
  const UserId = useSelector((state) => state.auth?.userId);

  const [isBookingOpen, setBookingOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    templeId: place?.id || "",
    date: "",
    poojaSelected: false,
    rudrabhisekhSelected: false,
    prasadSelected: false,
  });

  if (!place) {
    return <p className="text-center text-gray-500">No place selected.</p>;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!bookingDetails.date) {
      alert("Please select a booking date.");
      return;
    }

    if (!UserId) {
      alert("User is not logged in.");
      return;
    }

    const formattedBooking = {
      bookingDate: new Date(bookingDetails.date).toISOString(),
      bookingItems: [
        {
          templeId: bookingDetails.templeId,
          poojaSelected: bookingDetails.poojaSelected,
          rudrabhisekhSelected: bookingDetails.rudrabhisekhSelected,
          prasadSelected: bookingDetails.prasadSelected,
        },
      ],
    };

    try {
      const response = await dispatch(bookTemple({ clientId: UserId, bookingData: formattedBooking })).unwrap();
      if (response) {
        alert("Booking successful!");
        setBookingOpen(false);
      }
    } catch (error) {
      alert("Booking failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-8">
      <div className="max-w-3xl bg-white shadow-md rounded-lg p-6 relative">
        {place.imageBase64 && (
          <img
            src={`data:image/png;base64,${place.imageBase64}`}
            alt={place.name}
            className="w-100 h-100 object-cover rounded"
          />
        )}
        <h1 className="text-3xl font-bold text-gray-800">{place.name}</h1>
        <p className="text-gray-600 mt-2">{place.description}</p>
        <div className="flex items-center mt-4">
          <span className="text-yellow-500 font-semibold text-lg">⭐ {place.rating}</span>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
          >
            Go Back
          </button>

          <button
            onClick={() => setBookingOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Book Now
          </button>
        </div>
      </div>

      {isBookingOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Your Visit</h2>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-600 text-sm font-medium">Temple Name</label>
                <input
                  type="text"
                  value={place.name}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>

              <input type="hidden" name="templeId" value={bookingDetails.templeId} />

              <div>
                <label className="block text-gray-600 text-sm font-medium">Booking Date</label>
                <input
                  type="date"
                  name="date"
                  value={bookingDetails.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                  min={new Date().toISOString().split("T")[0]}  
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm font-medium">Select Services</label>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="poojaSelected"
                      checked={bookingDetails.poojaSelected}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Pooja
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="rudrabhisekhSelected"
                      checked={bookingDetails.rudrabhisekhSelected}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Rudrabhishek
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="prasadSelected"
                      checked={bookingDetails.prasadSelected}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Prasad
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => setBookingOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition">
                  Cancel
                </button>

                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceDetails;
