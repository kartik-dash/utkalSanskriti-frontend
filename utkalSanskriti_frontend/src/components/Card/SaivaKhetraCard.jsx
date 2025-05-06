
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedSaivaKhetra } from '../../redux/slices/categorySlice';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../assets/assets';

const SaivaKhetraCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredProducts = categories
    .flatMap((category) => category.products)
    .filter((product) => product.saiva_khetra === "yes");

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const totalItems = filteredProducts.length;

  const handleSaivaKhetraClick = (product) => {
    dispatch(setSelectedSaivaKhetra(product));
    navigate(`/saivakhetra/${product.id}`);
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex + itemsPerPage < totalItems) {
        setCurrentIndex((prev) => prev + itemsPerPage);
      } else {
        setCurrentIndex(0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, itemsPerPage, totalItems]);

  return (
    <div className="container max-w-9xl mx-auto p-6 relative">
      {/* Grid Layout for Small Screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-4">
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
                Shaiva Pithas
              </div>
            </div>
            <div className="p-4 text-center">
              <h3 className="text-sm sm:text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-sm sm:text-md font-semi-bold">{product.location}</p>
              <button
                onClick={() => handleSaivaKhetraClick(product)}
                className="mt-5 px-2 py-2 sm:px-6 text-sm sm:text-md text-white sm:text-md bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-300"
              >
                Know More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Horizontal Slider for Medium and Up Screens */}
      <div className="hidden md:block overflow-hidden w-full">
        {/* Left Navigation */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-1 mr-2 rounded-full shadow-lg hover:bg-gray-600 transition-all z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Card Slider */}
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
                  Shaiva Pithas
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-sm sm:text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-sm sm:text-md font-semi-bold">{product.location}</p>
                <button
                  onClick={() => handleSaivaKhetraClick(product)}
                  className="mt-5 px-2 py-2 sm:px-6 text-sm sm:text-md text-white sm:text-md bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-300"
                >
                  Know More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Navigation */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 ml-2 bg-gray-800 text-white p-1 rounded-full shadow-lg hover:bg-gray-600 transition-all z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SaivaKhetraCard;
