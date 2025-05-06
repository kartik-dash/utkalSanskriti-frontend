// src/pages/EventDetailPage.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UpcomingEventDetails = () => {
  const navigate = useNavigate();
  const event = useSelector((state) => state.event.selectedEvent);

  if (!event) {
    return <p className="text-center text-red-500">No event selected.</p>;
  }

  return (
    <div className="container mx-auto p-6 my-20">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={() => navigate(-2)}
      >
        Back
      </button>
      <h1 className="text-3xl font-bold text-center">{event.eventName}</h1>
      <img
        src={`data:image/png;base64,${event.eventImageData}`}
        alt={event.eventName}
        className="w-full h-96 object-cover rounded-lg shadow-md my-4"
      />
      <p className="text-lg font-medium">📍 {event.location}</p>
      <p className="text-lg">🕒 <strong>Start:</strong> {new Date(event.startDate).toLocaleString()}</p>
      <p className="text-lg">🕒 <strong>End:</strong> {new Date(event.endDate).toLocaleString()}</p>
      <p className="text-lg">{event.description}</p>
    </div>
  );
};

export default UpcomingEventDetails;
