// import React, { useState,useEffect } from 'react';
// import { useSelector, useDispatch } from "react-redux";
// import { fetchTransportRequestsSupport } from '../redux/thunks/transportThunks';

// const GetTransportHelpSupport = () => {
//     const dispatch = useDispatch();
//     const { requests,loading,error } = useSelector ((state) => state.transportHelp);
//     const UserId = useSelector ((state) => state.auth?.userId);
//     const [searchQuery, setSearchQuery] = useState("");
      
    
//         const handleSearchChange = (e) => {
//           setSearchQuery(e.target.value.toLowerCase());
//         };
    
//         const filterRequests = requests.filter((request) => {
//           const fullName = `${request.user.firstName} ${request.user.lastName}`.toLowerCase();
//           return fullName.includes(searchQuery);
//         });

//     useEffect(() =>{
//         if (UserId) {
//             dispatch(fetchTransportRequestsSupport(UserId));
//         }
//     },[dispatch,UserId]);


//     if (loading) return <div>Loading Transport Help Requests</div>;
//     if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="w-full mx-auto p-4">
//         <h2 className='text-black text-base sm:text-2xl font-bold mt-4 mb-4'>Transport Help Requests</h2>
//          {/* Search Bar */}
//       <div className="w-full mb-4 sm:w-auto">
//         <input
//           type="text"
//           placeholder="Search users..."
//           value={searchQuery}
//           onChange={handleSearchChange}
//           className="text-sm sm:text-base border p-2 w-full sm:w-60 rounded"
//         />
//       </div>
//         {filterRequests.length === 0? (
//             <p>No Transport Requests Are Availabe</p>
//         ) :  (
//           <div className="overflow-x-auto">
//             <table className='min-w-full bg-white border border-gray-300 whitespace-nowrap'>
//           <thead>
//             <tr className='bg-gray-200'>
//               <th className='text-sm sm:text-base py-2 px-2 border-b'>Help Message Id</th>
//               <th className='text-sm sm:text-base py-2 px-2 border-b'>User Name</th>
//               <th className='text-sm sm:text-base py-2 px-2 border-b'>Message</th>
//               <th className='text-sm sm:text-base py-2 px-2 border-b'>Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filterRequests.map((request) => (
//               <tr key={request.helpMessageId} className='border-b'>
//                 <td className='text-xs sm:text-base py-2 px-2 text-center'>{request.helpMessageId}</td>
//                 <td className='text-xs sm:text-base py-2 px-2 text-center'>{request.user.firstName} {request.user.lasttName}</td>
//                 <td className='text-xs sm:text-base py-2 px-2 text-center'>{request.message}</td>
//                 <td className="text-xs sm:text-base py-2 px-4 text-center">
//                   {new Date(request.createdAt).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         </div>
//         )}
//     </div>
//   )
// }

// export default GetTransportHelpSupport;





import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchTransportRequestsSupport, updateTransportHelpStatus } from '../redux/thunks/transportThunks';

const GetTransportHelpSupport = () => {
  const dispatch = useDispatch();
  const { requests, loading, error } = useSelector((state) => state.transportHelp);
  const supportUserId = useSelector((state) => state.auth?.userId);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    if (supportUserId) {
      dispatch(fetchTransportRequestsSupport(supportUserId));
    }
  }, [dispatch, supportUserId]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const openModal = (requestId) => {
    setSelectedRequestId(requestId);
    setResponseMessage("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRequestId(null);
    setResponseMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRequestId && responseMessage.trim()) {
      dispatch(updateTransportHelpStatus({
        helpMessageId: selectedRequestId,
        supportServiceUserId: supportUserId,
        message: responseMessage,
      }));
      closeModal();
    }
  };

  const filteredRequests = requests.filter((request) => {
    const fullName = `${request.user.firstName} ${request.user.lastName}`.toLowerCase();
    return fullName.includes(searchQuery);
  });

  if (loading) return <div>Loading Transport Help Requests</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full mx-auto p-4">
      <h2 className='text-black text-base sm:text-2xl font-bold mt-4 mb-4'>Transport Help Requests</h2>

      <div className="w-full mb-4 sm:w-auto">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="text-sm sm:text-base border p-2 w-full sm:w-60 rounded"
        />
      </div>

      {filteredRequests.length === 0 ? (
        <p>No Transport Requests Are Available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className='min-w-full bg-white border border-gray-300 whitespace-nowrap'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='text-sm sm:text-base py-2 px-2 border-b'>Help ID</th>
                <th className='text-sm sm:text-base py-2 px-2 border-b'>User Name</th>
                <th className='text-sm sm:text-base py-2 px-2 border-b'>Message</th>
                <th className='text-sm sm:text-base py-2 px-2 border-b'>Created At</th>
                <th className='text-sm sm:text-base py-2 px-2 border-b'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.helpMessageId} className='border-b'>
                  <td className='text-xs sm:text-base py-2 px-2 text-center'>{request.helpMessageId}</td>
                  <td className='text-xs sm:text-base py-2 px-2 text-center'>
                    {request.user.firstName} {request.user.lastName}
                  </td>
                  <td className='text-xs sm:text-base py-2 px-2 text-center'>{request.message}</td>
                  <td className='text-xs sm:text-base py-2 px-2 text-center'>
                    {new Date(request.createdAt).toLocaleString()}
                  </td>
                  <td className='text-xs sm:text-base py-2 px-2 text-center'>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => openModal(request.helpMessageId)}
                    >
                      Update Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* {/ Modal /} */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h3 className="text-lg font-semibold mb-4">Update Support Message</h3>
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full p-2 border rounded mb-4"
                rows="4"
                placeholder="Enter your response..."
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
              ></textarea>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetTransportHelpSupport;
