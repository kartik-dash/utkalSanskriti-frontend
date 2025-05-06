

// src/redux/slices/cuisineSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { danceData } from '../../assets/assets';


const initialState = {
    danceData:danceData,
    selectedDance: null,
};

const danceSlice = createSlice({
  name: 'dance',
  initialState,
  reducers: {
    setSelectedDance: (state, action) => {
      state.selectedDance = action.payload;
    },
  },
});

export const { setSelectedDance } = danceSlice.actions;

export const selectSelectedDance = (state) => state.dance.selectedDance;

export default danceSlice.reducer;