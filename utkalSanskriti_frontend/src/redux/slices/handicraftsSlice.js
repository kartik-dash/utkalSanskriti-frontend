
import { createSlice } from '@reduxjs/toolkit';
import { handicraftsData } from '../../assets/assets';


const initialState = {
    handicraftsData:handicraftsData,
    selectedHandicrafts: null,
};

const handicraftsSlice = createSlice({
  name: 'handicrafts',
  initialState,
  reducers: {
    setSelectedHandicrafts: (state, action) => {
      state.selectedHandicrafts = action.payload;
    },
  },
});

export const { setSelectedHandicrafts } = handicraftsSlice.actions;

export const selectSelectedHandicrafts = (state) => state.handicrafts.selectedHandicrafts;

export default handicraftsSlice.reducer;