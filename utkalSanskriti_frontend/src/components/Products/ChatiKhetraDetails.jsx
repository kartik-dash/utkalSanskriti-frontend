import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectSelectedChariKhetra } from "../../redux/slices/categorySlice";
import CalendarComponent from "../Calender/CalenderComponent";
import TempleFestivals from "../TempleFestivals/TempleFestivals";
import MapComponent from "../Map/MapComponent";
import TempleHistory from '../History/TempleHistory';


const ChariKhetraDetails = () => { 
  const navigate=useNavigate();
  const chariKhetra = useSelector(selectSelectedChariKhetra);
  const [selectedImage, setSelectedImage] = useState(chariKhetra?.image_arr?.[0] || null);
  const [activeSection, setActiveSection] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const token=sessionStorage.getItem("token")

  const handleBookNow = () => (event) => {
    event.stopPropagation();

    if (!token) {
      navigate("/login");
      return;
    }

    navigate("/TempleSearch");
  };


  // Get user's current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    }
  }, []);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  if (!chariKhetra) return <p className="text-center text-gray-600">Please select a Chari Khetra.</p>;

  return (
    <div className="px-4 py-20 pt-32 max-w-7xl mx-auto animate-fadeIn bg-gray-600 rounded-lg shadow-xl">
              <button onClick={() => navigate(-1)} className="mt-2 sm:mt-4 px-4 py-2 bg-blue-500 text-white mb-8 rounded-lg hover:bg-blue-700">← Back</button>
      <div className="flex flex-col lg:flex-row gap-8 p-6 bg-white rounded-lg shadow-md">
        {/* Image Section */}
        <div className="flex-shrink-0 w-full lg:w-1/2">
          <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <img
              src={selectedImage}
              alt={chariKhetra.name}
              className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="flex mt-6 space-x-4 overflow-x-auto py-2">
            {chariKhetra.image_arr?.map((img, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${
                  selectedImage === img ? "border-blue-500" : "border-transparent"
                } hover:border-blue-300 transition-all duration-200`}
                onClick={() => setSelectedImage(img)}
              >
                <img src={img} alt={`${chariKhetra.name} thumbnail ${index}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-800">{chariKhetra.name}</h2>
          <p className="text-xl sm:text-2xl text-gray-600 mt-2">{chariKhetra.location}</p>
          {/* <p className="text-md sm:text-xl text-gray-700 mt-4">{chariKhetra.description}</p> */}
          <p className="text-md sm:text-lg text-gray-700 mt-4 whitespace-pre-line text-justify">{chariKhetra.details}</p>
          <button onClick={handleBookNow()} className='text-xs sm:text-base md:text-lg px-6 py-2 rounded-lg  mt-4   text-white hover:bg-blue-700  bg-blue-600 transition-all'>Schedule Visit</button>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mt-6 flex-wrap">
        <button onClick={() => toggleSection('knowMore')} className={`text-xs sm:text-base md:text-lg px-6 py-2 rounded-lg ${activeSection === 'knowMore' ? 'bg-blue-600' : 'bg-blue-500'} text-white hover:bg-blue-700 transition-all`}>Daily Rituals</button>
        <button onClick={() => toggleSection('calendar')} className={`text-xs sm:text-base md:text-lg px-6 py-2 rounded-lg ${activeSection === 'calendar' ? 'bg-green-600' : 'bg-green-500'} text-white hover:bg-green-700 transition-all`}>Show Event Calendar</button>
        <button onClick={() => toggleSection('festivals')} className={`text-xs sm:text-base md:text-lg px-6 py-2 rounded-lg ${activeSection === 'festivals' ? 'bg-purple-600' : 'bg-purple-500'} text-white hover:bg-purple-700 transition-all`}>Show Festivals</button>
        <button onClick={() => toggleSection('history')} className={`text-xs sm:text-base md:text-lg px-6 py-2 rounded-lg ${activeSection === 'history' ? 'bg-yellow-600' : 'bg-yellow-500'} text-white hover:bg-yellow-700 transition-all`}>Show History</button>
      </div>

      {/* Sections */}
      {activeSection === 'knowMore' && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
          <h3 className="text-2xl font-semibold text-gray-800">Rituals and Practices</h3>
          {chariKhetra.rituals_img?.map((img, index) => (
            <div key={index} className="mt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-1/2">
                  <img src={img} alt={`Ritual ${index + 1}`} className="w-full h-96 object-cover rounded-lg shadow-md" />
                </div>
                <div className="w-full lg:w-1/2">
                  <p className="text-2xl font-bold text-gray-700">{chariKhetra.rituals_name?.[index] || "No Name"}</p>
                  <p className="text-md sm:text-lg text-gray-700 mt-2">{chariKhetra.about_rituals?.[index] || "No Description"}</p>
                </div>
              </div>
            </div>
          )) || <p className="text-gray-500 mt-4">No rituals information available.</p>}
        </div>
      )}

      {activeSection === 'calendar' && <CalendarComponent calendar={chariKhetra.calender} />}
      {activeSection === 'festivals' && <TempleFestivals festivals={chariKhetra.festivals} />}
      {activeSection === 'history' && <TempleHistory history={chariKhetra.history} />}

      {/* Map Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Location Map</h3>
        <MapComponent product={chariKhetra} userLocation={userLocation} />
      </div>
    </div>
  );
};

export default ChariKhetraDetails;
