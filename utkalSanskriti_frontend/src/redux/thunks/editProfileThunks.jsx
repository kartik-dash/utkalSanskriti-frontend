import { createAsyncThunk } from "@reduxjs/toolkit";
import { putData, postData, getData } from "../api/api";
import axios from "axios";

// Update profile details
export const updateEditProfile = createAsyncThunk(
  "editProfile/updateEditProfile",
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      if (!userId) throw new Error("User ID is required");

      const response = await putData(`/api/users/profile/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Request OTP for mobile number change
export const requestMobileChange = createAsyncThunk(
  "editProfile/requestMobileChange",
  async ({ email, newMobileNumber }, { rejectWithValue }) => {
    try {
      if (!email || !newMobileNumber) throw new Error("Email and new mobile number are required");

      const response = await postData("/api/mobile_change/request", { email, newMobileNumber });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Verify OTP and change mobile number
export const verifyMobileChange = createAsyncThunk(
  "editProfile/verifyMobileChange",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      if (!email || !otp) throw new Error("Email and OTP are required");

      const response = await postData("/api/mobile_change/verify", { email, otp });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Upload profile image
export const updateProfileImage = createAsyncThunk(
  "editProfile/updateProfileImage",
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      console.log('file:', formData);;
      
      const response = await putData(`/api/users/${userId}/profile-picture`, formData, {
        "Content-Type": "multipart/form-data",
      });
     
      return response;
      // dispatch(getProfileImage(userId));
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Fetch profile image
export const getProfileImage = createAsyncThunk(
  "editProfile/getProfileImage",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getData(`/api/users/profile-picture/${userId}`);

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);
