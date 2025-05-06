// import React from 'react';

// const Disclaimer = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <div className="bg-white max-w-3xl p-8 rounded-2xl shadow-lg border border-orange-300">
//         <h1 className="text-2xl font-semibold text-orange-600 mb-4 text-center">Disclaimer</h1>
//         <p className="text-gray-700 text-justify leading-relaxed">
//           The information provided on <span className="font-bold">utkalsanskriti.org</span> has been collected 
//           from various articles, publications, and sources believed to be reliable. 
//           While we strive to present accurate and updated content, 
//           <span className="font-medium"> Sri Utkal Sanskriti Sansthanam</span> does not guarantee the completeness, 
//           reliability, or accuracy of the information. Users are advised to independently 
//           verify any information before relying on it.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Disclaimer;



import React from 'react';import { useNavigate } from "react-router-dom";

const Disclaimer = () => {
  
  const navigate=useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white max-w-3xl p-8 rounded-2xl shadow-lg border border-orange-300 relative">
        {/* <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-600 hover:text-orange-600 text-xl font-bold"
        >
          ✖
        </button> */}
        <button onClick={() => navigate(-1)} className="absolute top-4 right-6 text-gray-600 hover:text-orange-600 text-xl font-bold">✖</button>
        <h1 className="text-2xl font-semibold text-orange-600 mb-4 text-center">Disclaimer</h1>
        <p className="text-gray-700 text-justify leading-relaxed">
          The information provided on <span className="font-bold">utkalsanskriti.org</span> has been collected
          from various articles, publications, and sources believed to be reliable.
          While we strive to present accurate and updated content,
          <span className="font-medium"> Sri Utkal Sanskriti Sansthanam</span> does not guarantee the completeness,
          reliability, or accuracy of the information. Users are advised to independently
          verify any information before relying on it.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
