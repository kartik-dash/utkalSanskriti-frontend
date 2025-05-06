import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos } from "../redux/thunks/UploadVideoThunks";
import {API_URL} from "../redux/api/api";


const VideoList = () => {
  const dispatch = useDispatch();
  const { videos, loading, error } = useSelector((state) => state.video);
  const [selectedVideo, setSelectedVideo] = useState(null); // Track selected video for full-screen mode

  useEffect(() => {
    dispatch(getAllVideos()); // Fetch videos on mount
  }, [dispatch]);

  return (
    <div className="my-24 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Uploaded Videos</h2>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error.message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedVideo(video)}
          >
            {/* Play video inside the card */}
            <video
              className="w-full h-40 object-cover rounded-md"
              src={`${API_URL}${video.videoUrl}`} // ✅ Fixed URL
              controls
            />
            <h3 className="text-lg font-semibold mt-2 text-center">{video.title}</h3>
          </div>
        ))}
      </div>

      {/* Fullscreen Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl w-full">
            <h2 className="text-xl font-bold mb-2">{selectedVideo.title}</h2>
            <video
              src={`${API_URL}${selectedVideo.videoUrl}`} // ✅ Fixed URL
              controls
              autoPlay
              className="w-full h-[70vh] rounded-lg"
            />
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600 transition"
              onClick={() => setSelectedVideo(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoList;
