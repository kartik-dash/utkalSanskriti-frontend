import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedBlog } from '../../redux/slices/blogSlice';
import { blogData } from '../../assets/assets';

const BlogCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (blog) => {
    dispatch(setSelectedBlog(blog));
    navigate(`/blogdetails/${blog.id}`);
  };

  return (
    <div className="container mx-auto px-6 py-12 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black mb-4">OUR <span className="text-orange">BLOG</span></h2>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Dive into the heart of Odisha's traditions, temples, festivals, and art through captivating stories and insights.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogData.map((blog, index) => (
          <div 
            key={blog.id} 
            onClick={() => handleClick(blog)} 
            className="relative bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* Blog Image */}
            <div className="relative">
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-56 object-cover rounded-t-2xl transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            </div>

            {/* Blog Content */}
            <div className="p-6 text-center">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">{blog.title}</h3>
              <p className="text-sm sm:text-md text-gray-600 mt-2 line-clamp-3">{blog.description}</p>
             
              {/* Read More Button */}
              <button className="mt-5 px-2 py-2 sm:px-6 text-sm sm:text-md text-white sm:text-md bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-300">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCard;
