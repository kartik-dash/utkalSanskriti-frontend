
import { createSlice } from "@reduxjs/toolkit";
import { changePassword } from "../thunks/settingsPageThunks";

const initialState = {
  user: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const forgotSlice = createSlice({
  name: "change",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An error occurred.";
      })
  },
});

export default forgotSlice.reducer;
