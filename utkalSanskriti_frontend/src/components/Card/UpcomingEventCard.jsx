// import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchEvents } from '../../../src/redux/thunks/eventThunks';
// import { setSelectedEvent } from '../../../src/redux/slices/eventSlice';
// import HTMLFlipBook from 'react-pageflip';
// import logo from '../../assets/logo/only-logo.png';


// const UpcomingEventCard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const flipBookRef = useRef(null);
//   const [currentPage, setCurrentPage] = useState(0);
//   const { events, loading, error } = useSelector((state) => state.event);

//   useEffect(() => {
//     dispatch(fetchEvents());
//   }, [dispatch]);

//   useEffect(() => {
//     if (events.length <= 1) return;

//     const interval = setInterval(() => {
//       if (flipBookRef.current) {
//         const totalPages = events.length + 2;
//         setCurrentPage((prev) => {
//           const nextPage = (prev + 1) % totalPages;
//           flipBookRef.current.pageFlip().flip(nextPage);
//           return nextPage;
//         });
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [events.length]);

//   const handleEventClick = (event) => {
//     dispatch(setSelectedEvent(event));
//     navigate(`/event/${event.eventId}`);
//   };

//   return (
//     <div className="flex justify-center items-center">
//       {loading && <p className="text-blue-500 text-center">Loading events...</p>}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {!loading && !error && (
        
//         <HTMLFlipBook
//           width={600}
//           height={600}
//           className="flipbook-container shadow-2xl rounded-lg"
//           showCover={true}
//           ref={flipBookRef}
//         >
      
//           {/* Cover Page */}
//           <div className="relative flex justify-center items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-3xl font-bold p-8 rounded-lg shadow-lg">
//             <div className="flex flex-col justify-center items-center">
//               <img src={logo} alt="Logo" className="w-42 h-42 object-contain mb-4" />
//               <span className="relative z-10">Upcoming Events Album</span>
//             </div>
//           </div>

//           {/* Event Pages */}
//           {events.map((event) => (
//             <div
//               key={event.eventId}
//               className="bg-white p-6 flex flex-col border-2 border-gray bg-gradient-to-r from-yellow-500 to-orange-500 items-center shadow-md rounded-lg cursor-pointer"
//               // onClick={() => handleEventClick(event)}
//             >
//               {event.eventImageData ? (
//                 <img
//                   src={`data:image/png;base64,${event.eventImageData}`}
//                   alt={event.eventName}
//                   className="w-full h-64 object-cover border-4 shadow-2xl rounded-md mb-4"
//                 />
//               ) : (
//                 <p className="text-gray-500">No Image Available</p>
//               )}
//               <h2 className="text-2xl font-bold text-gray-800 text-center">{event.eventName}</h2>
//               <p className="text-lg text-gray-600 font-medium">{event.location}</p>
//               <p className="text-lg text-gray-600 font-medium">
//                 <strong>Start:</strong> {new Date(event.startDate).toLocaleString()}
//               </p>
//               <p className="text-lg text-gray-600 font-medium">
//                 <strong>End:</strong> {new Date(event.endDate).toLocaleString()}
//               </p>
//               <p className="text-lg text-gray-600 overflow-hidden max-h-[7rem] font-medium">{event.description}</p>
//               <button 
//               className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
//               onClick={() => handleEventClick(event)}// Navigate to event details page
//             >Show More</button>
//             </div>
//           ))}

//           {/* Back Cover Page */}
//           <div className="kartik relative flex justify-center items-center bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-3xl font-bold p-8 rounded-lg shadow-lg">
//             <span className="relative z-10">THE END AND HAPPY JOURNEY</span>
//           </div>
//         </HTMLFlipBook>
//       )}
//     </div>
//   );
// };

// export default UpcomingEventCard;




import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEvents } from '../../../src/redux/thunks/eventThunks';
import { setSelectedEvent } from '../../../src/redux/slices/eventSlice';
import HTMLFlipBook from 'react-pageflip';
import logo from '../../assets/logo/only-logo.png';

const UpcomingEventCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const flipBookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const { events, loading, error } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    if (events.length <= 1) return;

    const interval = setInterval(() => {
      if (flipBookRef.current) {
        const totalPages = events.length + 2;
        setCurrentPage((prev) => {
          const nextPage = (prev + 1) % totalPages;
          flipBookRef.current.pageFlip().flip(nextPage);
          return nextPage;
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [events.length]);

  const handleEventClick = (event) => {
    dispatch(setSelectedEvent(event));
    navigate(`/event/${event.eventId}`);
  };

  return (
    <div className="flex justify-center px-2 sm:px-4 md:px-8 items-center">
      {loading && <p className="text-blue-500 text-center">Loading events...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && (
        <HTMLFlipBook
          width={600}
          height={600}
          size="stretch"
          minWidth={300}
          maxWidth={600}
          maxHeight={600}
          mobileScrollSupport={true}
          className="shadow-2xl rounded-lg"
          showCover={true}
          ref={flipBookRef}
        >
          {/* {/ Cover Page /} */}
          <div className="relative flex justify-center items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm sm:text-xl md:text-3xl font-bold p-8 rounded-lg shadow-lg">
            <div className="flex flex-col justify-center items-center">
              <img src={logo} alt="Logo" className="w-24 h-24 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain mb-4" />
              <span className="relative z-10 text-xl md:text-3xl">Upcoming Events Album</span>
            </div>
          </div>

          {/* {/ Event Pages /} */}
          {events.map((event) => (
            <div
              key={event.eventId}
              className=" bg-white relative w-full h-full p-6 flex flex-col border-2 border-gray bg-gradient-to-r from-yellow-500 to-orange-500 items-center shadow-md rounded-lg cursor-pointer"
              // onClick={() => handleEventClick(event)}
            >
              {event.eventImageData ? (
                <img
                  src={`data:image/png;base64,${event.eventImageData}`}
                  alt={event.eventName}
                  className="w-full h-28 sm:h-36  md:h-42 lg:h-[300px] object-cover border-4 shadow-2xl rounded-md mb-4"
                />
              ) : (
                <p className="text-gray-500">No Image Available</p>
              )}
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-center">{event.eventName}</h2>
              <p className="text-md xs:text-lg md:text-xl text-gray-600 font-medium">{event.location}</p>
              <p className="text-md xs:text-lg md:text-xl text-gray-600 font-medium">
                <strong>Start:</strong> {new Date(event.startDate).toLocaleString()}
              </p>
              <p className="text-md sm:text-lg md:text-xl text-gray-600 font-medium">
                <strong>End:</strong> {new Date(event.endDate).toLocaleString()}
              </p>
              {/* <p className="text-lg text-gray-600 overflow-hidden max-h-[7rem] font-medium">{event.description}</p> */}
              <button 
                className="mt-2 sm:mt-4 py-1 sm:py-2 px-4 sm:px-6 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                onClick={() => handleEventClick(event)}
              >
                Show More
              </button>
            </div>  
          ))} 

          {/* {/ Back Cover Page /} */}
          <div className="relative flex justify-center items-center bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-3xl font-bold p-8 rounded-lg shadow-lg">
            <span className="relative z-10 text-xl md:text-3xl">THE END AND HAPPY JOURNEY</span>
          </div>
        </HTMLFlipBook>
      )}
    </div>
  );
};

export default UpcomingEventCard;