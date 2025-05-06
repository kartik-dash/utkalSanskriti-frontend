// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTransportRequests } from "../redux/thunks/transportThunks"; // adjust the path if needed

// const GetTransportHelp = () => {
//   const dispatch = useDispatch();
//   const [searchQuery, setSearchQuery] = useState("");
//   const { requests, loading, error } = useSelector((state) => state.transportHelp);

//    // Pagination state
//     const [currentPage, setCurrentPage] = useState(1);
//     const transportPerPage = 5;

//   console.log('kkkk:', requests);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };
  

//   const filteredRequests = requests.filter((request) => {
//     const fullName = `${request.user.firstName} ${request.user.lastName}`.toLowerCase();
//     return fullName.includes(searchQuery);
//   });

//   // Pagination logic
//   const indexOfLasttransport = currentPage * transportPerPage;
//   const indexOfFirsttransport = indexOfLasttransport - transportPerPage;
//   const currentTransports = filteredRequests.slice(indexOfFirsttransport, indexOfLasttransport);
//   const totalPages = Math.ceil(filteredRequests.length / transportPerPage);



//   useEffect(() => {
//     dispatch(fetchTransportRequests());
//   }, [dispatch]);

//   if (loading) return <div>Loading transport help requests...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="w-full mx-auto p-4">
//       <h2 className="text-base sm:text-2xl font-bold mb-4">Transport Help Requests</h2>
//       {/* Search Bar */}
//       <div className="w-full mb-4 sm:w-auto">
//         <input
//           type="text"
//           placeholder="Search users..."
//           value={searchQuery}
//           onChange={handleSearchChange}
//           className="text-sm sm:text-base border p-2 w-full sm:w-60 rounded"
//         />
//       </div>
//       {filteredRequests.length === 0 ? (
//         <p>No transport help requests available.</p>
//        ) : (
//         <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300 whitespace-nowrap">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="text-sm sm:text-base py-2 px-4 border-b">Help Message ID</th>
//               <th className="text-sm sm:text-base py-2 px-4 border-b">User Name</th>
//               <th className="text-sm sm:text-base py-2 px-4 border-b">Message</th>
//               {/* <th className="py-2 px-4 border-b">Status</th> */}
//               <th className="text-sm sm:text-base py-2 px-4 border-b">Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentTransports.map((request) => (
//               <tr key={request.helpMessageId} className="border-b">
//                 <td className="text-xs sm:text-base py-2 px-4 text-center">{request.helpMessageId}</td>
//                 <td className="text-xs sm:text-base py-2 px-4 text-center">{request.user.firstName} {request.user.lastName}</td>
//                 <td className="text-xs sm:text-base py-2 px-4 text-center">{request.message}</td>
//                 {/* <td className="py-2 px-4 text-center">{request.status}</td> */}
//                 <td className="text-xs sm:text-base py-2 px-4 text-center">
//                   {new Date(request.createdAt).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       )}

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="mt-4 flex justify-center items-center gap-4">
//           <button
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//             disabled={currentPage === 1}
//             className="bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span className="text-sm">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//             disabled={currentPage === totalPages}
//             className="bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GetTransportHelp;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransportRequests } from "../redux/thunks/transportThunks";

const GetTransportHelp = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { requests, loading, error } = useSelector((state) => state.transportHelp);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const transportPerPage = 5;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredRequests = requests.filter((request) => {
    const fullName = `${request.user.firstName} ${request.user.lastName}`.toLowerCase();
    return fullName.includes(searchQuery);
  });

  const indexOfLasttransport = currentPage * transportPerPage;
  const indexOfFirsttransport = indexOfLasttransport - transportPerPage;
  const currentTransports = filteredRequests.slice(indexOfFirsttransport, indexOfLasttransport);
  const totalPages = Math.ceil(filteredRequests.length / transportPerPage);

  useEffect(() => {
    dispatch(fetchTransportRequests());
  }, [dispatch]);

  if (loading) return <div>Loading transport help requests...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-base sm:text-2xl font-bold mb-4">Transport Help Requests</h2>

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
        <p>No transport help requests available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 whitespace-nowrap">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-sm sm:text-base py-2 px-4 border-b">Help Message ID</th>
                <th className="text-sm sm:text-base py-2 px-4 border-b">User Name</th>
                <th className="text-sm sm:text-base py-2 px-4 border-b">Message</th>
                <th className="text-sm sm:text-base py-2 px-4 border-b">Status</th>
                <th className="text-sm sm:text-base py-2 px-4 border-b">Created At</th>
                <th className="text-sm sm:text-base py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTransports.map((request) => (
                <tr key={request.helpMessageId} className="border-b">
                  <td className="text-xs sm:text-base py-2 px-4 text-center">{request.helpMessageId}</td>
                  <td className="text-xs sm:text-base py-2 px-4 text-center">{request.user.firstName} {request.user.lastName}</td>
                  <td className="text-xs sm:text-base py-2 px-4 text-center">{request.message}</td>
                  <td className="text-xs sm:text-base py-2 px-4 text-center">{request.status || "Open"}</td>
                  <td className="text-xs sm:text-base py-2 px-4 text-center">
                    {new Date(request.createdAt).toLocaleString()}
                  </td>
                  <td className="text-xs sm:text-base py-2 px-4 text-center">
                    <button
                      onClick={() => setSelectedRequest(request)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* {/ Pagination /} */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* {/ Modal for Close Reason /} */}
      {selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Close Reason</h3>
            <p className="text-gray-700 mb-4">
              {selectedRequest.closeReason ? selectedRequest.closeReason : "No close reason provided."}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedRequest(null)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetTransportHelp;
