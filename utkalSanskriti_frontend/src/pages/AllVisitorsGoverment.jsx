import React from 'react';

const AllVisitorsGoverment = () => {
  // Sample static data
  const visitors = [
    { name: "John Doe", temple: "Golden Temple", district: "Amritsar", state: "Punjab", country: "India" },
    { name: "Emma Smith", temple: "Kedarnath", district: "Rudraprayag", state: "Uttarakhand", country: "India" },
    { name: "Carlos Reyes", temple: "Sagrada Familia", district: "Barcelona", state: "Catalonia", country: "Spain" },
    { name: "Aisha Khan", temple: "Mecca", district: "Makkah", state: "Makkah", country: "Saudi Arabia" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">All Visitors</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Temple</th>
              <th className="py-3 px-6 text-left">District</th>
              <th className="py-3 px-6 text-left">State</th>
              <th className="py-3 px-6 text-left">Country</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {visitors.map((visitor, index) => (
              <tr key={index} className="hover:bg-gray-100 transition">
                <td className="py-3 px-6">{visitor.name}</td>
                <td className="py-3 px-6">{visitor.temple}</td>
                <td className="py-3 px-6">{visitor.district}</td>
                <td className="py-3 px-6">{visitor.state}</td>
                <td className="py-3 px-6">{visitor.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllVisitorsGoverment;
