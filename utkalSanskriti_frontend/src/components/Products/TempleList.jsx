import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedCategory, setSelectedProduct } from '../../redux/slices/categorySlice';
import { useNavigate } from 'react-router-dom';

const TempleList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get the selected category from Redux store
  const selectedCategory = useSelector(selectSelectedCategory);

  // Filter products where temple = "yes"
  const filteredProducts = selectedCategory?.products?.filter(product => product.temple === "yes");

  const handleProductClick = (product) => {
    // Store the selected product in Redux store
    dispatch(setSelectedProduct(product));

    // Navigate to Product Details page
    navigate(`/products/${selectedCategory.id}/details/${product.id}`);
  };

  // Show a loading message if selectedCategory is undefined
  if (!selectedCategory) {
    return <p className="text-center text-xl py-20">Loading category data...</p>;
  }

  return (
    <div className="container">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
        ← Back
      </button>
      <h2 className="text-lg sm:text-3xl font-semibold mb-4">
        Temples in {selectedCategory?.category}
      </h2>

      {/* Show message if no products with temple: "yes" */}
      {filteredProducts.length === 0 ? (
        <p>No temples available in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 border-2 border-orange rounded shadow cursor-pointer relative bg-white-800 hover:border-blue-500 hover:scale-105 transition-all duration-300"
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
                <h3 className="font-semibold text-lg sm:text-lg">{product.name}</h3>
                <p>{product.location}</p>
                <p className="mt-2 text-lg text-justify">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TempleList;
