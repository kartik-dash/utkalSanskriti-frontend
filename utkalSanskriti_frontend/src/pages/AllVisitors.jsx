
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMidLevelData } from '../redux/thunks/midLevelThunks';

// const AllVisitors = ({ userId }) => {
//   const dispatch = useDispatch();
//   const { midLevelUser, loading, error } = useSelector((state) => state.midLevel);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const visitorsPerPage = 5;

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchMidLevelData(userId));
//     }
//   }, [dispatch, userId]);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   const filteredVisitors = midLevelUser ? midLevelUser.filter(visitor =>
//     visitor.firstName.toLowerCase().includes(searchQuery) ||
//     visitor.lastName.toLowerCase().includes(searchQuery)
//   ) : [];

//   const currentVisitors = filteredVisitors.slice((currentPage - 1) * visitorsPerPage, currentPage * visitorsPerPage);
//   const totalPages = Math.ceil(filteredVisitors.length / visitorsPerPage);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">All Visitors</h2>
//       <input
//         type="text"
//         placeholder="Search visitors..."
//         value={searchQuery}
//         onChange={handleSearchChange}
//         className="border p-2 w-70 mb-4"
//       />

//       {loading ? (
//         <p>Loading visitors...</p>
//       ) : error ? (
//         <p className="text-red-500">Error: {error}</p>
//       ) : (
//         <>
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border p-2">ID</th>
//                 <th className="border p-2">First Name</th>
//                 <th className="border p-2">Last Name</th>
//                 <th className="border p-2">Email</th>
//                 <th className="border p-2">Contact Number</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentVisitors.length > 0 ? (
//                 currentVisitors.map((visitor) => (
//                   <tr key={visitor.id} className="text-center">
//                     <td className="border p-2">{visitor.id}</td>
//                     <td className="border p-2">{visitor.firstName}</td>
//                     <td className="border p-2">{visitor.lastName}</td>
//                     <td className="border p-2">{visitor.Email}</td>
//                     <td className="border p-2">{visitor.ContactNumber}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="3" className="border p-2 text-center text-gray-500">No visitors found</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           <div className="mt-4 flex justify-center gap-4">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage(currentPage - 1)}
//               className="bg-gray-300 text-gray-700 p-2 rounded"
//             >
//               Previous
//             </button>
//             <span>Page {currentPage} of {totalPages}</span>
//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage(currentPage + 1)}
//               className="bg-gray-300 text-gray-700 p-2 rounded"
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default AllVisitors;