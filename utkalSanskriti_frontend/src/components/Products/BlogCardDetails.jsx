import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const BlogDetails = () => {
  const navigate = useNavigate();
  const SelectedBlog = useSelector((state) => state.blog.selectedBlog);

  useEffect(() => {
    if (!SelectedBlog) {
      navigate("/");
    }
  }, [SelectedBlog, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 py-12 px-6">
      {SelectedBlog ? (
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden">
      <button onClick={() => navigate(-1)} className="mt-20 mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">← Back</button>
      <div className="max-w-4xl mx-auto bg-white/20 shadow-2xl rounded-2xl overflow-hidden">
          {/* Blog Image */}
          <div className="relative">
            <img
              src={SelectedBlog.image}
              alt={SelectedBlog.title}
              className="w-full h-96 object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          {/* Blog Content */}
          <div className="p-8 bg-white">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center">{SelectedBlog.title}</h2>
            <p className="text-lg text-gray-700 mt-4 leading-relaxed">{SelectedBlog.description}</p>

            {/* Show More Button */}
            <div className="mt-6 text-center">
              
            <Link to="/login">
              <button
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105"
                onClick={() => alert("More details coming soon!")}
              >
                Show More
              </button>
              </Link>
            </div>
          </div>
        </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">Loading...</p>
      )}
    </div>
  );
};

export default BlogDetails;
