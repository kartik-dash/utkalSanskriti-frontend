// src/components/ChariKhetraDetails.js
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectSelectedAdiShaktiPitha } from '../../redux/slices/categorySlice';
import MapComponent from '../Map/MapComponent';
import CalendarComponent from '../Calender/CalenderComponent';
import TempleFestivals from '../TempleFestivals/TempleFestivals';
import TempleHistory from '../History/TempleHistory';

const AdiShaktiPithaDetails = () => {
  const navigate=useNavigate();
  // Fetching ChariKhetra object from Redux store
  const adishaktiPitha = useSelector(selectSelectedAdiShaktiPitha);

  // If chariKhetra is undefined or null, show a fallback message
  if (!adishaktiPitha) return <p className="text-center text-gray-600">Please select a Shakti Pitha.</p>;

  // State for selected image
  const [selectedImage, setSelectedImage] = useState(adishaktiPitha?.image_arr?.[0] || null);
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

  return (
    <div className="px-4 py-20 pt-10 sm:pt-32 max-w-7xl mx-auto animate-fadeIn bg-gray-600 rounded-lg shadow-xl">
       <button onClick={() => navigate(-1)} className="mt-20 sm:mt-4 px-4 py-2 bg-blue-500 text-white mb-8 rounded-lg hover:bg-blue-700">← Back</button>
      <div className="flex flex-col lg:flex-row gap-8 p-6 bg-white rounded-lg shadow-md">
        {/* Image Section */}
        <div className="flex-shrink-0 w-full lg:w-1/2">
          {/* Main Image */}
          <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <img
              src={selectedImage}
              alt={adishaktiPitha.name}
              className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex mt-6 space-x-4 overflow-x-auto py-2">
            {adishaktiPitha.image_arr?.map((img, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${selectedImage === img ? 'border-blue-500' : 'border-transparent'
                  } hover:border-blue-300 transition-all duration-200`}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`${adishaktiPitha.name} thumbnail ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div> 
        {/* Details Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-800">{adishaktiPitha.name}</h2>
          <p className="text-xl sm:text-2xl text-gray-600 mt-2">{adishaktiPitha.location}</p>
          {/* <p className="text-md sm:text-xl text-gray-700 mt-4">{adishaktiPitha.description}</p> */}
          <p className="text-md sm:text-lg text-gray-700 mt-4 whitespace-pre-line text-justify">{adishaktiPitha.details}</p>
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

      {/* Rituals Section */}
      {activeSection === "knowMore" && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
          <h3 className="text-2xl font-semibold text-gray-800">Rituals and Practices</h3>
          {adishaktiPitha.rituals_img?.map((img, index) => (
            <div key={index} className="mt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Ritual Image */}
                <div className="w-full lg:w-1/2">
                  {img ? (
                    <img src={img} alt={`Ritual ${index + 1}`} className="w-full h-96 object-cover rounded-lg shadow-md" />
                  ) : (
                    <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">No image available</span>
                    </div>
                  )}
                </div>

                {/* Ritual Name and Description */}
                <div className="w-full lg:w-1/2">
                  <p className="text-2xl text-bold text-gray-700">
                    {adishaktiPitha.rituals_name?.[index] || 'Description not available'}
                  </p>
                  <p className="text-md sm:text-lg text-gray-700 mt-2">
                    {adishaktiPitha.about_rituals?.[index] || 'Description not available'}
                  </p>
                </div>
              </div>

              {/* Optional separator */}
              {index < adishaktiPitha.rituals_img.length - 1 && (
                <hr className="my-6 border-gray-200" />
              )}
            </div>
          ))}

          {/* Show message if no rituals exist */}
          {!adishaktiPitha.rituals_img?.length && (
            <p className="text-gray-500 mt-4">No rituals information available.</p>
          )}
        </div>
      )}

      {activeSection === 'calendar' && <CalendarComponent calendar={adishaktiPitha.calender} />}
      {activeSection === 'festivals' && <TempleFestivals festivals={adishaktiPitha.festivals} />}
      {activeSection === 'history' && <TempleHistory history={adishaktiPitha.history} />}

      {/* Map Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Location Map</h3>
        <MapComponent product={adishaktiPitha} userLocation={userLocation} />
      </div>
    </div>
  )
}

export default AdiShaktiPithaDetails