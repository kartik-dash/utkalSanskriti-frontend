// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getBookingDetails } from "../redux/thunks/bookingThunks";
// import { API_URL } from "../redux/api/api";

// function ListingPage({ onBook }) {
//   const dispatch = useDispatch();
//   const { bookings, loading } = useSelector((state) => state.booking);
//   const userId = useSelector((state) => state.auth.userId);

//   const [showModal, setShowModal] = useState(false);
//   const [selectedBookingId, setSelectedBookingId] = useState(null);

//   useEffect(() => {
//     if (userId) {
//       dispatch(getBookingDetails(userId));
//     }
//   }, [dispatch, userId]);

//   const handleCancel = async () => {
//     try {
//       const response = await fetch(
//         `${API_URL}/api/bookings/cancel/${selectedBookingId}`,
//         {
//           method: "PUT",
//         }
//       );

//       if (response.ok) {
//         dispatch(getBookingDetails(userId));
//       } else {
//         console.error("Failed to cancel booking", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error cancelling booking:", error);
//     } finally {
//       setShowModal(false);
//       setSelectedBookingId(null);
//     }
//   };

//   const handleComplete = async (bookingId) => {
//     try {
//       const response = await fetch(
//         `${API_URL}/api/bookings/complete/${bookingId}?clientId=${userId}`,
//         {
//           method: "PUT",
//         }
//       );
//       if (!response.ok) {
//         console.error("Failed to complete booking", response.statusText);
//       } else {
//         dispatch(getBookingDetails(userId));
//       }
//     } catch (error) {
//       console.error("Error completing booking:", error);
//     }
//   };

//   if (loading)
//     return <p className="text-center text-gray-500">Loading bookings...</p>;

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="mx-auto">
//         <h1 className="text-3xl font-bold mb-6 text-center">My Bookings</h1>
//         <div>
//           <table className="w-full bg-white border border-gray-200 shadow-lg rounded-lg">
//             <thead>
//               <tr className="bg-blue-500 text-white">
//                 <th className="py-3 px-6 text-left border-b">#</th>
//                 <th className="py-3 px-6 text-left border-b">Booking Date</th>
//                 <th className="py-3 px-6 text-left border-b">Temple Name</th>
//                 <th className="py-3 px-6 text-left border-b">Location</th>
//                 <th className="py-3 px-6 text-left border-b">District</th>
//                 <th className="py-3 px-6 text-left border-b">Pooja</th>
//                 <th className="py-3 px-6 text-left border-b">Rudrabhishek</th>
//                 <th className="py-3 px-6 text-left border-b">Prasad</th>
//                 <th className="py-3 px-6 text-left border-b">Status</th>
//                 <th className="py-3 px-6 text-left border-b">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings?.map((booking, index) =>
//                 booking.bookingItems.map((item, itemIndex) => (
//                   <tr
//                     key={`${booking.bookingId}-${itemIndex}`}
//                     className="border-b hover:bg-gray-100"
//                   >
//                     <td className="py-3 px-6 font-semibold">{index + 1}</td>
//                     <td className="py-3 px-6">
//                       {new Date(booking.bookingDate).toLocaleDateString()}
//                     </td>
//                     <td className="py-3 px-6 font-semibold">
//                       {item.temple.name}
//                     </td>
//                     <td className="py-3 px-6">{item.temple.location}</td>
//                     <td className="py-3 px-6">{item.temple.districtName}</td>
//                     <td className="py-3 px-6">
//                       {item.poojaSelected ? "Yes" : "No"}
//                     </td>
//                     <td className="py-3 px-6">
//                       {item.rudrabhisekhSelected ? "Yes" : "No"}
//                     </td>
//                     <td className="py-3 px-6">
//                       {item.prasadSelected ? "Yes" : "No"}
//                     </td>
//                     <td className="py-3 px-6 font-bold text-blue-600">
//                       {booking.bookingStatus}
//                     </td>
//                     <td className="py-3 px-6">
//                       {booking.bookingStatus === "NEW" && (
//                         <button
//                           className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded disabled:opacity-50"
//                           onClick={() => {
//                             setSelectedBookingId(booking.bookingId);
//                             setShowModal(true);
//                           }}
//                           disabled={booking.bookingStatus !== "NEW"}
//                         >
//                           Cancel
//                         </button>
//                       )}
//                       {booking.bookingStatus === "CONFIRM" && (
//                         <button
//                           className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
//                           onClick={() => handleComplete(booking.bookingId)}
//                         >
//                           Complete
//                         </button>
//                       )}
//                       {booking.bookingStatus !== "NEW" &&
//                         booking.bookingStatus !== "CONFIRM" && <span>ASSIGNED</span>}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Confirmation Modal for Cancel */}
//       {showModal && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
//             <h2 className="text-xl font-semibold mb-4">Cancel Booking?</h2>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to cancel this booking?
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={handleCancel}
//                 className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 Yes, Cancel
//               </button>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
//               >
//                 No, Keep It
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ListingPage;



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookingDetails } from "../redux/thunks/bookingThunks";
import { API_URL } from "../redux/api/api";

function ListingPage({ onBook }) {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.booking);
  const userId = useSelector((state) => state.auth.userId);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // ✅ NEW STATE FOR SUCCESS POPUP

  useEffect(() => {
    if (userId) {
      dispatch(getBookingDetails(userId));
    }
  }, [dispatch, userId]);

  const handleCancel = async () => {
    setShowCancelModal(false);
    setShowReasonModal(true);
  };

  const handleSubmitCancelReason = async () => {
    if (!cancelReason.trim()) {
      alert("Please provide a reason for cancellation.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/bookings/cancel/${selectedBookingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reason: cancelReason }),
        }
      );

      if (response.ok) {
        dispatch(getBookingDetails(userId));
        setShowSuccessPopup(true); // ✅ SHOW SUCCESS POPUP

        // ✅ Auto-hide the popup after 3 seconds
        setTimeout(() => setShowSuccessPopup(false), 3000);
      } else {
        console.error("Failed to cancel booking", response.statusText);
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    } finally {
      setShowReasonModal(false);
      setSelectedBookingId(null);
      setCancelReason("");
    }
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading bookings...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">My Bookings</h1>
        <div>
        <div className="createuser overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 shadow-lg rounded-lg whitespace-nowrap">
            <thead>
              <tr className="bg-gray-200 text-black">
                <th className="text-sm sm:text-base py-3 px-6 text-left border-b">#</th>
                <th className="text-sm sm:text-base py-3 px-6 text-left border-b">Booking Date</th>
                <th className="text-sm sm:text-base py-3 px-6 text-left border-b">Temple Name</th>
                <th className="text-sm sm:text-base py-3 px-6 text-left border-b">Location</th>
                <th className="text-sm sm:text-base py-3 px-6 text-left border-b">District</th>
                <th className="text-sm sm:text-base py-3 px-6 text-left border-b">Pooja</th>
                <th className="text-sm sm:text-base py-3 px-6 text-left border-b">Status</th>
                <th className="text-sm sm:text-base py-3 px-6 text-left border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((booking, index) =>
                booking.bookingItems.map((item, itemIndex) => (
                  <tr
                    key={`${booking.bookingId}-${itemIndex}`}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="text-xs sm:text-base py-3 px-6 font-semibold">{index + 1}</td>
                    <td className="text-xs sm:text-base py-3 px-6">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </td>
                    <td className="text-xs sm:text-base py-3 px-6 font-semibold">
                      {item.temple.name}
                    </td>
                    <td className="text-xs sm:text-base py-3 px-6">{item.temple.location}</td>
                    <td className="text-xs sm:text-base py-3 px-6">{item.temple.districtName}</td>
                    <td className="text-xs sm:text-base py-3 px-6">
                      {item.poojaSelected ? "Yes" : "No"}
                    </td>
                    <td className="text-xs sm:text-base py-3 px-6 font-bold text-blue-600">
                      {booking.bookingStatus}
                    </td>
                    <td className="text-xs sm:text-base py-3 px-6">
                      {booking.bookingStatus === "NEW" && (
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                          onClick={() => {
                            setSelectedBookingId(booking.bookingId);
                            setShowCancelModal(true);
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        </div>
      </div>

      {/* Confirmation Modal for Cancel */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold mb-4">Cancel Booking?</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this booking?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancel}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Yes, Cancel
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
              >
                No, Keep It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reason Modal */}
      {showReasonModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Provide a reason for cancellation
            </h2>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows="4"
              placeholder="Enter your reason here..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            ></textarea>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleSubmitCancelReason}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setShowReasonModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Cancelled Popup ✅ */}
      {showSuccessPopup && (
          <div className="fixed top-40 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg">
            Booking cancelled successfully! ✅
          </div>
        )}
    </div>
  );
}

export default ListingPage;
