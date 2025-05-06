import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSosData } from '../redux/thunks/emergencysosThunks';

const commonEmergencyservice = () => {
  const dispatch = useDispatch();
  const {emergenysos, status, error } = useSelector((state) => state.emergenysos);
  const userId = useSelector((state) => state.auth?.userId);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const emergencyPerPage = 10;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteremergenysos = emergenysos.filter((item) => {
    const fullName = `${item.client.firstName} ${item.client.lastName}`.toLowerCase();
    return fullName.includes(searchQuery);
  });

  // Pagination logic
  const indexOfLastemergency = currentPage * emergencyPerPage;
  const indexOfFirstemergency = indexOfLastemergency - emergencyPerPage;
  const currentemergency = filteremergenysos.slice(indexOfFirstemergency, indexOfLastemergency);
  const totalPages = Math.ceil(filteremergenysos.length / emergencyPerPage);


  useEffect(() => {
    // Dispatch the thunk only if the status is 'idle'
    if (status === 'idle') {
      dispatch(fetchSosData());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-base sm:text-2xl font-bold mb-4">Emergency Service Requests</h2>

      {/* Search Bar */}
      <div className="w-full mb-4 sm:w-auto">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="text-sm sm:text-base border p-2 w-full sm:w-60 rounded"
        />
      </div>

      <div className="createuser overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 whitespace-nowrap">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-sm sm:text-base py-2 px-4 border-b">Booking Id</th>
            <th className="text-sm sm:text-base py-2 px-4 border-b">Name</th>
            <th className="text-sm sm:text-base py-2 px-4 border-b">Email</th>
            <th className="text-sm sm:text-base py-2 px-4 border-b">Phone Number</th>
            <th className="text-sm sm:text-base py-2 px-4 border-b">Message</th>
            {/* <th className="py-2 px-4 border-b">Guide</th> */}
            {/* <th className="py-2 px-4 border-b">Location</th> */}
            <th className="py-2 px-4 border-b">Time</th>

          </tr>
        </thead>
        <tbody>
          {currentemergency.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="text-xs sm:text-base py-2 px-4 text-center">{item.bookingId}</td>
              <td className="text-xs sm:text-base py-2 px-4 text-center">
                {`${item.client.firstName} ${item.client.lastName}`}
              </td>
              <td className="text-xs sm:text-base py-2 px-4 text-center">{item.client.email}</td>
              <td className="text-xs sm:text-base py-2 px-4 text-center">{item.client.contactNumber}</td>
              <td className="text-xs sm:text-base py-2 px-4 text-center">{item.description}</td>
              {/* <td className="py-2 px-4 text-center">{item.currentLocation}</td> */}
              <td className="text-xs sm:text-base py-2 px-4 text-center">{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* Pagination Controls */}
    {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default commonEmergencyservice;

