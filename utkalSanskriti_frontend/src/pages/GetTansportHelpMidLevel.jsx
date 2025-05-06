import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchTransportRequestsMidlevel } from '../redux/thunks/transportThunks';

const GetTansportHelpMidLevel = () => {
    const dispatch = useDispatch();
    const { requests,loading,error } = useSelector ((state) => state.transportHelp);
    const UserId = useSelector ((state) => state.auth?.userId);
    const [searchQuery, setSearchQuery] = useState("");
  
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const transporthelpPerPage = 10;

    const filterRequests = requests.filter((request) => {
      const fullName = `${request.user.firstName} ${request.user.lastName}`.toLowerCase();
      return fullName.includes(searchQuery);
    });


    // Pagination logic
    const indexOfLastTransporthelp = currentPage * transporthelpPerPage;
    const indexOfFirstTransporthelp = indexOfLastTransporthelp - transporthelpPerPage;
    const currentTransport = filterRequests.slice(indexOfFirstTransporthelp, indexOfLastTransporthelp);
    const totalPages = Math.ceil(filterRequests.length / transporthelpPerPage);

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value.toLowerCase());
    };

    useEffect(() =>{
        if (UserId) {
            dispatch(fetchTransportRequestsMidlevel(UserId));
        }
    },[dispatch,UserId]);


    if (loading) return <div>Loading Transport Help Requests</div>;
    if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full mx-auto p-4">
        <h2 className='text-black text-base sm:text-2xl font-bold mt-4 mb-4'>Transport Help Requests</h2>

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
      
        {requests.length === 0? (
            <p>No Transport Requests Are Availabe</p>
        ) :  (
          <div className="overflow-x-auto">
            <table className='min-w-full bg-white border border-gray-300 whitespace-nowrap'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='text-sm sm:text-base py-2 px-2 border-b'>Help Message Id</th>
              <th className='text-sm sm:text-base py-2 px-2 border-b'>User Name</th>
              <th className='text-sm sm:text-base py-2 px-2 border-b'>Message</th>
              <th className='text-sm sm:text-base py-2px-2 border-b'>Created At</th>
            </tr>
          </thead>
          <tbody>
            {currentTransport.map((request) => (
              <tr key={request.helpMessageId} className='border-b'>
                <td className='text-xs sm:text-base py-2 px-2 text-center'>{request.helpMessageId}</td>
                <td className='text-xs sm:text-base py-2 px-2 text-center'>{request.user.firstName} {request.user.lastName}</td>
                <td className='text-xs sm:text-base py-2 px-2 text-center'>{request.message}</td>
                <td className="text-xs sm:text-base py-2 px-4 text-center">
                  {new Date(request.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
     </div>
        )}
        {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 text-xs sm:text-base px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 text-xs sm:text-base px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default GetTansportHelpMidLevel;