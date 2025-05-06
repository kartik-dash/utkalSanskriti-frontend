import React from 'react';
import { Link } from 'react-router-dom';

const GeetaProgram = () => {
  
  const activities = [
    {
      id: 1,
      title: "Geeta Program At Odisha",
      image: "/puri-img/body4.jpg",
      description: 'The Geeta Program is an initiative dedicated to exploring the timeless wisdom of the Bhagavad Gita.',
    },
    {
      id: 2,
      title: "Geeta Program At Odisha",
      image: "/puri-img/body4.jpg",
      description: 'The Geeta Program is an initiative dedicated to exploring the timeless wisdom of the Bhagavad Gita.',
    },
    {
      id: 3,
      title: "Geeta Program At Odisha",
      image: "/puri-img/body2.jpg",
      description: 'The Geeta Program is an initiative dedicated to exploring the timeless wisdom of the Bhagavad Gita.',
    },
  ];

  return (
    <div className="container mx-auto py-28 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">International Geeta Mahostav in Odisha</h1>
      <p className="text-lg text-center mb-10 w-[590px] mx-auto">
        The Geeta Program is an initiative dedicated to exploring the timeless wisdom of the Bhagavad Gita. It offers insights into its teachings, chapters, and philosophy, helping individuals apply its principles in daily life.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity) => (
          <Link
            key={activity.id}
            to={`/geeta-detail/${activity.id}`}
            className="activity-card bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <img className="w-full h-60 object-cover rounded-t-lg" src={activity.image} alt={activity.title} />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{activity.title}</h3>
              <p className="text-sm text-gray-700 mt-2">{activity.description.substring(0, 120)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GeetaProgram;
