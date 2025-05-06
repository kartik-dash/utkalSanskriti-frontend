import React from 'react';
import { Link } from 'react-router-dom';

// Updated activities with related images included for all activities
const activities = [
  {
    id: 1,
    title: 'Rathayatra',
    image: "/puri-img/body.jpg",
    description: 'Rath Yatra is an annual procession where Lord Jagannath and his siblings are paraded in grand chariots through the streets, attracting thousands of devotees in a vibrant celebration of faith and devotion.',
    relatedImages: [
      "/puri-img/body.jpg", "/puri-img/body2.jpg", "/puri-img/body4.jpg",  // Added related images for Rathayatra
    ],
  },
  {
    id: 2,
    title: 'Odissi Dance',
    image: "/puri-img/body2.jpg",
    description: 'Grace in motion, tradition in heart—Odissi dance tells timeless stories through every elegant gesture and rhythmic beat.',
    relatedImages: [  // Added related images for Odissi Dance
      "/puri-img/body2.jpg", "/puri-img/body.jpg", "/puri-img/body4.jpg",
    ],
  },
  {
    id: 3,
    title: 'Mahodadhi Arti',
    image: "/puri-img/body4.jpg",
    description: 'Devotion in every wave, the Mahodadhi Arti at Puri fills the air with divine energy, as the sea and soul unite in sacred harmony.',
    relatedImages: [  // Added related images for Mahodadhi Arti
      "/puri-img/body4.jpg", "/puri-img/body.jpg", "/puri-img/body2.jpg",
    ],
  },
];

const ProgramesAtOdishaTemple = () => {
  return (
    <div className="container mx-auto py-28 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">Programmes in Odisha Temple</h1>
      <p className="text-lg text-center mb-10">
        Spiritual vibrance in every step—Odisha temples host divine programmes that celebrate culture, faith, and devotion.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity) => (
          <Link
            key={activity.id}
            to={`/wildlife/${activity.id}`}
            className="activity-card bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <img className="w-full h-60 object-cover rounded-t-lg" src={activity.image} alt={activity.title} />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{activity.title}</h3>
              <p className="text-sm text-gray-700 mt-2">{activity.description.substring(0, 80)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProgramesAtOdishaTemple;
