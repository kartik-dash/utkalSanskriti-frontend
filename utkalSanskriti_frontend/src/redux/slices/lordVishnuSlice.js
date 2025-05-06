import { createSlice } from "@reduxjs/toolkit";
import { categories } from "../../assets/assets"; 

const initialState = {
  allVishnuTemples: categories
    .flatMap((category) => category.products)
    .filter((product) => product.LordVishnu === "yes"), // Store all Lord Vishnu temples
  filteredTemples: [],
};

const lordVishnuSlice = createSlice({
  name: "lordVishnu",
  initialState,
  reducers: {
    filterVishnuTemples: (state, action) => {
      const { direction } = action.payload;
      state.filteredTemples = state.allVishnuTemples.filter(
        (temple) => temple.direction.toLowerCase() === direction.toLowerCase()
      );
    },
    resetFilter: (state) => {
      state.filteredTemples = [];
    },
  },
});

export const { filterVishnuTemples, resetFilter } = lordVishnuSlice.actions;
export const selectFilteredTemples = (state) => state.lordVishnu.filteredTemples;
export const selectAllVishnuTemples = (state) => state.lordVishnu.allVishnuTemples;

export default lordVishnuSlice.reducer;
