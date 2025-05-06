// src/redux/slices/eventSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { submitTransportRequest, fetchTransportRequests, fetchTransportRequestsTeamLeader, fetchTransportRequestsSupport, fetchTransportRequestsMidlevel } from '../thunks/transportThunks';

const transportHelpSlice = createSlice({
  name: "transportHelp",
  initialState: {
    requests: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // submitTransportRequest handlers

      .addCase(submitTransportRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitTransportRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Transport request submitted successfully!";
        state.requests.push(action.payload); // Add new request to list
        console.log('jjjj:', state.requests);
      })
      .addCase(submitTransportRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchTransportRequests handlers

      .addCase(fetchTransportRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransportRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchTransportRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // fetchTransportRequests TeamLeader handlers (✅ fixed typo)

      .addCase(fetchTransportRequestsTeamLeader.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransportRequestsTeamLeader.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchTransportRequestsTeamLeader.rejected, (state, action) =>{
        state.loading = false;
        state.error = action.payload;
      })


      //fetch Transport Requests Support 

      .addCase(fetchTransportRequestsSupport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransportRequestsSupport.fulfilled, (state, action) =>{
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchTransportRequestsSupport.rejected, (state, action) =>{
        state.loading = false;
        state.error =action.payload;
      })



      //fetch Transport Requests midlevel 

      .addCase(fetchTransportRequestsMidlevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransportRequestsMidlevel.fulfilled, (state, action) =>{
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchTransportRequestsMidlevel.rejected, (state, action) =>{
        state.loading = false;
        state.error =action.payload;
      });

  },
});

export default transportHelpSlice.reducer;



