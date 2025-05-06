// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { setSelectedAdiShaktiPitha } from "../../redux/slices/categorySlice";
// import { useNavigate } from "react-router-dom";
// import { categories } from "../../assets/assets";

// const AdiShaktiPithaCard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const filteredProducts = categories
//     .flatMap((category) => category.products)
//     .filter((product) => product.adishakti_pitha === "yes");

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const itemsPerPage = 4;
//   const totalItems = filteredProducts.length;

//   const handleAdiShaktiPithaClick = (product) => {
//     dispatch(setSelectedAdiShaktiPitha(product));
//     navigate(`/adishaktipitha/${product.id}`);
//   };

//   const handleNext = () => {
//     if (currentIndex + itemsPerPage < totalItems) {
//       setCurrentIndex((prev) => prev + itemsPerPage);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((prev) => prev - itemsPerPage);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 relative">
//       {/* Cards Container */}
//       <div className="overflow-hidden w-full">
//         <div className="flex transition-transform duration-300"
//           style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}>
//           {filteredProducts.map((product) => (
//             <div
//               key={product.id}
//               className="w-72 flex-shrink-0 bg-white border-4 mx-4 border-blue-100 hover:scale-105 hover:shadow-xl transition-all duration-300"
//             >
//               <div className="relative">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
//                   Adi Shakti Pitha
//                 </div>
//               </div>
//               <div className="p-4 text-center">
//                 <h3 className="text-sm sm:text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
//                 <p className="text-sm sm:text-md font-semi-bold">{product.location}</p>
//                 <button
//                   onClick={() => handleAdiShaktiPithaClick(product)}
//                   className="font-bold border-2 border-blue-200 rounded-lg text-sm sm:text-xl text-blue-400 my-2 p-2"
//                 >
//                   Know More
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdiShaktiPithaCard;



import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedAdiShaktiPitha } from "../../redux/slices/categorySlice";
import { useNavigate } from "react-router-dom";
import { categories } from "../../assets/assets";

const AdiShaktiPithaCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredProducts = categories
    .flatMap((category) => category.products)
    .filter((product) => product.adishakti_pitha === "yes");

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const totalItems = filteredProducts.length;

  const handleAdiShaktiPithaClick = (product) => {
    dispatch(setSelectedAdiShaktiPitha(product));
    navigate(`/adishaktipitha/${product.id}`);
  };

  const handleNext = () => {
    if (currentIndex + itemsPerPage < totalItems) {
      setCurrentIndex((prev) => prev + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - itemsPerPage);
    }
  };

  return (
    <div className="container mx-auto p-6 relative">
      {/* Grid for small devices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border-4 border-blue-100 hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                Adi Shakti Pitha
              </div>
            </div>
            <div className="p-4 text-center">
              <h3 className="text-sm sm:text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-sm sm:text-md font-semi-bold">{product.location}</p>
              <button
                onClick={() => handleAdiShaktiPithaClick(product)}
                className="mt-5 px-2 py-2 sm:px-6 text-sm sm:text-md text-white sm:text-md bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-300">
                Know More
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Slider for medium and above
      <div className="hidden md:block overflow-hidden w-full">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-72 flex-shrink-0 bg-white border-4 mx-4 border-blue-100 hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Adi Shakti Pitha
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-sm sm:text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-sm sm:text-md font-semi-bold">{product.location}</p>
                <button
                  onClick={() => handleAdiShaktiPithaClick(product)}
                  className="font-bold border-2 border-blue-200 rounded-lg text-sm sm:text-xl text-blue-400 my-2 p-2"
                >
                  Know More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default AdiShaktiPithaCard;
