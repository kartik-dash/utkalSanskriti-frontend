import { createSlice } from "@reduxjs/toolkit";
import { fetchMasterAdminProfileData } from "../thunks/masteradminProfileThunks";

const masterProfileSlice = createSlice({
  name: "masterProfile",
  initialState: {
    masterProfile: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMasterAdminProfileData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMasterAdminProfileData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.masterProfile = action.payload;
      })
      .addCase(fetchMasterAdminProfileData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch user profile";
      });
  },
});

export default masterProfileSlice.reducer;

