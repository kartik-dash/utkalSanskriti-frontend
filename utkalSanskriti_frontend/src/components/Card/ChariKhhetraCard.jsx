// src/components/ChariKhhetraCard.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedChariKhetra } from '../../redux/slices/categorySlice';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../assets/assets';

const ChariKhhetraCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChariKhetraClick = (product) => {
    dispatch(setSelectedChariKhetra(product)); // Set the selected Chari Khetra in Redux
    navigate(`/charikhetra/${product.id}`); // Navigate to Chari Khetra Details Page
  };

  return (
    
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) =>
          category.products
            .filter(product => product.chari_khetra === "yes")
            .map((product) => (
              <div
                key={product.id}
                className="charikhetra-sec bg-white border-4 border-blue-100 hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48  shadow-2xl border-orange object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {product.chari_khetra_name}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm sm:text-xl font-bold text-gray-800 mb-2 "> {product.name} </h3>
                  <p className="text-sm sm:text-md font-semi-bold items-center">{product.location}</p>
                  <button  onClick={() => handleChariKhetraClick(product)}  className='mt-5 px-2 py-2 sm:px-6 text-sm sm:text-md text-white sm:text-md bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-300"'>know more</button>
                </div>
              </div>
            ))
        )}
      </div>
      </div>
  );
};

export default ChariKhhetraCard;
