// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { filterVishnuTemples, resetFilter } from "../../redux/slices/lordVishnuSlice";

// const SearchBar = () => {
//   const [direction, setDirection] = useState("");
//   const dispatch = useDispatch();

//   const handleSearch = () => {
//     if (direction.trim()) {
//       dispatch(filterVishnuTemples({ direction })); // Dispatch filter action
//     } else {
//       dispatch(resetFilter()); // Reset if search is empty
//     }
//   };

//   return (
//     <div className="flex items-center gap-2 mb-6">
//       <input
//         type="text"
//         placeholder="Enter direction (East, West, North, South)"
//         value={direction}
//         onChange={(e) => setDirection(e.target.value)}
//         className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
//       />
//       <button
//         onClick={handleSearch}
//         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//       >
//         Search
//       </button>
//     </div>
//   );
// };

// export default SearchBar;
