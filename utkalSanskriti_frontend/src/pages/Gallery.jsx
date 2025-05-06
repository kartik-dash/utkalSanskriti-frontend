import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";

// Import gallery images
import gallery1 from '../assets/gallery-img/Gallrey1.jpg';
import gallery3 from '../assets/gallery-img/Gallery3.jpg';
import gallery4 from '../assets/gallery-img/Gallery4.jpg';
import gallery5 from '../assets/gallery-img/Gallery5.jpg';
import gallery6 from '../assets/gallery-img/Gallery6.jpg';
import gallery7 from '../assets/gallery-img/Gallery7.jpg';
import gallery8 from '../assets/gallery-img/Gallery8.jpg';
import gallery9 from '../assets/gallery-img/Gallery9.webp';
import gallery10 from '../assets/gallery-img/Gallery10.jpg';
import gallery11 from '../assets/gallery-img/Gallery11.jpg';
import gallery12 from '../assets/gallery-img/Gallery12.jpg';
import gallery13 from '../assets/gallery-img/Gallery13.jpg';
import gallery14 from '../assets/gallery-img/Gallery14.jpg';
import gallery15 from '../assets/gallery-img/Gallery15.jpg';
import gallery16 from '../assets/gallery-img/Gallery16.jpg';
import gallery17 from '../assets/gallery-img/Gallery17.jpg';

const Gallery = () => {
  const images = [
    gallery1, gallery3, gallery4, gallery5, gallery6,
    gallery7, gallery8, gallery9, gallery10, gallery11, gallery12,
    gallery13, gallery14, gallery15, gallery16, gallery17,
  ];

  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container flex flex-wrap mx-auto px-4 py-12">

      {/* Title */}
      <h2 className="text-4xl font-bold text-center text-green-700 mt-20 mb-8 animate-fade-in">
        Odisha Heritage Gallery
      </h2>

      {/* LightGallery Grid - Leaf Style */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {images.map((image, index) => (
          <button
          key={index}
          onClick={() => setFullscreenImage(image)}
          className="group relative overflow-hidden rounded-[40%_0%_40%_0%] shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
          <img
            src={image}
            alt={`Gallery ${index + 1}`}
            className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110 rounded-[40%_0%_40%_0%]"
          />
          <div className="absolute inset-0 bg-green-900 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-[40%_60%_70%_30%]">
            <span className="text-white text-lg font-semibold animate-pulse">Explore</span>
          </div>
        </button>
        ))}

        {/* Fullscreen Overlay */}
      {fullscreenImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-red-400 transition-transform transform hover:scale-125"
            aria-label="Close Fullscreen"
          >
            ❌
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen View"
            className="max-w-full max-h-full rounded-lg shadow-2xl"
          />
        </div>
      )}
       
      </div>
      <div className="w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mt-20 mb-8 animate-fade-in">
          Explore Odisha
        </h2>

        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          spaceBetween={20}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 1,
              coverflowEffect: {
                rotate: 10,
                depth: 50,
              },
            },
            640: {
              slidesPerView: 2,
              coverflowEffect: {
                rotate: 20,
                depth: 80,
              },
            },
            1024: {
              slidesPerView: 3,
              coverflowEffect: {
                rotate: 30,
                depth: 100,
              },
            },
          }}
          className="w-full max-w-5xl mx-auto"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className="relative w-60 h-60 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105">
                <img
                  src={image}
                  alt={`Odisha ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                  Odisha {index + 1}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>


      {/* Scroll-To-Top Button */}
      {showButton && (
        <button
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 animate-bounce"
          onClick={scrollToTop}
        >
          ⬆️
        </button>
      )}
    </div>
  );
};

export default Gallery;
