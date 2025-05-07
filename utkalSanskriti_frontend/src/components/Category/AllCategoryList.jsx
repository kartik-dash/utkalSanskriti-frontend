import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory, selectCategories } from '../../redux/slices/categorySlice';
import { useNavigate } from 'react-router-dom';

const AllCategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(selectCategories);

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category));
    navigate(`/temples/${category.id}`);
  };

  return (
    <div className="relative container mx-auto mt-36 p-6">

      {/* {/ Categories Grid /} */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
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
    </div>
  );
};

export default AllCategoryList;