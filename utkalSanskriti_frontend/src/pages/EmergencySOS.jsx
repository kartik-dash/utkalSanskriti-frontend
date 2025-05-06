// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { sendSOSAlert } from "../redux/thunks/clientThunks"; 
// import { getBookingDetails } from "../redux/thunks/bookingThunks"; 

// function EmergencySOS() {
//   const [status, setStatus] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [sosMessage, setSosMessage] = useState(""); 
//   const [sendEmailToGuide, setSendEmailToGuide] = useState(false);
//   const [selectedBookingId, setSelectedBookingId] = useState(""); 

//   const dispatch = useDispatch();
//   const userId = useSelector((state) => state.auth.userId);
//   const { bookings } = useSelector((state) => state.booking);

//   useEffect(() => {
//     if (userId) {
//       dispatch(getBookingDetails(userId));
//     }
//   }, [dispatch, userId]);

//   const sendSOS = () => {
//     setIsModalOpen(true);
//   };

//   const handleBookingChange = (e) => {
//     setSelectedBookingId(e.target.value);
//   };

//   const handleSubmit = () => {
//     if (!sosMessage.trim()) {
//       return setStatus("❌ Please enter a valid SOS message.");
//     }
//     if (!selectedBookingId) {
//       return setStatus("❌ Please select a booking.");
//     }

//     const sosData = {
//       description: sosMessage,
//       bookingId: selectedBookingId,
//       sendEmailToGuide: sendEmailToGuide
//     };

//     dispatch(sendSOSAlert({ ClientData: sosData, userId }));

//     setStatus("🚨 SOS Alert Sent! Help is on the way.");
//     setIsModalOpen(false); 
//     setSosMessage(""); 
//     setSelectedBookingId(""); 
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-6 text-center p-6">
//       <h1 className="text-2xl font-bold">Emergency SOS</h1>
//       <p className="text-gray-600">Press the button below to send an emergency alert.</p>

//       <button
//         onClick={sendSOS}
//         className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg mt-4 text-lg"
//       >
//         🚨 Send SOS Alert
//       </button>

//       {status && <p className="mt-3 text-lg text-gray-700">{status}</p>}

//       {/* Modal for user input */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
//             <h2 className="text-xl font-bold mb-4">Emergency Details</h2>

//             {/* Select Booking ID */}
//             <select
//               name="bookingId"
//               value={selectedBookingId}
//               onChange={handleBookingChange}
//               className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
//               required
//             >
//               <option value="">Select a Booking</option>
//               {bookings?.flatMap((booking) =>
//                 booking?.bookingItems?.map((place) => (
//                   <option key={place?.temple?.id} value={booking.bookingId}>
//                     {place?.temple?.name}
//                   </option>
//                 ))
//               )}
//             </select>

//             {/* Message Input */}
//             <textarea
//               className="w-full p-2 border rounded-lg mt-4 mb-4"
//               placeholder="Describe your emergency..."
//               value={sosMessage}
//               onChange={(e) => setSosMessage(e.target.value)}
//               required
//             ></textarea>

//             {/* Radio Buttons for Sending Email */}
//             <div className="mb-4">
//               <label className="block text-lg font-medium">Notify Guide:</label>
//               <div className="flex justify-center gap-4 mt-2">
//                 <label className="flex items-center space-x-2">
//                 <input
//                       type="radio"
//                       name="notifyGuide"
//                       value="true"
//                       checked={sendEmailToGuide === true}
//                       onChange={(e) => setSendEmailToGuide(e.target.value === "true")}
//                       className="w-5 h-5"
//                     />
//                   <span>Yes</span>
//                 </label>
//                 <label className="flex items-center space-x-2">
//                 <input
//                       type="radio"
//                       name="notifyGuide"
//                       value="false"
//                       checked={sendEmailToGuide === false}
//                       onChange={(e) => setSendEmailToGuide(e.target.value === "true")}
//                       className="w-5 h-5"
//                     />
//                   <span>No</span>
//                 </label>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
//               >
//                 Confirm & Send SOS
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default EmergencySOS;



import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendSOSAlert } from "../redux/thunks/clientThunks"; 
import { getBookingDetails } from "../redux/thunks/bookingThunks"; 

function EmergencySOS() {
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sosMessage, setSosMessage] = useState(""); 
  const [sendEmailToGuide, setSendEmailToGuide] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(""); 
  const [showGetHelp, setShowGetHelp] = useState(false);
  const [helpOption, setHelpOption] = useState(null);
  
  const [initialSosMessage, setInitialSosMessage] = useState("");
  const [initialBookingId, setInitialBookingId] = useState("");

  // 🌍 Location
  const [location, setLocation] = useState({ lat: null, lng: null });

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const { bookings } = useSelector((state) => state.booking);

  useEffect(() => {
    if (userId) {
      dispatch(getBookingDetails(userId));
    }
  }, [dispatch, userId]);

  // 🌍 Fetch location when modal opens
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocation({ lat: null, lng: null });
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  };

  const sendSOS = () => {
    setIsModalOpen(true);
    fetchLocation(); // 🌍 Fetch location on modal open
  };

  const handleBookingChange = (e) => {
    setSelectedBookingId(e.target.value);
  };

  const handleSubmit = () => {
    if (!sosMessage.trim()) {
      return setStatus("❌ Please enter a valid SOS message.");
    }
    if (!selectedBookingId) {
      return setStatus("❌ Please select a booking.");
    }

    const sosData = {
      description: sosMessage,
      bookingId: selectedBookingId,
      sendEmailToGuide: sendEmailToGuide,
      currentLocation: `Lat: ${location.lat}, Lon: ${location.lng}`,
    };
console.log('sosdata:', sosData);

    dispatch(sendSOSAlert({ ClientData: sosData, userId }));

    setStatus("🚨 SOS Alert Sent! Help is on the way.");
    setIsModalOpen(false);
    setShowGetHelp(true);

    setInitialSosMessage(sosMessage);
    setInitialBookingId(selectedBookingId);

    setSosMessage(""); 
    setSelectedBookingId(""); 
  };

  const handleGetHelp = () => {
    setHelpOption(null);
  };

  const handleHelpResponse = (response) => {
    setHelpOption(response);

    if (response === "no") {
      if (!initialSosMessage.trim() || !initialBookingId) {
        return setStatus("❌ No previous SOS message available to resend.");
      }

      const sosData = {
        description: initialSosMessage,
        bookingId: initialBookingId,
        sendEmailToGuide: sendEmailToGuide,
        currentLocation: `Lat: ${location.lat}, Lon: ${location.lng}`,
      };

      dispatch(sendSOSAlert({ ClientData: sosData, userId }));
      setStatus("🚨 Your previous SOS message has been sent again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-6 text-center p-6">
      <h1 className="text-xl sm:text-2xl font-bold">Emergency SOS</h1>
      <p className="text-gray-600">Press the button below to send an emergency alert.</p>

      <button
        onClick={sendSOS}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg mt-4 text-lg"
      >
        🚨 Send SOS Alert
      </button>

      {status && <p className="mt-3 text-lg text-gray-700">{status}</p>}

      {showGetHelp && (
        <div className="mt-4">
          <button
            onClick={handleGetHelp}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
          >
            Get Help
          </button>
          
          {helpOption === null && (
            <div className="mt-4">
              <p className="text-lg font-semibold">Did you receive help?</p>
              <div className="flex justify-center gap-4 mt-2">
                <button
                  onClick={() => handleHelpResponse("yes")}
                  className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleHelpResponse("no")}
                  className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center m-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Emergency Details</h2>

            <select
              name="bookingId"
              value={selectedBookingId}
              onChange={handleBookingChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select a Booking</option>
              {bookings?.flatMap((booking) =>
                booking?.bookingItems?.map((place) => (
                  <option key={place?.temple?.id} value={booking.bookingId}>
                    {place?.temple?.name}
                  </option>
                ))
              )}
            </select>

            <textarea
              className="w-full p-2 border rounded-lg mt-4 mb-4"
              placeholder="Describe your emergency..."
              value={sosMessage}
              onChange={(e) => setSosMessage(e.target.value)}
              required
            ></textarea>

            <div className="mb-4">
              <label className="block text-lg font-medium">Notify Guide:</label>
              <div className="flex justify-center gap-4 mt-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="notifyGuide"
                    value="true"
                    checked={sendEmailToGuide === true}
                    onChange={(e) => setSendEmailToGuide(e.target.value === "true")}
                    className="w-5 h-5"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="notifyGuide"
                    value="false"
                    checked={sendEmailToGuide === false}
                    onChange={(e) => setSendEmailToGuide(e.target.value === "false")}
                    className="w-5 h-5"
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 hover:bg-gray-500 text-xs sm:text-base text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-base px-4 py-2 rounded-lg"
              >
                Confirm & Send SOS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmergencySOS;

