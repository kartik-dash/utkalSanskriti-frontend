

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Direction = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* East Section */}
        <div
          className="p-6 bg-blue-200 border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all"
          onClick={() => navigate('/east')} // Navigate to EastCard page
        >
          <img src="/puri-img/temple.jpg" alt="Eastern Odisha" className="w-full h-40 object-cover rounded-lg" />
          <h2 className="text-2xl font-semibold text-blue-700 mt-2">Eastern Odisha</h2>
        </div>

        {/* West Section */}
        <div 
           className="p-6 bg-yellow-200 border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all"
           onClick={() => navigate('/west')}
           >

          <img src="/sambalpur-img/sambalpur-image.jpg" alt="Western Odisha" className="w-full h-40 object-cover rounded-lg" />
          <h2 className="text-2xl font-semibold text-yellow-700 mt-2">Western Odisha</h2>
        </div>

        {/* North Section */}
        <div className="p-6 bg-green-200 border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all"
           onClick={() => navigate('/north')}
        >

          <img src='/banner-img/maa ambika temple.jpg' alt="Northern Odisha" className="w-full h-40 object-cover rounded-lg" />
          <h2 className="text-2xl font-semibold text-green-700 mt-2">Northern Odisha</h2>
        </div>

        {/* South Section */}
        <div className="p-6 bg-red-200 border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all"
            onClick={() => navigate('/south')}
        >
          <img src="/adishaktipitha-img/Tara-Tarini-Temple.jpg" alt="Southern Odisha" className="w-full h-40 object-cover rounded-lg" />
          <h2 className="text-2xl font-semibold text-red-700 mt-2">Southern Odisha</h2>
        </div>
      </div>
    </div>
  );
};

export default Direction;



