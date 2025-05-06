import React, { useState, useEffect, useRef } from "react";
import { Menu, X, User, Bell, LogOut, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Slider from "../components/Slider/Slider";
import Cards from "../components/Card/Cards";
import { cardData, sliderImages } from "../assets/assets";
import CategoryList from "../components/Category/CategoryList";
import ShaktiPithaCard from "../components/Card/ShaktiPithaCard";
import AdiShaktiPithaCard from "../components/Card/AdiShaktiPithaCard";
import ChariKhhetraCard from "../components/Card/ChariKhhetraCard";
import UpcomingEventCard from "../components/Card/UpcomingEventCard";
import BlogCard from "../components/Card/BlogCard";
import ReviewList from "../components/Products/ReviewList";
import Direction from "./Direction";
import SaivaKhetraCard from "../components/Card/SaivaKhetraCard";
import ExploreUtkal from "../components/Explore/ExploreUtkal";

// Dummy values for demo purposes
const isLandingPage = true;

const HomePage = () => {
  // Header states
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Mobile menu open
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  // Sidebar state (assumed always open on desktop)
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Dummy logout function
  const handleLogout = () => {
    console.log("Logout clicked");
    // Implement logout logic here
  };

  return (
    <>
      {/* Header / Navigation */}
      {/* <div className="container"> */}
       <nav
        className={`fixed top-0 z-50 ${
          isLandingPage ? "bg-black" : "bg-black"
        } flex`}
       >
     
      </nav>
      {/* </div> */}
      {/* Main Content */}
      <div className="space-y-0 select-none">
        {/* Hero Section with Slider */}
        <div className="relative">
          <Slider images={sliderImages} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <h1 className="text-3xl sm:text-6xl md:text-8xl font-extrabold leading-tight">
              Explore Odisha
            </h1>
            <p className="text-xl sm:text-3xl mt-4">
              "Discover Odisha's Rich Cultural Legacy- All In One Place."
            </p>
          </div>
        </div>

        {/* Why Choose Jay Jagannath Section */}
        <div className="relative py-10 text-center">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
            style={{
              backgroundImage:
                "url('/background-image/Untitled design.jpg')",
            }}
          ></div>
          <div className="experience">
          <div className="relative z-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-black">
              "Experience a journey guided by faith, love, and devotion."
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {cardData.map((card, index) => (
                <Cards
                  key={index}
                  image={card.image}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>
          </div>
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="relative py-10 text-center">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/background-image/event-bg.jpg')",
            }}
          ></div>
          <div className="relative z-10 text-black">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
              Join Us and Get Ready for the Most Anticipated Upcoming Events.
            </h2>
            <UpcomingEventCard />
          </div>
        </div>

        {/* Explore Categories Section */}
        <div className="bg-white py-8 sm:py-20 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
            Connecting Odisha to the World
          </h2>
          <CategoryList />
        </div>

        {/* Chari Khetras Section */}
        <div className="bg-white py-2 sm:py-10 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
            CHARI_KHETRAS <span className="text-orange">OF ODISHA</span>
          </h2>
          <ChariKhhetraCard />
        </div>

        {/* Explore Every Corner Section */}
        <div className="bg-white py-2 sm:py-10 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
            EXPLORE EVERY CORNER <span className="text-orange">OF FAITH</span>
          </h2>
          <Direction />
        </div>

        {/* Adishakti Pithas Section */}
        <div className="bg-white py-2 sm:py-10 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
            ADISHAKTI_PITHAS <span className="text-orange">OF ODISHA</span>
          </h2>
          <AdiShaktiPithaCard />
        </div>

        {/* Saiva Pithas Section */}
        <div className="bg-white py-2 sm:py-10 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
            SHAIVA_PITHAS <span className="text-orange">OF ODISHA</span>
          </h2>
          <SaivaKhetraCard />
        </div>

        {/* Shakti Pithas Section */}
        <div className="bg-white py-2 sm:py-10 shadow-lg text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
            SHAKTI_PITHAS <span className="text-orange">OF ODISHA</span>
          </h2>
          <ShaktiPithaCard />
        </div>

        {/* Devotees Journey Section */}
        <div className="bg-white text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
            DEVOTEES JOURNEY <span className="text-orange">EXPERIENCE</span>
          </h2>
          <ReviewList />
        </div>

        {/* Blog Section */}
        <div>
          <BlogCard />
        </div>
      </div>
    </>
  );
};

export default HomePage;
