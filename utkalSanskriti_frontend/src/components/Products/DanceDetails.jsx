import { useSelector } from "react-redux";
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const DanceDetails = () => {

 const navigate = useNavigate();
     const SelectedDance = useSelector(state => state.dance.selectedDance);

     useEffect(() => {
      if(!SelectedDance) {
        navigate('/');
      }
     },[SelectedDance, navigate]);
 
  return (

    <div className="container mx-auto p-6">
        {SelectedDance ? (
          <div className="max-w-4xl mx-auto bg-white mt-[80px] shadow-lg rounded-xl overflow-hidden">
            <div className="relative">
              <img 
              src={SelectedDance.image}
              alt={SelectedDance.title}
              className="w-full h-96 object-cover rounded-t-xl"
              />
            {/* <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30"></div> */}
            

            <div className="p-6 bg-gray-50">
              <h2 className="text-3xl font-semibod text-gray-800 mb-4">{SelectedDance.title}</h2>
              <p className="text-lg text-gray-600">{SelectedDance.description}</p>

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
          </div>
           ) : (
            <p className="text-center text-gray-600">Loading...</p>     
        )}
      </div>

  )
}

export default DanceDetails;



 