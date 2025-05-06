

// src/redux/slices/cuisineSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { festivalData } from '../../assets/assets';


const initialState = {
    festivalData:festivalData,
    selectedFestival: null,
};

const festivalSlice = createSlice({
  name: 'festival',
  initialState,
  reducers: {
    setSelectedFestival: (state, action) => {
      state.selectedFestival = action.payload;
    },
  },
});

export const { setSelectedFestival } = festivalSlice.actions;

export const selectSelectedFestival = (state) => state.festival.selectedFestival;

export default festivalSlice.reducer;