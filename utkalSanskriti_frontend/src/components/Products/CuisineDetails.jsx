import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CuisineDetails = () => {
  const navigate = useNavigate();
  
  // Get the selected cuisine from Redux store
  const selectedCuisine = useSelector(state => state.cuisine.selectedCuisine);


  return (

    <div className="container mx-auto p-6">
      {selectedCuisine ? (
        <div className="max-w-4xl mx-auto bg-white mt-[80px] shadow-lg rounded-xl overflow-hidden">
          {/* Image Section */}
          <div className="relative">
            <img 
              src={selectedCuisine.image} 
              alt={selectedCuisine.title} 
              className="w-full h-96 object-cover rounded-t-xl"
            />
            {/* Overlay text for the image (optional) */}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30"></div>
          </div>

          {/* Content Section */}
          <div className="p-6 bg-gray-50">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">{selectedCuisine.title}</h2>
            <p className="text-lg text-gray-600">{selectedCuisine.description}</p>

            {/* More details button */}
            <div className="mt-6">
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
                onClick={() => alert('More details coming soon!')}
              >
                Show More
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading...</p>      
      )}
    </div>
  );
};

export default CuisineDetails;



