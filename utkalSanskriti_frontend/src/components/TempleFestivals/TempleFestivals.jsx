import React from 'react';

const TempleFestivals = ({ festivals }) => {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Festivals</h3>
      {festivals?.length ? (
        festivals.map((festival, index) => (
          <div key={index}>
            {festival.name.map((name, i) => (
              <div key={i} className="mt-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="w-full lg:w-1/2">
                    {festival.img[i] ? (
                      <img
                        src={festival.img[i]}
                        alt={name}
                        className="w-full h-96 object-cover rounded-lg shadow-md"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">No image available</span>
                      </div>
                    )}
                  </div>
                  <div className="w-full lg:w-1/2">
                    <p className="text-2xl font-bold text-gray-700">{name}</p>
                    <p className="text-md sm:text-lg text-gray-700 mt-2">
                      {festival.description[i] || 'Description not available'}
                    </p>
                  </div>
                </div>
                {i < festival.name.length - 1 && <hr className="my-6 border-gray-200" />}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-4">No festival information available.</p>
      )}
    </div>
  );
};

export default TempleFestivals;
