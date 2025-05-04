// TokenContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react'; // Assuming you're using Clerk for authentication

// Create Context
const TokenContext = createContext();

// Create a custom hook to use the Token context
export const useToken = () => {
  return useContext(TokenContext);
};

// Provider Component to wrap the application and provide the token context
export const TokenProvider = ({ children }) => {
  const { getToken } = useAuth(); // Use Clerk's getToken
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const fetchedToken = await getToken();
        setToken(fetchedToken); // Store the token
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, [getToken]); // Re-fetch the token when `getToken` changes

  return (
    <TokenContext.Provider value={{ token }}>
      {children}
    </TokenContext.Provider>
  );
};
