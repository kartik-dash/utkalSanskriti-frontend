import React from 'react';
import { Link } from 'react-router-dom'; 

const CelebrationAtTemple = () => {
  const activities = [
    {
      id: 1,
      title: 'Rathayatra',
      image: "/puri-img/museum.jpg",
      description: 'The grand annual procession of Lord Jagannath, Balabhadra, and Subhadra in Puri.',
      relatedImages: [], // Placeholder for related images (optional)
    },
    {
      id: 2,
      title: 'Snana Yatra',
      image: "/konark-img/konark_img3.jpg",
      description: 'The sacred bathing ritual of Lord Jagannath before Rath Yatra.',
      relatedImages: [],
    },
    {
      id: 3,
      title: 'Magha Saptami',
      image: "/konark-img/konark_img2.jpg'",
      description: 'Celebrated at Konark Sun Temple, dedicated to Lord Surya.',
      relatedImages: [],
    },
    {
      id: 4,
      title: 'Chandan Yatra',
      image: "/puri-img/body3.jpg",
      description: ' A 42-day-long festival where deities are given a sandalwood paste bath.',
      relatedImages: [],
    },
    {
      id: 5,
      title: 'Mahashivaratri',
      image: "/puri-img/body3.jpg",
      description: ' A major festival at Lingaraj Temple, Bhubaneswar.',
      relatedImages: [],
    },
    {
      id: 6,
      title: 'Kartik Purnima & Boita Bandana',
      image: "/konark-img/konark.jpg",
      description: ' The historic maritime festival celebrated in temples near rivers and lakes.',
      relatedImages: [],
    },
  ];

  return (
    <div className="container mx-auto py-28 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">Celebrations At Odisha Temples</h1>
      <p className="text-lg text-center mb-10">
        Spiritual vibrance in every step—Odisha temples host divine programmes that celebrate culture, faith, and devotion.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity) => (
          <Link
            key={activity.id}
            to={`/celebration-at-temple/${activity.id}`}
            className="activity-card bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <img className="w-full h-60 object-cover rounded-t-lg" src={activity.image} alt={activity.title} />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{activity.title}</h3>
              <p className="text-sm text-gray-700 mt-2">
                {activity.description.length > 80 ? `${activity.description.substring(0, 80)}...` : activity.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CelebrationAtTemple;
