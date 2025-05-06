import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { getData, postData } from "../api/api"; // Import postData function

export const uploadVideo = createAsyncThunk(
  "video/uploadVideo",
  async ({ title, videoFile }, { rejectWithValue }) => {
    try {
      console.log("Uploading video with title:", title);

      const formData = new FormData();
      formData.append("title", title); // Send title as a form field
      formData.append("video", videoFile); // Attach the video file

      // Send request using postData
      const data = await postData("/api/videos/upload", formData, {
        "Content-Type": "multipart/form-data", // Important for file upload
      });

      console.log("Upload response:", data);
      return data;
    } catch (error) {
      console.error("Error uploading video:", error);
      return rejectWithValue(error);
    }
  }
);

export const getAllVideos = createAsyncThunk(
  "video/getAllVideos",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching all videos...");
      const data = await getData("/api/videos/all");
      console.log("API response:", data); // ✅ Check API response
      return data;
    } catch (error) {
      console.error("Error fetching videos:", error);
      return rejectWithValue(error.message || "Failed to fetch videos");
    }
  }
);

