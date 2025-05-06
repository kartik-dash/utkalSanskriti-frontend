import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectFilteredTemples, selectAllVishnuTemples } from "../../redux/slices/lordvishnuSlice";
import SearchBar from "../SearchBar";

const LordVishnuCard = () => {
  const navigate = useNavigate();
  const filteredTemples = useSelector(selectFilteredTemples);
  const allVishnuTemples = useSelector(selectAllVishnuTemples);

  const templesToDisplay = filteredTemples.length > 0 ? filteredTemples : allVishnuTemples;

  return (
    <div className="container mx-auto p-6">
      <SearchBar />

      <div className="flex overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">
        {templesToDisplay.length > 0 ? (
          templesToDisplay.map((temple) => (
            <div
              key={temple.id}
              className="flex-shrink-0 w-80 mx-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={temple.image}
                  alt={temple.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Lord Vishnu
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{temple.name}</h3>
                <p className="text-lg items-center">{temple.location}</p>
                <button
                  onClick={() => navigate(`/lordvishnu/${temple.id}`)}
                  className="bg-dark rounded-lg text-white my-2 p-2"
                >
                  Know More
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-red-500">No temples found in this direction.</p>
        )}
      </div>
    </div>
  );
};

export default LordVishnuCard;

  