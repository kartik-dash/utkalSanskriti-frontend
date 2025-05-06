import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedEast } from '../../redux/slices/categorySlice';
import { categories } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
const EastCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEastClick = (product) => {
        dispatch(setSelectedEast(product)); // Set the selected Chari Khetra in Redux
        navigate(`/east/${product.id}`); // Navigate to Chari Khetra Details Page
    
  };
  return (
    <div className="container mx-auto p-6">
       <button onClick={() => navigate(-1)} className="mt-[100px] px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">← Back</button>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-[30px]">
      {categories.map((category) =>
        category.products
          .filter((product) => product.east === "yes")
          .map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  East
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-center text-gray-800 mb-2 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-center">{product.location}</p>
                <button
                  onClick={() => handleEastClick(product)}
                  className="bg-dark rounded-lg text-white my-2 p-2 w-full"
                >
                  Know More
                </button>
              </div>
            </div>
          ))
      )}
    </div>
  </div>
);
};
export default EastCard;


