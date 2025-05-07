import React, { useState } from "react";
import Slider from "../components/Slider/Slider";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Card/Cards";
import { cardData, sliderImages } from "../assets/assets";
import CategoryList from "../components/Category/CategoryList";
import ShaktiPithaCard from "../components/Card/ShaktiPithaCard";
import AdiShaktiPithaCard from '../components/Card/AdiShaktiPithaCard';
import ChariKhhetraCard from "../components/Card/ChariKhhetraCard";
import UpcomingEventCard from "../components/Card/UpcomingEventCard";
import BlogCard from "../components/Card/BlogCard";
import ReviewList from "../components/Products/ReviewList";
import Direction from "./Direction";
import SaivaKhetraCard from "../components/Card/SaivaKhetraCard";

export default function Home() {
  const [query,setQuery]=useState("")
  const navigate=useNavigate();
  const handleSearch=()=>{
    if(query.trim()){
      navigate(`/temples/search?query=${encodeURIComponent(query)}`)
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="space-y-0 select-none overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        <Slider images={sliderImages} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold leading-tight">
            Explore Odisha
          </h1>
          <p className="text-xl sm:text-3xl mt-4">
            "Discover Odisha's Rich Cultural Legacy - All In One Place."
          </p>
            {/* Search Input */}
            <div className="mt-6 flex justify-center">
            <input
              type="text"
              placeholder="Search temples or districts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full max-w-md px-4 py-2 rounded-l-md text-black"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 text-white"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="relative py-20 text-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: "url('/background-image/Untitled design.jpg')" }}></div>
        <div className="relative z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-black">
            "Experience a journey guided by faith, love, and devotion."
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {cardData.map((card, index) => (
              <Cards key={index} image={card.image} title={card.title} description= {card.description} link={card.link}/>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div id="events-section" className="relative py-2 sm:py-20 text-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/background-image/event-bg.jpg')" }}></div>
        <div className="relative z-10 text-black">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
            Join Us and Get Ready for the Most Anticipated Upcoming Events.
          </h2>
          <UpcomingEventCard />
        </div>
      </div>

      {/* Other Sections */}
      <div id="explore-section" className="bg-white py-8 sm:py-20 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">Connecting Odisha to the World</h2>
        <CategoryList />
      </div>

      <div className="bg-white py-2 sm:py-10 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
          CHARI_KHETRAS <span className="text-orange">OF ODISHA</span>
        </h2>
        <ChariKhhetraCard />
      </div>

      <div className="bg-white py-2 sm:py-10 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
          EXPLORE EVERY CORNER <span className="text-orange">OF FAITH</span>
        </h2>
        <Direction />
      </div>

      <div className="bg-white py-2 sm:py-10 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
          ADISHAKTI_PITHAS <span className="text-orange">OF ODISHA</span>
        </h2>
        <AdiShaktiPithaCard />
      </div>

      <div className="bg-white py-2 sm:py-10 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
          SHAIVA_PITHAS <span className="text-orange">OF ODISHA</span>
        </h2>
        <SaivaKhetraCard />
      </div>

      <div className="bg-white py-2 sm:py-10 shadow-lg text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
          SHAKTI_PITHAS <span className="text-orange">OF ODISHA</span>
        </h2>
        <ShaktiPithaCard />
      </div>

      <div className="bg-white text-center">
        <h2 className="text-xl mt-20 sm:text-2xl md:text-3xl font-semibold mb-4">
          DEVOTEES JOURNEY <span className="text-orange">EXPERIENCE</span>
        </h2>
        <ReviewList />
      </div>

      <div>
        <BlogCard />
      </div>
    </div>
  );
}
