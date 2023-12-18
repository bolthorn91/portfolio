import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(undefined)
  const [isTokenValid, setIsTokenValid] = useState(true);
  const value = {
    authUser,
    setAuthUser,
    isTokenValid,
    setIsTokenValid
  }
  

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};