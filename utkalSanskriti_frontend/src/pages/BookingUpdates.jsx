import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookingDetails } from "../redux/thunks/bookingThunks";

function BookingUpdates() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.booking);
  const UserId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    if (UserId) {
      dispatch(getBookingDetails(UserId));
    }
  }, [dispatch, UserId]);

  // Filter confirmed bookings only
  const confirmedBookings = bookings?.filter((booking) => booking.bookingStatus === "CONFIRM") || [];

  return (
    <div className="p-6 max-w-4xl mt-6 mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-center text-blue-700 mb-6">📅 Your Booking Updates</h1>

      {confirmedBookings.length === 0 ? (
        <p className="text-gray-500 text-center">No confirmed bookings yet.</p>
      ) : (
        <div className="space-y-6">
          {confirmedBookings.map((booking) => (
            <div key={booking.bookingId} className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">{booking.bookingItems[0].temple.name}</h2>
              <p className="text-gray-600">{booking.bookingItems[0].temple.location}</p>
              <p className="text-gray-500">📅 {new Date(booking.bookingDate).toLocaleString()}</p>
              <div className="mt-3">
                <span className="text-green-600 font-bold">✅ Confirmed</span>
              </div>
              <div className="mt-2 p-2 bg-gray-100 rounded">
                <p className="text-sm font-semibold">Assigned Guide:</p>
                <p className="text-gray-800">
                  {booking.assignedGuide
                    ? `${booking.assignedGuide.firstName} ${booking.assignedGuide.lastName} - 📞 ${booking.assignedGuide.contactNumber}`
                    : "Not Assigned Yet"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingUpdates;
