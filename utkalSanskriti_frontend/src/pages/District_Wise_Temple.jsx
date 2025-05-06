import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDistrictData, fetchDistrictTemple } from "../redux/thunks/templeThunks";

const DistrictSearch = () => {
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { districts = [], loading, error } = useSelector((state) => state.temple);
  const odishaDistrictTemples = useSelector((state) => state.temple.districtTemples) || [];

  useEffect(() => {
    dispatch(fetchDistrictData());
  }, [dispatch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckboxChange = (district) => {
    setSelectedDistricts((prevSelected) => {
      const isSelected = prevSelected.some((d) => d.name === district.name);
      let updatedSelection;

      if (isSelected) {
        updatedSelection = prevSelected.filter((d) => d.name !== district.name);
        dispatch({
          type: "temple/removeDistrictTemples",
          payload: district.name,
        });
      } else {
        updatedSelection = [...prevSelected, district];
        dispatch(fetchDistrictTemple(district.name));
      }

      return updatedSelection;
    });
  };

  const filteredPlaces = odishaDistrictTemples.filter((temple, index, self) =>
    selectedDistricts.some((district) => district.name === temple.districtName) &&
    index === self.findIndex((t) => t.id === temple.id)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <header className="bg-white shadow-md rounded-lg p-6 mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600">Explore Odisha by District</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Select districts to explore famous places.</p>
      </header>

      {/* Dropdown for District Selection */}
      <div className="relative flex justify-center px-4 sm:px-0 mb-8" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full max-w-lg px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm flex justify-between items-center focus:ring-2 focus:ring-indigo-500"
        >
          <span className="font-medium text-sm sm:text-base">
            {selectedDistricts.length > 0
              ? `Selected: ${selectedDistricts.map((d) => d.name).join(", ")}`
              : "Select Districts"}
          </span>
          <svg
            className={`w-5 h-5 transform transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {dropdownOpen && (
          <div className="absolute w-full max-w-lg bg-white border border-gray-300 shadow-lg rounded-lg mt-2 z-10 max-h-72 sm:max-h-60 overflow-y-auto">
            {loading ? (
              <p className="p-3 text-center">Loading...</p>
            ) : error ? (
              <p className="p-3 text-red-500">Error: {error}</p>
            ) : (
              districts.map((district) => (
                <label
                  key={district.districtId}
                  className="flex items-center p-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    className="mr-3"
                    checked={selectedDistricts.some((d) => d.name === district.name)}
                    onChange={() => handleCheckboxChange(district)}
                  />
                  {district.name}
                </label>
              ))
            )}
          </div>
        )}
      </div>

      {/* Show All Places from Selected Districts */}
      {filteredPlaces.length > 0 ? (
        selectedDistricts.map((district) => {
          const districtPlaces = filteredPlaces.filter((place) => place.districtName === district.name);
          if (districtPlaces.length === 0) return null;

          return (
            <div key={district.districtId} className="mb-6 bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">{district.name}</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {districtPlaces.map((temple) => (
                  <li
                    key={temple.id}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition-all"
                    onClick={() => navigate(`/place/${temple.id}`, { state: temple })}
                  >
                    <img
                      src={`data:image/png;base64,${temple.imageBase64}`}
                      alt={temple.name}
                      className="w-full h-40 sm:h-48 object-cover rounded-lg"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <h2 className="text-base sm:text-lg font-semibold text-gray-700">{temple.name}</h2>
                      <span className="text-yellow-500 font-semibold text-sm sm:text-lg">⭐ 4.5</span>
                    </div>
                    <p className="text-sm text-gray-500">{temple.location}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500 mt-6">No places available for the selected districts.</p>
      )}
    </div>
  );
};

export default DistrictSearch;
