// src/pages/VideoUploadPage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadVideo } from '../redux/thunks/UploadVideoThunks';

const VideoUploadPage = () => {
  const [title, setTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const dispatch = useDispatch();
  const { video, loading, error } = useSelector((state) => state.video || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !videoFile) {
      alert('Please provide a title and select a video file');
      return;
    }
    dispatch(uploadVideo({ title, videoFile }));
  };

  return (
    <div className='py-80'>
      <h2>Upload Video</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />
        <button type="submit" className='bg-blue-400 border-2 border-blue-100 p-2 rounded-lg' disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>

      {/* Handling errors properly */}
      {error && <p style={{ color: 'red' }}>{typeof error === 'object' ? error.message : error}</p>}
      
      {/* Displaying uploaded video info */}
      {video?.title ? (
        <p>Video uploaded successfully: {video.title}</p>
      ) : (
        video && <p>Video uploaded successfully: {JSON.stringify(video)}</p>
      )}
    </div>
  );
};

export default VideoUploadPage;
