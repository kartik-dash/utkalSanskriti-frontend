
import { createSlice } from "@reduxjs/toolkit";
import { fetchTempleData, createTemple, searchTemples, updateTemple, fetchDistrictData, fetchDistrictTemple, fetchDistrictwiseTemple } from "../thunks/templeThunks";

const templeDistrictSlice = createSlice({
  name: "templeDistrict",
  initialState: {
    temples: [],
    districtTemples: [],
    distTemples: [],
    districts: [],
    status: "idle", // General API call status
    fetchDistrictTempleStatus: "idle", // Separate status for district temple fetch
    error: null,
  },
  reducers: {
    removeDistrictTemples: (state, action) => {
      // ✅ Remove only temples belonging to the unselected district
      state.districtTemples = state.districtTemples.filter(
        (temple) => temple.districtName !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch All Temples
      .addCase(fetchTempleData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTempleData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.temples = action.payload;
      })
      .addCase(fetchTempleData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ✅ Create New Temple
      .addCase(createTemple.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTemple.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.temples.push(action.payload);
      })
      .addCase(createTemple.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      

      // ✅ Search Temples
      .addCase(searchTemples.pending, (state) => {
        state.searchStatus = "loading";
      })
      .addCase(searchTemples.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.searchedTemples = action.payload; // ✅ Store search results
      })
      .addCase(searchTemples.rejected, (state, action) => {
        state.searchStatus = "failed";
        state.error = action.payload;
      })

  
      //update edit temple data
      .addCase(updateTemple.pending, (state) => {
        state.updateStatus = 'loading';
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateTemple.fulfilled, (state) => {
        state.updateStatus = 'succeeded';
        state.loading = false;
        state.success = true;
      })
      .addCase(updateTemple.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.loading = false;
        state.error = action.payload || "Failed to update temple details";
        state.success = false;
      })

      // ✅ Fetch Districts
      .addCase(fetchDistrictData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDistrictData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.districts = action.payload;
      })
      .addCase(fetchDistrictData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchDistrictwiseTemple.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.distTemples = action.payload;
      })

      
      // ✅ Fetch Temples of a District
      .addCase(fetchDistrictTemple.pending, (state) => {
        state.fetchDistrictTempleStatus = "loading";
      })
      .addCase(fetchDistrictTemple.fulfilled, (state, action) => {
        state.fetchDistrictTempleStatus = "succeeded";
        // ✅ Append new temples, but remove duplicates
        state.districtTemples = [...state.districtTemples, ...action.payload].filter(
          (value, index, self) => index === self.findIndex((t) => t.id === value.id)
        );
      })
      .addCase(fetchDistrictTemple.rejected, (state, action) => {
        state.fetchDistrictTempleStatus = "failed";
        state.error = action.payload;
      });
  },
});

// ✅ Export Action
export const { removeDistrictTemples } = templeDistrictSlice.actions;

// ✅ Export Reducer
export default templeDistrictSlice.reducer;