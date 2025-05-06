import { createSlice } from "@reduxjs/toolkit";
import { fetchInternationalcount, fetchInternationalData } from "../thunks/internationalThunks";

const internationalSlice = createSlice ({
    name: "international",
    initialState: {
        requests: [],
        error:null,
        loading:false,
        successMessage:null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase (fetchInternationalData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase (fetchInternationalData.fulfilled, (state, action) => {
                state.loading = false;
                state.requests = action.payload;
            })
            .addCase (fetchInternationalData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            .addCase (fetchInternationalcount.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase (fetchInternationalcount.fulfilled, (state, action) => {
                state.loading = false;
                state.internationalCount = action.payload;
            })
            .addCase (fetchInternationalcount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});


export default internationalSlice.reducer;