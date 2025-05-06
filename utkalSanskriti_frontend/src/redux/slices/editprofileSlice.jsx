import { createSlice } from "@reduxjs/toolkit";
import {
  updateEditProfile,
  requestMobileChange,
  verifyMobileChange,
  updateProfileImage,
  getProfileImage,
} from "../thunks/editProfileThunks";

const editProfileSlice = createSlice({
  name: "editProfile",
  initialState: {
    updateStatus: "idle",
    otpRequestStatus: "idle",
    otpVerifyStatus: "idle",
    imageUploadStatus: "idle",
    imageFetchStatus: "idle",
    profileImage: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Update Profile
      .addCase(updateEditProfile.pending, (state) => {
        state.updateStatus = "loading";
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateEditProfile.fulfilled, (state) => {
        state.updateStatus = "succeeded";
        state.loading = false;
        state.success = true;
      })
      .addCase(updateEditProfile.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Failed to update profile";
      })

      // Request Mobile Change OTP
      .addCase(requestMobileChange.pending, (state) => {
        state.otpRequestStatus = "loading";
        state.error = null;
      })
      .addCase(requestMobileChange.fulfilled, (state) => {
        state.otpRequestStatus = "succeeded";
      })
      .addCase(requestMobileChange.rejected, (state, action) => {
        state.otpRequestStatus = "failed";
        state.error = action.payload?.message || "Failed to send OTP";
      })

      // Verify OTP and Update Mobile Number
      .addCase(verifyMobileChange.pending, (state) => {
        state.otpVerifyStatus = "loading";
        state.error = null;
      })
      .addCase(verifyMobileChange.fulfilled, (state) => {
        state.otpVerifyStatus = "succeeded";
      })
      .addCase(verifyMobileChange.rejected, (state, action) => {
        state.otpVerifyStatus = "failed";
        state.error = action.payload?.message || "OTP verification failed";
      })

      // Update Profile Image
      .addCase(updateProfileImage.pending, (state) => {
        state.imageUploadStatus = "loading";
        state.error = null;
      })
      .addCase(updateProfileImage.fulfilled, (state) => {
        state.imageUploadStatus = "succeeded";
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.imageUploadStatus = "failed";
        state.error = action.payload || "Image upload failed";
      })

      // Get Profile Image
      .addCase(getProfileImage.pending, (state) => {
        state.imageFetchStatus = "loading";
        state.error = null;
      })
      .addCase(getProfileImage.fulfilled, (state, action) => {
        state.imageFetchStatus = "succeeded";
        state.profileImage = action.payload;
      })
      .addCase(getProfileImage.rejected, (state, action) => {
        state.imageFetchStatus = "failed";
        state.error = action.payload || "Image fetch failed";
      });
  },
});

export default editProfileSlice.reducer;
