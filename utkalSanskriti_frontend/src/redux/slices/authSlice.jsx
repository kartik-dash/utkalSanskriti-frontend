import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../thunks/authThunks';
import { getRoleFromToken, getUserIdFromToken } from '../../utils/tokenUtils'; // Import the utility function


const initialState = {
  user: null,
  role: getRoleFromToken(), 
  userId: getUserIdFromToken(),
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;

        const token = action.payload['jwt-token'];
        sessionStorage.setItem('token', token);
        state.role = getRoleFromToken();  
        state.userId = getUserIdFromToken();  
        console.log('useriddd:', state.userId);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'An error occurred during login.';
      });
  },
});

export default authSlice.reducer;
