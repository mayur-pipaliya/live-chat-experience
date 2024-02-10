import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(undefined);

export const getToken = () => {
  return localStorage.getItem(process.env.REACT_APP_TOKEN_KEY);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem(process.env.REACT_APP_TOKEN_KEY, userToken);
    setToken(userToken);
  };

  return (
    <AuthContext.Provider value={{ token, setToken: saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(`useCurrentUser must be called within a AuthProvider`);
  }

  return context;
};
