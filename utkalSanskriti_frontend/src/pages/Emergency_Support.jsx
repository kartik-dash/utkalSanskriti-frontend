
// import React, { useState } from 'react';

// const Emergency_Support = () => {
//   const [description, setDescription] = useState('');
//   const [selectedOption, setSelectedOption] = useState('');
//   const [showPopup, setShowPopup] = useState(false);

//   const handleSubmit = () => {
//     if (description.trim() && selectedOption) {
//       setShowPopup(true);
//       setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Emergency Support</h2>

//       {/* Description Field */}
//       <textarea
//         className="w-full border p-2 rounded mb-4"
//         rows="4"
//         placeholder="Describe your issue..."
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       ></textarea>

//       {/* Show Radio Buttons Only If Description Is Entered */}
//       {description.trim() && (
//         <div className="mt-4 space-y-2">
//           <h3 className="text-lg font-semibold">Select an Option:</h3>

//           <label className="flex items-center space-x-2">
//             <input
//               type="radio"
//               value="including_guide"
//               checked={selectedOption === "including_guide"}
//               onChange={(e) => setSelectedOption(e.target.value)}
//               className="w-4 h-4"
//             />
//             <span>Including Guide</span>
//           </label>

//           <label className="flex items-center space-x-2">
//             <input
//               type="radio"
//               value="excluding_guide"
//               checked={selectedOption === "excluding_guide"}
//               onChange={(e) => setSelectedOption(e.target.value)}
//               className="w-4 h-4"
//             />
//             <span>Excluding Guide</span>
//           </label>

//           {/* Submit Button (Disabled Until Both Fields Are Selected) */}
//           <button
//             onClick={handleSubmit}
//             disabled={!selectedOption}
//             className={`mt-4 p-2 rounded w-full ${selectedOption ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
//           >
//             Submit
//           </button>
//         </div>
//       )}

//       {/* Popup Message */}
//       {showPopup && (
//         <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md">
//           Message sent successfully!
//         </div>
//       )}
//     </div>
//   );
// };

// export default Emergency_Support;
