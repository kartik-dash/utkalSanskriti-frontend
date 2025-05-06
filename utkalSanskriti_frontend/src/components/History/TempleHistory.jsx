import React from 'react';

const TempleHistory = ({ history }) => {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">History</h3>
      {history?.length ? (
        history.map((historyItem, index) => (
          <div key={index}>
            {historyItem.name.map((name, i) => (
              <div key={i} className="mt-6 bg-white p-4 rounded-lg shadow-md">
                <div className="w-full">
                  {historyItem.img[i] ? (
                    <img
                      src={historyItem.img[i]}
                      alt={name}
                      className="w-full h-96 object-fill rounded-lg shadow-md"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">No image available</span>
                    </div>
                  )}
                </div>
                <div className="text-center mt-4">
                  <p className="text-2xl font-bold text-gray-700">{name}</p>
                  <p className="text-base sm:text-lg text-gray-700 text-justify mt-2">
                    {historyItem.description[i] || 'Description not available'}
                  </p>
                </div>
                {i < historyItem.name.length - 1 && <hr className="my-6 border-gray-200" />}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-4">No history information available.</p>
      )}
    </div>
  );
};

export default TempleHistory;
