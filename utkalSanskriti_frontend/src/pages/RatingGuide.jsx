import React, { useState } from "react";

const RatingGuide = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert("Please select a rating before submitting!");
      return;
    }

    console.log("Rating Submitted:", { rating, message });

    setSuccess(true); // Show success message
    setTimeout(() => setSuccess(false), 3000); // Hide message after 3 sec

    setRating(0);
    setMessage("");
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md mt-20 shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Rate Your Guide</h2>

      {/* Star Rating */}
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-3xl cursor-pointer ${
              (hover || rating) >= star ? "text-yellow-500" : "text-gray-400"
            }`}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>

      {/* Message Box */}
      <textarea
        className="w-full p-2 border rounded-md mb-4"
        placeholder="Write your feedback..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Send Rating
      </button>

      {/* Success Message */}
      {success && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 text-center rounded-md">
          Rating sent successfully! 🎉
        </div>
      )}
    </div>
  );
};

export default RatingGuide;
