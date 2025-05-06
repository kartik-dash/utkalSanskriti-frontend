import { createAsyncThunk } from '@reduxjs/toolkit';
import { getData, postData, putData, deleteData } from '../api/api';


// Fetch User Data (GET)
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userId, { rejectWithValue }) => {
    try {
      console.log('userid:', userId);
      const data = await getData(`/api/users/children/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

//fetch user-management-govt to show temple and district data
export const fetchUsergovtData = createAsyncThunk(
  'user/fetchUserData',
  async (userId, { rejectWithValue }) => {
    try {
      console.log('userid:', userId);
      const data = await getData(`/api/users/children/${userId}/temple_admin_details`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Create User (POST)

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      let headers = {};
console.log('userdata:', userData);
      // Check if role is NOT "Master Admin" before requiring a token
      if (userData.role !== "MASTER_ADMIN") {
        const token = sessionStorage.getItem('token'); // Get token from sessionStorage

        if (!token) {
          throw new Error('Authorization token is missing.');
        }

        headers.Authorization = `Bearer ${token}`; // Pass token in headers
      }

      // API request without token for "Master Admin" and with token for other roles
      const data = await postData(`/api/register`, userData, headers);

      return data; // Return the response data
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);





// Update User (PUT)
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const data = await putData(`/api/users/profile/${userId}`, userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);



// Delete User (DELETE)
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await deleteData(`/api/users/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);




// Fetch Userprofile Data (GET)

export const fetchUserProfileData = createAsyncThunk(
  "user/fetchUserProfileData",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await getData(`/api/users/summary/${userId}`);
      console.log("lkkkk", data);
      return data;
      
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);


export const fetchProfileServices = createAsyncThunk(
  "user/fetchProfileServices",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await getData(`/api/bookings/by_client/${userId}/assignments`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);


export const createGovt = createAsyncThunk(
  "user/createGovt",
  async ({ firstName, lastName, email, contactNumber, password, role, governmentId, templeId }, { rejectWithValue }) => {
    try {
      const payload = {
        templeAdminDTO: { firstName, lastName, email, contactNumber, password, role },
        governmentId,
        templeId
      };

      console.log("API Payload:", payload); // Debugging

      const data = await postData("/api/register_temple_admin_with_temple", payload);
      console.log("API Response:", data); // Debugging

      return data; 
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message); // Debugging
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);



