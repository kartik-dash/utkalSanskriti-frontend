import { createSlice } from '@reduxjs/toolkit';
import { fetchDomestic, fetchDomesticCount, fetchAllVisitorsManagementCount } from '../thunks/domesticThunks';

const domesticSlice = createSlice({
  name: "domestic",
  initialState: {
    requests: [],
    loading: false,
    error: null,
    successMessage: null,
    domesticCount: 0,
    Allmanagement: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDomestic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDomestic.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchDomestic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       
      .addCase(fetchDomesticCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDomesticCount.fulfilled, (state, action) => {
        state.loading = false;
        state.domesticCount = action.payload;
      })
      .addCase(fetchDomesticCount.rejected, (state,action) =>{
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllVisitorsManagementCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVisitorsManagementCount.fulfilled, (state, action) => {
        state.loading = false;
        state.Allmanagement = action.payload;
      })
      .addCase(fetchAllVisitorsManagementCount.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default domesticSlice.reducer;
