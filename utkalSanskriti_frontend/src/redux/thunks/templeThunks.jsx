
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { getData, postData, putData, deleteData } from '../api/api';



// // Update User (PUT)
// export const updateTemple = createAsyncThunk(
//   "temple/updateTemple",
//   async ({ templeId, templeData }, { rejectWithValue }) => {
//     try {
//       const response = await putData(`/api/temple_details/${templeId}`, templeData, {
//         "Content-Type": "multipart/form-data",
//       });
//       return response.data;  // Return the response data, not the whole response object
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: error.message });
//     }
//   }
// );



// // Fetch Temples (GET)
// export const fetchTempleData = createAsyncThunk(
//   'temple/fetchTempleData',
//   async (templeId, { rejectWithValue }) => {
//     try {
//       console.log('Fetching temples for user:', templeId);
//       const data = await getData(`/api/temple_details/all`);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: error.message });
//     }
//   }
// );


// // Create User (POST)

// export const createTemple = createAsyncThunk(
//   "temple/createTemple",
//   async (templeData, { rejectWithValue }) => {
//     try {
//       const token = sessionStorage.getItem('token'); // Get token from sessionStorage

//       if (!token) {
//         throw new Error('Authorization token is missing.');
//       }
//       const response = await postData("/api/temple_details/add_with_image", templeData, {
//         "Content-Type": "multipart/form-data",
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const submitEvent = createAsyncThunk(
//   "event/submitEvent",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await postData("/api/events/add-with-image", formData, {
//         "Content-Type": "multipart/form-data",
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );


// // Delete User (DELETE)
// export const deleteTemple = createAsyncThunk(
//   'user/deleteUser',
//   async (userId, { rejectWithValue }) => {
//     try {
//       await deleteData(`/api/users/${userId}`);
//       return userId;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: error.message });
//     }
//   }
// );

// export const fetchDistrictData = createAsyncThunk(
//   "temple/fetchDistrictData",
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await getData("/api/districts");
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: error.message });
//     }
//   }
// );

// export const fetchDistrictTemple = createAsyncThunk(
//   "temple/fetchDistrictTemple",
//   async (districtName, { rejectWithValue }) => {  // Accept districtName as a parameter
//     try {
//       const data = await getData(`/api/temple_details/by_districts?districts=${districtName}`); // Pass districtName as a query param
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: error.message });
//     }
//   }
// );



// export const fetchDistrictwiseTemple = createAsyncThunk(
//   "temple/fetchDistrictwiseTemple",
//   async (districtName, { rejectWithValue }) => {  // Accept districtName as a parameter
//     try {
//       const data = await getData(`/api/temple_details/by_district/${districtName}`); // Pass districtName as a query param
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: error.message });
//     }
//   }
// );


// export const searchTemples = createAsyncThunk(
//   "temple/searchTemples",
//   async (query, { rejectWithValue }) => {
//     try {
//       const response = await getData(`/api/temple_details/search?name=${query}`);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: error.message });
//     }
//   }
// );





import { createAsyncThunk } from '@reduxjs/toolkit';
import { getData, postData, putData, deleteData } from '../api/api';

/**
 * ✅ Create Temple (POST with image/formData)
 */
export const createTemple = createAsyncThunk(
  "temple/createTemple",
  async (templeData, { rejectWithValue }) => {
    try {
      const response = await postData("/api/temple_details/add_with_image", templeData, {
        "Content-Type": "multipart/form-data",
      });
      return response; // already data returned from API util
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create temple.");
    }
  }
);

/**
 * ✅ Update Temple (PUT with image/formData)
 */
export const updateTemple = createAsyncThunk(
  "temple/updateTemple",
  async ({ templeId, templeData }, { rejectWithValue }) => {
    try {
      const response = await putData(`/api/temple_details/${templeId}`, templeData, {
        "Content-Type": "multipart/form-data",
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update temple.");
    }
  }
);

/**
 * ✅ Fetch All Temples (GET)
 */
export const fetchTempleData = createAsyncThunk(
  "temple/fetchTempleData",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getData("/api/temple_details/all");
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch temple data.");
    }
  }
);

/**
 * ✅ Delete Temple (DELETE)
 */
export const deleteTemple = createAsyncThunk(
  "temple/deleteTemple",
  async (templeId, { rejectWithValue }) => {
    try {
      await deleteData(`/api/temple_details/${templeId}`);
      return templeId;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete temple.");
    }
  }
);

/**
 * ✅ Submit Event (POST with image/formData)
 */
export const submitEvent = createAsyncThunk(
  "event/submitEvent",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await postData("/api/events/add-with-image", formData, {
        "Content-Type": "multipart/form-data",
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to submit event.");
    }
  }
);

/**
 * ✅ Fetch All Districts
 */
export const fetchDistrictData = createAsyncThunk(
  "temple/fetchDistrictData",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getData("/api/districts");
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch districts.");
    }
  }
);

/**
 * ✅ Fetch Temples By District (multiple districts, query param)
 */
export const fetchDistrictTemple = createAsyncThunk(
  "temple/fetchDistrictTemple",
  async (districtName, { rejectWithValue }) => {
    try {
      const data = await getData(`/api/temple_details/by_districts?districts=${districtName}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch temples by districts.");
    }
  }
);

/**
 * ✅ Fetch Temples By District (single district, path param)
 */
export const fetchDistrictwiseTemple = createAsyncThunk(
  "temple/fetchDistrictwiseTemple",
  async (districtName, { rejectWithValue }) => {
    try {
      const data = await getData(`/api/temple_details/by_district/${districtName}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch temples by district.");
    }
  }
);

/**
 * ✅ Search Temples by Name
 */
export const searchTemples = createAsyncThunk(
  "temple/searchTemples",
  async (query, { rejectWithValue }) => {
    try {
      const data = await getData(`/api/temple_details/search?name=${query}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to search temples.");
    }
  }
);
