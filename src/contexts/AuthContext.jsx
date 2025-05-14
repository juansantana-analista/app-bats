// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { isAuthenticated } from '../services/auth';

// Create the context
export const AuthContext = createContext();

// Create a custom hook to use the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = isAuthenticated();
      setAuthenticated(isAuth);
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Auth context value
  const value = {
    authenticated,
    setAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};