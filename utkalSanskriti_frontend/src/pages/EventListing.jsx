import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, deleteEvent } from "../redux/thunks/eventThunks";

const EventListing = () => {
    const dispatch = useDispatch();
    const { events, loading, error } = useSelector((state) => state.event);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    // Handle delete event
    const handleDelete = (eventId) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            dispatch(deleteEvent(eventId));
        }
    };

    return (
        <div className="max-w-7xl mt-6 mx-auto p-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800">
                Event Listing
            </h1>

            {loading && <p className="text-blue-500 text-center">Loading events...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div
                        key={event.eventId}
                        className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden"
                    >
                        <div className="event-card">
                            <img
                                src={`data:image/png;base64,${event.eventImageData}`}
                                alt={event.eventName}
                                className="w-full h-48 object-cover"
                            />
                        </div>
                        <div className="p-4">
                        <div className="event-sec space-y-1">
                            <h2 className="text-lg font-semibold text-gray-800 leading-snug">
                            {event.eventName}
                            </h2>
                            <h5 className="text-sm text-gray-600 leading-snug">{event.location}</h5>
                            <p className="text-gray-700 text-sm leading-snug line-clamp-3">
                            {event.description}
                            </p>
                        </div>

                        <div className="mt-3 space-y-1 text-xs text-gray-500 leading-tight">
                            <p>
                            <strong>Start:</strong> {new Date(event.startDate).toLocaleString()}
                            </p>
                            <p>
                            <strong>End:</strong> {new Date(event.endDate).toLocaleString()}
                            </p>
                        </div>

                        <div className="mt-4 flex justify-center">
                            <button
                            onClick={() => handleDelete(event.eventId)}
                            className="text-sm sm:text-base px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                            >
                            Delete Event
                            </button>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventListing;
