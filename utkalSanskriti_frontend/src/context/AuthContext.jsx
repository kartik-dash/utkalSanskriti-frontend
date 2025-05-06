import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);  // Initially no role
  const [loading, setLoading] = useState(true);  // Assume loading until we know the role

  useEffect(() => {
    // Simulate fetching the role from sessionStorage, an API, or a similar source
    const storedRole = sessionStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);  // Set role from sessionStorage or any other source
    }
    setLoading(false);  // Set loading to false after checking the role
  }, []);

  return (
    <AuthContext.Provider value={{ role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
