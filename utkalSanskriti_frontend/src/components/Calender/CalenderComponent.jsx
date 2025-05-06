import React from 'react'

const CalendarComponent = ({ calendar }) => {
    if (!calendar || !calendar.length) {
      return <p className="text-gray-500 text-center">No calendar events available.</p>;
    }
  
    return (
      <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-md sm:text-2xl font-semibold text-gray-800 mb-4">Upcoming Events</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-800">
                <th className="text-sm sm:text-xl border border-gray-300 px-4 py-2">Event Name</th>
                <th className="text-sm sm:text-xl border border-gray-300 px-4 py-2">Date</th>
                <th className="text-sm sm:text-xl border border-gray-300 px-4 py-2">Day</th>
              </tr>
            </thead>
            <tbody>
              {calendar[0].name.map((eventName, index) => (
                <tr key={index} className="text-center hover:bg-gray-50">
                  <td className="text-sm sm:text-lg border border-gray-300 px-4 py-2">{eventName}</td>
                  <td className="text-sm sm:text-lg border border-gray-300 px-4 py-2">{calendar[0].date[index]}</td>
                  <td className="text-sm sm:text-lg border border-gray-300 px-4 py-2">{calendar[0].day[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default CalendarComponent;