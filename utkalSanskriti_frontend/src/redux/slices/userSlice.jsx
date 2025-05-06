import { createSlice } from '@reduxjs/toolkit';
import { fetchUserData, createUser, updateUser, deleteUser } from '../thunks/userThunks';
import { fetchProfileServices, fetchUserProfileData } from '../thunks/userThunks';
const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    userProfile: null,
    supportData: null,
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        // state.userProfile = action.payload;
        // Store users in an array
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Create User
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';

        // Ensure action.payload is the correct data structure and is an array
        // if (Array.isArray(action.payload)) {
        //   state.users = action.payload; // If the response is an array, just set the state
        // } else {
        //   state.users.push(action.payload); // Add the single new user if it's not an array
        // }
      })

      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload; // Update existing user
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = state.users.filter(user => user.id !== action.payload); // Remove user
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })


      // fetch userprofile data
      .addCase(fetchUserProfileData.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })

      .addCase(fetchProfileServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfileServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const services = action.payload || [];

        // Separate services into support, admin, and guide arrays
        state.supportData = services
          .filter(service => service.supportServiceName !== null)
          .map(service => ({
            ...service,
            templeName: service.templeName,
          }));

        state.adminData = services
          .filter(service => service.templeAdminName !== null)
          .map(service => ({
            ...service,
            templeName: service.templeName,
          }));

        state.guideData = services
          .filter(service => service.guideName !== null)
          .map(service => ({
            ...service,
            templeName: service.templeName,
          }));
          
      })
      .addCase(fetchProfileServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});


export default userSlice.reducer;
