// src/utils/tokenUtils.js
import { jwtDecode } from 'jwt-decode';

/**
 * Decodes the JWT token and extracts the role.
 * @returns {string|null} The role from the JWT token or null if invalid.
 */
export const getRoleFromToken = () => {
  const token = sessionStorage.getItem('token');
  if (!token) return null;

  try {
    // Decode the token
    const decodedToken = jwtDecode(token);
    return decodedToken?.role || null; // Extract the role from the decoded token
  } catch (error) {
    console.error('Error decoding token', error);
    return null;
  }
};
export const getUserIdFromToken = () => {
    const token = sessionStorage.getItem('token');
    if (!token) return null;
  
    try {
      // Decode the token
      const decodedToken = jwtDecode(token);
      console.log('userr:', decodedToken.userId);
      return decodedToken?.userId || null; // Extract the userId from the decoded token
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  };
/**
 * Checks if the JWT token is valid (not expired).
 * @returns {boolean} True if the token is valid, false otherwise.
 */
export const isTokenValid = () => {
  const token = sessionStorage.getItem('token');
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp > currentTime; // Check if the token has expired
  } catch (error) {
    console.error('Error checking token validity', error);
    return false;
  }
};
