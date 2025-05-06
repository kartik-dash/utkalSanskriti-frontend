import { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await axios.post("https://your-api-endpoint.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Success:", response.data);
      alert("Data uploaded successfully!");
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-[160px] p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Upload Content</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded-lg" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded-lg" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Upload Image</label>
          <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded-lg" accept="image/*" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Submit</button>
      </form>
    </div>
  );
};

export default UploadForm;
