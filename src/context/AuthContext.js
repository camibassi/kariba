// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para armazenar informações do usuário

  const login = (userData) => {
    setUser(userData); // Armazena os dados do usuário ao fazer login
  };

  const logout = () => {
    setUser(null); // Remove os dados do usuário ao fazer logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
