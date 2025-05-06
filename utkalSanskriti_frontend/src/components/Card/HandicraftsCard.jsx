import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedHandicrafts } from '../../redux/slices/handicraftsSlice'
import { handicraftsData } from '../../assets/assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';


const HandicraftsCard = () => {
     
  const dispatch = useDispatch();
  const navigate = useNavigate();

       const handleClick = (handicrafts) => {

        dispatch(setSelectedHandicrafts(handicrafts));
        navigate(`/handicraftsdetails/${handicrafts.id}`);

       }
        
  return (
      
    <div className="container mx-auto sm:p-6">
    <h2 className='text-2xl sm:text-3xl font-extrabold text-indigo-600 text-center mb-8 mt-10'>Traditional Arts & Handicrafts</h2>
    <p className='w-full sm:max-w-[750px] mt-4 mb-8 mx-auto text-justify'>Beyond its temples and rituals, Odisha is renowned for its traditional arts and crafts. Whether it’s the intricate silver filigree work, the timeless Pattachitra paintings, or the soulful sounds of classical Odissi music, the state’s creative spirit is evident in every corner. Learn about the local artisans, community initiatives, and educational programs that keep these traditions alive for future generations.</p>
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
      {handicraftsData.map((handicrafts) =>
      <SwiperSlide key={handicrafts.id}>
        <div 
          onClick={() => handleClick(handicrafts)}
          className="cursor-pointer border rounde-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 mx-2"
          >
            <img
              src={handicrafts.image}
              alt={handicrafts.title}
              className='w-full h-48 object-cover'
            />
            <div className="p-4 text-center">
              <h2 className='text-lg inline-block font-semibold'>{handicrafts.title}</h2>
            </div>
          </div>
      </SwiperSlide>
    )}
    </div>
   </Swiper>
  </div>






  )
}

export default HandicraftsCard