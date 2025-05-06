import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReviewCard from "../../components/Card/ReviewCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RateReview from "../../pages/RateReview"; // Import the RateReview component

function ReviewList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="container">
    <div className="flex flex-col justify-center items-center">
  <div className="w-full">
    <button
      onClick={() => setIsModalOpen(true)}
      className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition"
    >
      Share Your Experience
    </button>

    {isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-[90vw] sm:w-96 relative">
          <RateReview closeModal={() => setIsModalOpen(false)} />
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-2 right-2 text-black text-xl"
          >
            X
          </button>
        </div>
      </div>
    )}

    {reviews.length > 0 ? (
      <Slider {...settings} className="mt-6">
        {reviews.map((review) => (
          <div key={review.id} className="px-2">
            <ReviewCard review={review} />
          </div>
        ))}
      </Slider>
    ) : (
      <p className="text-center mt-4 text-gray-500">No reviews available.</p>
    )}
  </div>
</div>
</div>

  );
}

export default ReviewList;





