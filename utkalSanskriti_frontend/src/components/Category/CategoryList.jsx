import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory, selectCategories } from '../../redux/slices/categorySlice';
import { useNavigate } from 'react-router-dom';

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(selectCategories);

  // State for current page
  const [currentPage, setCurrentPage] = useState(0);
  const categoriesPerPage = 4;
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  const indexOfFirstCategory = currentPage * categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfFirstCategory + categoriesPerPage);

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category));
    navigate(`/temples/${category.id}`);
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="relative container mx-auto p-6">
      {/* Show All Button on Top */}
      <div className="mb-6 flex justify-center sm:justify-end">
        <button
          onClick={() => navigate('/showall')}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition-all"
        >
          Show All
        </button>
      </div>

      {/* Left Arrow */}
      {currentPage > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-600 transition-all z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentCategories.map((category) => (
          <div
            key={category.id}
            className="p-4 border-4 rounded shadow-lg cursor-pointer relative hover:border-blue-200 hover:scale-105 transition-all duration-300"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="w-full h-48 relative">
              <img src={category.image} alt={category.category} className="w-full shadow-2xl h-full object-cover rounded-lg" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold bg-black bg-opacity-20 px-4 py-2 rounded">
                {category.category}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {currentPage < totalPages - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-600 transition-all z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default CategoryList;
