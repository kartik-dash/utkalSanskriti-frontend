import { createSlice } from "@reduxjs/toolkit";
import { historyData } from "../../assets/assets"; // Import mock data

const initialState = {
    historyData: historyData,
    selectedHistory: null,
};

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        setSelectedHistory: (state, action) => {
            state.selectedHistory = action.payload;
        },
    },
});
export const { setSelectedHistory } = historySlice.actions;//  Export the action
export const selectHistory = (state) => state.history.historyData;
export const selectSelectedHistory = (state) => state.history.selectedHistory;;
export default historySlice.reducer;
