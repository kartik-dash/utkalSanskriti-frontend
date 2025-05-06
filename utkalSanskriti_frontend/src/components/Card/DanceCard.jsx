import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedDance } from '../../redux/slices/danceSlice';
import { danceData } from '../../assets/assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';


const DanceCard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
         
      const handleClick = (dance) => {

        dispatch(setSelectedDance(dance));
        navigate(`/dancedetails/${dance.id}`);

      };
  
  return (

    <div className="container mx-auto sm:p-6">
          <h2 className='text-2xl sm:text-3xl font-extrabold text-indigo-600 text-center mb-8 mt-10'>Traditional Dance of Odisha</h2>
          <p className='w-full sm:max-w-[750px] mt-4 mb-8 mx-auto text-justify'>Odisha is a land of vibrant festivals, deeply rooted in its rich cultural and spiritual heritage. Every festival here is a blend of devotion, tradition, and community bonding, reflecting the deep connection between the people and their age-old customs. From grand temple rituals to colorful folk celebrations, Odisha’s festivals bring the state to life with music, dance, and festivities.</p>
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
            {danceData.map((dance) =>
            <SwiperSlide key={dance.id}>
              <div 
                onClick={() => handleClick(dance)}
                className="cursor-pointer border rounde-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 mx-2"
                >
                  <img
                    src={dance.image}
                    alt={dance.title}
                    className='w-full h-48 object-cover'
                  />
                  <div className="p-4 text-center">
                    <h2 className='text-lg inline-block font-semibold'>{dance.title}</h2>
                  </div>
                </div>
            </SwiperSlide>
          )}
          </div>
         </Swiper>
        </div>
  )
}

export default DanceCard;
