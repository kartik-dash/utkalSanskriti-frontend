import { useState } from "react";
import axios from "axios";

const districts = [
  "Angul",
  "Balangir",
  "Balasore",
  "Baleshwar",
  "Bargarh",
  "Bhadrak",
  "Boudh",
  "Cuttack",
  "Debagarh",
  "Deogarh",
  "Dhenkanal",
  "Gajapati",
  "Ganjam",
  "Jagatsinghpur",
  "Jajpur",
  "Jharsuguda",
  "Kalahandi",
  "Kandhamal",
  "Kendrapara",
  "Keonjhar",
  "Khordha",
  "Koraput",
  "Malkangiri",
  "Mayurbhanj",
  "Nabarangpur",
  "Nayagarh",
  "Nuapada",
  "Puri",
  "Rayagada",
  "Sambalpur",
  "Subarnapur",
  "Subarnapur (Sonepur)",
  "Sundargarh"
]; // Add more districts as needed

const WeatherChecker = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  const apiKey = "1cd3000b8a789768e3d2de3da113d818"; // Replace with your API key

  // 📍 Fetch weather by user's current location
  const getWeatherByLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
          );

          console.log("API Response (Location):", response.data); // ✅ Debug log

          setWeather(response.data);
          setCity(response.data.name);
          setError("");
        } catch (err) {
          console.error("API Error:", err.response?.data || err.message);
          setError("Unable to fetch weather data.");
        }
      },
      (err) => {
        setError("Permission denied. Please enable location access.");
      }
    );
  };

  // 🔍 Fetch weather by city name
  const getWeatherByCity = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      console.log("API Response (City):", response.data); // ✅ Debug log

      setWeather(response.data);
      setError("");
      setSuggestions([]); // Clear suggestions after fetching data
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  // Handle input change and filter suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value.length > 0) {
      const filtered = districts.filter((district) =>
        district.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // Select suggestion and fetch weather
  const handleSuggestionClick = (district) => {
    setCity(district);
    setSuggestions([]);
    getWeatherByCity();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-center">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Weather Checker</h1>

        {/* 📍 Get Weather by Location */}
        <button
          onClick={getWeatherByLocation}
          className="bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base px-4 py-2 rounded-lg w-full font-semibold mb-4"
        >
          📍 Get Weather By Location
        </button>

        {/* 🔍 Search Weather by City with Suggestions */}
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter City or District Name"
          className="w-full px-4 py-2 border rounded-lg mb-2 focus:ring focus:ring-blue-300"
        />

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="bg-white border rounded-lg shadow-md max-h-40 overflow-auto text-left">
            {suggestions.map((district, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(district)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                {district}
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={getWeatherByCity}
          className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base text-white px-4 py-2 rounded-lg w-full font-semibold mt-4"
        >
          🔍 Check Weather
        </button>

        {/* 🔴 Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* 🌤 Weather Display */}
        {weather && weather.main && (
          <div className="mt-6 p-4 rounded-lg bg-gray-100 shadow-md">
            <h3 className="text-2xl font-semibold text-gray-900">
              {weather.name}, {weather.sys.country}
            </h3>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="w-24 h-24 mx-auto"
            />
            <p className="text-xl font-semibold">🌡 {weather.main.temp}°C</p>
            <p className="text-lg text-gray-700 capitalize">
              🌦 {weather.weather[0].description}
            </p>
            <p className="text-gray-600">💧 Humidity: {weather.main.humidity}%</p>
            <p className="text-gray-600">💨 Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherChecker;






