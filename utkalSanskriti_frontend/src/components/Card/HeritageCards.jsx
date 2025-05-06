// src/components/Card/HeritageCard.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedHeritageSites } from '../../redux/slices/categorySlice';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../assets/assets';

const HeritageCards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleHeritageClick = (product) => {
    dispatch(setSelectedHeritageSites(product)); // Set the selected Heritage in Redux
    navigate(`/heritageSites/${product.id}`); // Navigate to Chari Heritage Details Page
  };

  return (
    <div className="container mx-auto p-6 mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) =>
          category.products
            .filter(product => product.heritage_sites=== "yes")
            .map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-80 mx-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Heritage Sites
                  </div>
                </div>
                <div className="p-4 ">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 truncate"> {product.name} </h3>
                  <p className="text-lg items-center">{product.location}</p>
                  <button  onClick={() => handleHeritageClick(product)}  className='bg-dark rounded-lg text-white my-2 p-2'>know more</button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default HeritageCards;
