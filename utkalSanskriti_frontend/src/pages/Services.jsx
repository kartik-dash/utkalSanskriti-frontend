import React from 'react';
import { FaHandshake, FaRegAddressCard, FaRegCalendarCheck } from 'react-icons/fa';
import { MdTempleBuddhist, MdSupportAgent } from 'react-icons/md';
import { GiIndianPalace } from 'react-icons/gi';

const services = [
  {
    title: 'Temple Booking',
    icon: <MdTempleBuddhist className="text-4xl text-blue-600" />,
    description: 'Book your temple visits in advance for a smooth spiritual experience.',
  },
  {
    title: 'Guide Assistance',
    icon: <FaRegAddressCard className="text-4xl text-green-600" />,
    description: 'Certified guides to help you explore the historical and cultural depth.',
  },
  {
    title: 'Cultural Events',
    icon: <FaRegCalendarCheck className="text-4xl text-purple-600" />,
    description: 'Stay updated with upcoming spiritual and cultural events across temples.',
  },
  {
    title: 'Heritage Sites',
    icon: <GiIndianPalace className="text-4xl text-red-500" />,
    description: 'Explore government-recognized heritage temples and pilgrimage sites.',
  },
  {
    title: 'Public Support',
    icon: <MdSupportAgent className="text-4xl text-yellow-600" />,
    description: '24/7 assistance and helpline for any service-related queries.',
  },
  {
    title: 'Collaboration Opportunities',
    icon: <FaHandshake className="text-4xl text-pink-500" />,
    description: 'Partner with the cultural board for service and development efforts.',
  },
];

const Services = () => {
  return (
    <div className="px-4 py-10 bg-gray-100 mt-20 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-center font-semibold mb-4">Our <span className='text-orange'>Services</span></h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h2 className="text-xl font-semibold text-center text-gray-700">{service.title}</h2>
              <p className="text-gray-500 text-sm mt-2 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
