

// src/redux/slices/cuisineSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { cuisineData } from '../../assets/assets';


const initialState = {
    cuisineData:cuisineData,
    selectedCuisine: null,
};

const cuisineSlice = createSlice({
  name: 'cuisine',
  initialState,
  reducers: {
    setSelectedCuisine: (state, action) => {
      state.selectedCuisine = action.payload;
    },
  },
});

export const { setSelectedCuisine } = cuisineSlice.actions;

export const selectSelectedCuisine = (state) => state.cuisine.selectedCuisine;

export default cuisineSlice.reducer;