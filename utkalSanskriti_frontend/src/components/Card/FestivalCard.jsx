import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedFestival } from '../../redux/slices/festivalSlice';
import { festivalData } from '../../assets/assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';


const FestivalCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const handleClick = (festival) => {
    
    dispatch(setSelectedFestival(festival));
    navigate(`/festivaldetails/${festival.id}`);

   };

   
  return (
    <div className="container mx-auto sm:p-6">
      <h2 className='text-2xl sm:text-3xl font-extrabold text-indigo-600 text-center mb-8 mt-10'>Our Festivals</h2>
      <p className='w-full sm:max-w-[750px] mt-4 mb-8 mx-auto text-justify'>Odisha comes alive with a riot of colors during its festivals. From the grand temple festivals to local fairs and dance performances, every celebration is a unique expression of cultural pride. Discover the stories behind these events and how they connect the past with the present, uniting communities in joyful reverence of their shared heritage.</p>
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
        {festivalData.map((festival) =>
        <SwiperSlide key={festival.id}>
          
          <div 
            onClick={() => handleClick(festival)}
            className="cursor-pointer border rounde-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 mx-2"
            >
              <img
                src={festival.image}
                alt={festival.title}
                className='w-full h-48 object-cover'
              />
              <div className="p-4 text-center">
                <h2 className='text-lg inline-block font-semibold'>{festival.title}</h2>
              </div>
            </div>
        </SwiperSlide>
      )}
      </div>
     </Swiper>
    </div>
  )
}

export default FestivalCard;