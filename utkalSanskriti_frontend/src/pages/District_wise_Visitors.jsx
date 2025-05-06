import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";

const DistrictWiseVisitors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visitorData, setVisitorData] = useState([]);
  const [expandedDistricts, setExpandedDistricts] = useState({});

  const fetchVisitorData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/bookings/district-temple-bookings");
      setVisitorData(response.data);
    } catch (error) {
      console.error("Error fetching visitor data:", error);
    }
  };

  useEffect(() => {
    fetchVisitorData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const groupedData = visitorData.reduce((acc, item) => {
    const district = item.districtName;
    if (!acc[district]) {
      acc[district] = [];
    }
    acc[district].push(item);
    return acc;
  }, {});

  const filteredDistricts = Object.keys(groupedData).filter((district) =>
    district.toLowerCase().includes(searchQuery)
  );

  const toggleViewMore = (district) => {
    setExpandedDistricts((prev) => ({
      ...prev,
      [district]: !prev[district],
    }));
  };

  // ✅ NEW: Calculate total visitors
  const totalVisitors = visitorData.reduce((sum, item) => sum + item.bookingCount, 0);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center text-gray-800">
        District Wise Visitors
      </h2>

      {/* ✅ Total Visitors Summary */}
      <p className="text-lg text-center text-gray-600 mb-6">
        Total Visitors: <span className="font-semibold text-blue-700">{totalVisitors}</span>
      </p>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search district..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 p-2 w-72 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDistricts.length > 0 ? (
          filteredDistricts.map((district) => (
            <div
              key={district}
              className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base sm:text-xl font-semibold text-gray-800">{district}</h3>
                <button
                  onClick={() => toggleViewMore(district)}
                  className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {expandedDistricts[district] ? "Hide" : "View More"}
                  {expandedDistricts[district] ? (
                    <ChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </button>
              </div>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  expandedDistricts[district] ? "max-h-screen" : "max-h-0 overflow-hidden"
                }`}
              >
                <ul className="space-y-2 mt-2">
                  {groupedData[district].map((temple, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-50 p-2 rounded-lg"
                    >
                      <span className="capitalize text-gray-700">{temple.templeName}</span>
                      <span className="text-gray-600 text-sm">{temple.bookingCount} Visitors</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No data found.</p>
        )}
      </div>
    </div>
  );
};

export default DistrictWiseVisitors;
