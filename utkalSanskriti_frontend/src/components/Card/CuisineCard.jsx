// src/components/CuisineCard.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedCuisine } from '../../redux/slices/cuisineSlice';
import { cuisineData } from '../../assets/assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

const CuisineCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (cuisine) => {
    // Dispatch the selected cuisine to Redux
    dispatch(setSelectedCuisine(cuisine));
    // Navigate to the details page (ensure your router uses this path)
    navigate(`/cuisinedetails/${cuisine.id}`);
  };

  return (
    <div className="container mx-auto sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-600 text-center mb-8 mt-10">Odia Cuisine</h2>
        <p className='w-full sm:max-w-[750px] mt-4 mb-8 mx-auto text-justify'>Odia cuisine is a delightful blend of simple yet flavorful dishes, deeply influenced by the state’s rich agricultural heritage, coastal abundance, and temple traditions. Known for its balanced flavors, minimal oil usage, and natural ingredients, Odia food reflects the essence of purity and tradition.</p>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >

      <div className="flex overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">
      {cuisineData.map((cuisine) =>
        <SwiperSlide key={cuisine.id}>
        <div 
          
          onClick={() => handleClick(cuisine)}  
          className="cursor-pointer border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 mx-2"
        >
          <img 
            src={cuisine.image} 
            alt={cuisine.title} 
            className="w-full h-48 object-cover" 
          />
          <div className="p-4 text-center">
            <h2 className="text-lg inline-block font-semibold">{cuisine.title}</h2>
          </div>
        </div>
        </SwiperSlide>
        )}
     </div>
     </Swiper>
   </div>
   
  );
};

export default CuisineCard;

