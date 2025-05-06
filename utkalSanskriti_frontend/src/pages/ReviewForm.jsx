
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../redux/slices/reviewSlice";
import {API_URL} from "../redux/api/api";

function ReviewForm() {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [experience, setExperience] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert to Base64
      reader.onloadend = () => {
        setImage(reader.result); // Store Base64 string
        setImagePreview(reader.result); // Set preview
      };
    } else {
      alert("Please select a valid image file.");
      alert("Please select a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate fields before submission
    if (!name || !destination || !experience || !image) {
      alert("Please fill in all fields and upload an image.");
      return;
    }
  
    // Prepare the data to send
    const reviewData = {
      name,
      destination,
      experience,
      image, // Base64 encoded image
    };
  
    try {
      // Send POST request to backend API
      const response = await axios.post(`${API_URL}/api/reviews`, reviewData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("✅ Review submitted successfully:", response.data);
  
      // Dispatch action to update Redux state (optional)
      dispatch(addReview(response.data));
  
      // Reset form fields
      setName("");
      setDestination("");
      setExperience("");
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("❌ Error submitting review:", error.response?.data || error.message);
      alert("Failed to submit review. Please try again.");
    }
  };




  return (
    <div className="flex justify-center items-center py-20 bg-purple-600">
      <div className="p-10 bg-white shadow-2xl rounded-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Share Your Travel Experience
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="mb-6">
            <label className="block text-left text-gray-700 text-xl font-semibold">
              Name
            </label>
            <input
              type="text"
              value={name}
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Destination Input */}
          <div className="mb-6">
            <label className="block text-left text-gray-700 text-xl font-semibold">
              Destination
            </label>
            <input
              type="text"
              value={destination}
              placeholder="Enter Your Destination"
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Experience Input */}
          <div className="mb-6">
            <label className="block text-left text-gray-700 text-xl font-semibold">
              Experience
            </label>
            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Describe Your Travel Experience"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-left text-gray-700 text-xl font-semibold">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border-2 border-gray-300 rounded-lg"
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-6">
              <p className="text-gray-700 text-xl font-semibold">Preview:</p>
              <img
                src={imagePreview}
                alt="Selected"
                className="w-full h-40 object-cover mt-2 rounded-lg"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transform transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;
