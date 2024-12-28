// src/components/UserContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize role from local storage or default to an empty string
  const [role, setRole] = useState(localStorage.getItem('userRole') || '');

  // Optional: Sync local storage if role changes
  useEffect(() => {
    localStorage.setItem('userRole', role);
  }, [role]);

  return (
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};
