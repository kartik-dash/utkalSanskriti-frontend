import { createAsyncThunk } from "@reduxjs/toolkit";
import { postData } from "../api/api";

export const changePassword = createAsyncThunk(
  "change/changePassword",
  async ({ email, oldPassword, otp, newPassword, confirmNewPassword }, { rejectWithValue }) => {
    try {
      const response = await postData("/api/reset_password_old", {
        email,
        oldPassword,
        otp,
        newPassword,
        confirmNewPassword,
      });
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while processing your request."
      );
    }
  }
);



  