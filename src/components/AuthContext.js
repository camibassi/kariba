// src/components/AuthContext.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser({...userData, ...{
      decksPermitidos: [
        'default',
        'alice'
      ],
      backgroundsPermitidos: [
        'natureza',
        'natureza2',
        'deserto',
      ]
    }});
  };

  const logout = () => {
    setUser(null); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
