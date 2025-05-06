import React from "react";
import { useNavigate } from "react-router-dom";

// Card Component
const Cards = ({ image, title, description, link }) => {
  const navigate=useNavigate()
  return (
    <div onClick={()=>navigate(link)} className="bg-white rounded-lg shadow-md overflow-hidden w-60">
      <img src={image} alt={title} loading="lazy" className="w-full object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};


export default Cards;
