// import React from "react";
// import { useLocation } from "react-router-dom";
// import { useSelector,useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { selectCategories,setSelectedSearchResult } from "../../redux/slices/categorySlice";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }
 
// export default function TempleSearchResult() {
//   const navigate=useNavigate();
//   const dispatch=useDispatch();
//   const query = useQuery().get("query")?.toLowerCase() || "";
//   const categories = useSelector(selectCategories);

//   const filteredTemples = categories.flatMap((category) =>
//     category.products
//       .filter((product) =>
//         product.name.toLowerCase().includes(query) ||
//         category.category.toLowerCase().includes(query) ||
//         product.location.toLowerCase().includes(query)
//       )
//       .map((product) => ({
//         ...product,
//         district: category.category,
//       }))
//   );

//   const handleSearchResultClick = (product) => {
//       dispatch(setSelectedSearchResult(product));
//       navigate(`/searchedTemple/${product.id}`);
//     };

//   return (
//     <div className="container mx-auto my-24 p-6">
//       <h2 className="text-2xl font-semibold mb-6">Search Results for "{query}"</h2>

//       {filteredTemples.length === 0 ? (
//         <p className="text-gray-500">No results found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {filteredTemples.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white border-4 border-blue-100 hover:scale-105 hover:shadow-xl transition-all duration-300"
//             >
//               <div className="relative">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-48 shadow-2xl object-cover"
//                 />
//               </div>
//               <div className="p-4">
//                 <h3 className="text-sm sm:text-xl font-bold text-gray-800 mb-2">
//                   {product.name}
//                 </h3>
//                 <p className="text-sm font-semibold">{product.location}</p>
//                 <button
//                   onClick={() => handleSearchResultClick(product)}
//                   className="mt-5 px-2 py-2 sm:px-6 text-sm sm:text-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-300"
//                 >
//                   Know More
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCategories, setSelectedSearchResult } from "../../redux/slices/categorySlice";
import Fuse from "fuse.js";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function TempleSearchResult() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = useQuery().get("query") || "";
  const categories = useSelector(selectCategories);

  // Flatten all temple products into one array
  const allProducts = categories.flatMap((category) =>
    category.products.map((product) => ({
      ...product,
      district: category.category,
    }))
  );

  // Configure Fuse.js options
  const fuseOptions = {
    keys: [
      "name",
      "location",
      "district",
      "description",
      "details",
      "history.name",
      "history.description",
      "festivals.name",
      "festivals.description",
      "rituals_name",
      "about_rituals",
    ],
    threshold: 0.3, // Lower = stricter match, higher = fuzzy match
  };

  const fuse = new Fuse(allProducts, fuseOptions);
  const results = query ? fuse.search(query) : [];

  const filteredTemples = query ? results.map((result) => result.item) : [];

  const handleSearchResultClick = (product) => {
    dispatch(setSelectedSearchResult(product));
    navigate(`/searchedTemple/${product.id}`);
  };

  return (
    <div className="container mx-auto my-24 p-6">
      <h2 className="text-2xl font-semibold mb-6">Search Results for "{query}"</h2>

      {filteredTemples.length === 0 ? (
        <p className="text-gray-500">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTemples.map((product) => (
            <div
              key={product.id}
              className="bg-white border-4 border-blue-100 hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={product.image || "/default-temple.jpg"}
                  alt={product.name}
                  className="w-full h-48 shadow-2xl object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm sm:text-xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm font-semibold">{product.location}</p>
                <button
                  onClick={() => handleSearchResultClick(product)}
                  className="mt-5 px-2 py-2 sm:px-6 text-sm sm:text-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-300"
                >
                  Know More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
