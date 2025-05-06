import { useEffect, useState } from "react";
import axios from "axios";

function EventNotifications() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events"); // Replace with your backend API
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching event notifications", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Upcoming Events</h1>
      {events.length === 0 ? <p>No upcoming events.</p> : null}
      {events.map((event) => (
        <div key={event.id} className="p-4 border rounded mb-4">
          <h2 className="text-xl font-bold">{event.name}</h2>
          <p>📅 {event.date}</p>
          <p>📍 {event.location}</p>
          <p>ℹ️ {event.description}</p>
        </div>
      ))}
    </div>
  );
}

export default EventNotifications;
