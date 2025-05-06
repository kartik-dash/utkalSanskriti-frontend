import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory, selectCategories } from '../../redux/slices/categorySlice';
import { useNavigate } from 'react-router-dom';

const ExploreUtkal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(selectCategories);
  
  const handleCategoryClick = (category) => {
    // Store the selected category in Redux store
    dispatch(setSelectedCategory(category));
    
    // Navigate to Product Page with category ID as a URL parameter
    navigate(`/products/${category.id}`);
  };


  return (
  
    <div className="px-4 py-4 text-blue text-sm grid">
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="cursor-pointer transform transition-all duration-300 hover:bg-blue-500 hover:text-white hover:scale-105 rounded-lg p-4 text-center"
            onClick={() => handleCategoryClick(category)}
           >   
            <div className="font-semibold">
              {category.dist}
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default ExploreUtkal;



