// import axios from 'axios';

// // Base API URL
// export const API_URL = 'http://localhost:8080'; // Update with actual API URL

// // export const API_URL = 'http://88.222.241.45:2025'; // Update with actual API URL

// // Create Axios instance
// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// //Attach Authorization token
// api.interceptors.request.use(
//   (config) => {
//     const token = sessionStorage.getItem('token');

//     // Skip adding Authorization header for login, registration, and other public routes
//     const publicRoutes = ['/login', '/register', '/forgot-password'];
//     if (publicRoutes.some((route) => config.url.includes(route))) {
//       return config; 
//     }

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// // GET Request
// export const getData = async (endpoint) => {
//   try {
//     const response = await api.get(endpoint);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: error.message };
//   }
// };

// // POST Request
// export const postData = async (endpoint, data, customHeaders = {}) => {
//   try {
//     const response = await api.post(endpoint, data, { headers: { ...customHeaders } });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: error.message };
//   }
// };


// // PUT Request
// export const putData = async (endpoint, data) => {
//   try {
//     const response = await api.put(endpoint, data);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: error.message };
//   }
// };

// // DELETE Request
// export const deleteData = async (endpoint) => {
//   try {
//     await api.delete(endpoint);
//   } catch (error) {
//     throw error.response?.data || { message: error.message };
//   }
// };





// export default api;




import axios from 'axios';

// ✅ Base API URL (update as needed)
export const API_URL = 'http://localhost:8080';
// export const API_URL = 'http://88.222.241.45:2025'; // For deployment

// ✅ Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Attach Authorization token via interceptor
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');

    // Public routes where Authorization header is not needed
    const publicRoutes = ['/login', '/register', '/forgot-password'];
    if (publicRoutes.some((route) => config.url.includes(route))) {
      return config;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ GET Request
export const getData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// ✅ POST Request (supports FormData or JSON)
export const postData = async (endpoint, data, customHeaders = {}) => {
  try {
    const response = await api.post(endpoint, data, {
      headers: {
        ...customHeaders,
        ...(data instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// ✅ PUT Request (supports FormData or JSON)
export const putData = async (endpoint, data, customHeaders = {}) => {
  try {
    const response = await api.put(endpoint, data, {
      headers: {
        ...customHeaders,
        ...(data instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// ✅ DELETE Request
export const deleteData = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

export default api;
