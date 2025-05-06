
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { searchTemples, clearSearchResults } from "../redux/thunks/templeThunks";

function TempleSearch() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchedTemples = [], searchStatus, error } = useSelector((state) => state.temple);

  const suggestionsRef = useRef(null);

  // Debounce Function
  function debounce(func, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  // Debounced search call
  const debouncedSearch = debounce((q) => {
    if (q.trim()) {
      dispatch(searchTemples(q));
    }
  }, 300); // Change delay here

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
    debouncedSearch(value);
  };

  const handleSuggestionClick = (name) => {
    setQuery(name);
    setShowSuggestions(false);
    dispatch(searchTemples(name));
  };

  const handleClickOutside = (e) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-6 max-w-4xl mt-6 mx-auto relative">
      <h1 className="text-3xl font-bold text-center mb-6">Temple Wise Search</h1>

      <div className="relative w-full mb-6">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Type temple name..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        />

        {/* Suggestions Box */}
        {showSuggestions && searchedTemples.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute z-50 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto"
          >
            {searchedTemples.map((temple) => (
              <div
                key={temple.id}
                onClick={() => handleSuggestionClick(temple.name)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {temple.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {searchStatus === "loading" && <p className="text-center text-gray-500">Searching...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {searchedTemples.map((temple) => (
          <div key={temple.id} 
          onClick={() => navigate(`/place/${temple.id}`, { state: temple })}
          className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Image */}
            <img
              src={`data:image/png;base64,${temple.imageBase64}`}
              alt={temple.name}
              className="w-full h-48vh object-cover rounded"
            />
            <div className="p-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{temple.name}</h2>
                <p className="text-gray-600">{temple.location}, {temple.district}</p>
                <p className="mt-2 text-gray-700">{temple.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TempleSearch;
