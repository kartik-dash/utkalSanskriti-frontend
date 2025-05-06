// src/components/Products/ProductList.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedCategory, setSelectedProduct } from '../../redux/slices/categorySlice';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get the selected category from Redux store
  const selectedCategory = useSelector(selectSelectedCategory);

  const handleProductClick = (product) => {
    // Store the selected product in Redux store
    dispatch(setSelectedProduct(product));

    // Navigate to Product Details page
    navigate(`/products/${selectedCategory.id}/details/${product.id}`);
  };

  return (
    <div className="py-[140px] px-8">
      <h2 className="text-3xl font-semibold mb-4">Temples in {selectedCategory?.category}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {selectedCategory?.products?.map((product) => (
          <div
            key={product.id}
            className="p-4 border-2 border-white rounded shadow cursor-pointer relative bg-white-800 hover:border-blue-500 hover:scale-105 transition-all duration-300"
            onClick={() => handleProductClick(product)}
          >
            <div className="w-full h-48 mb-4 relative">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-center">
              <h3 className="font-semibold">{product.name}</h3>
              <p>{product.location}</p>
              <p className="mt-2 text-lg font-bold">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
