import React, { useState } from "react";
import { API_URL } from "../redux/api/api";

const DestinationForm = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("districtName", districtName);
    formData.append("image", image);

    try {
      const response = await fetch(`${API_URL}/api/destinations/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload destination");
      }

      const data = await response.json();
      setStatus("success");
      console.log("Created destination:", data);

      setName("");
      setLocation("");
      setDescription("");
      setDistrictName("");
      setImage(null);
    } catch (error) {
      console.error("Error creating destination:", error);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Destination
        </h2>

        {status === "success" && (
          <p className="mb-4 text-green-600 text-sm text-center font-medium">
            Destination created successfully!
          </p>
        )}
        {status === "error" && (
          <p className="mb-4 text-red-600 text-sm text-center font-medium">
            Error creating destination. Please try again.
          </p>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">District Name</label>
            <input
              type="text"
              value={districtName}
              onChange={(e) => setDistrictName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full text-sm"
              accept="image/*"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Add Destination
          </button>
        </form>
      </div>
    </div>
  );
};

export default DestinationForm;
