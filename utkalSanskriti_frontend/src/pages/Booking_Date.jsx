import React, { useState } from "react";

const Booking_Date = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  // Handle date selection
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Handle checkbox selection
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedItems((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate) {
      setShowOptions(true);
    } else {
      alert("Please select a booking date first!");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Book Your Date</h2>

      {/* Booking Date Selection */}
      <label className="block font-medium mb-2">Select Booking Date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Submit Date Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Confirm Date
      </button>

      {/* Show Booking Options After Date Selection */}
      {showOptions && (
        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-semibold">Select Booking Items:</h3>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="pooja"
              checked={selectedItems.includes("pooja")}
              onChange={handleCheckboxChange}
              className="w-4 h-4"
            />
            <span>Pooja</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="rudrabhisek"
              checked={selectedItems.includes("rudrabhisek")}
              onChange={handleCheckboxChange}
              className="w-4 h-4"
            />
            <span>Rudrabhishek</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="prasad"
              checked={selectedItems.includes("prasad")}
              onChange={handleCheckboxChange}
              className="w-4 h-4"
            />
            <span>Prasad</span>
          </label>

          {/* Submit Booking Button */}
          <button className="bg-green-500 text-white p-2 rounded w-full mt-4">
            Submit Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default Booking_Date;

