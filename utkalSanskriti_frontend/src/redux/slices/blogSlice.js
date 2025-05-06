

// src/redux/slices/cuisineSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { blogData } from '../../assets/assets';

const initialState = {
    blogData:blogData,
    selectedBlog: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setSelectedBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },
  },
});

export const { setSelectedBlog } = blogSlice.actions;

export const selectSelectedBlog = (state) => state.blog.selectedBlog;

export default blogSlice.reducer;