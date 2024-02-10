import { createContext, useContext } from "react";

export const CurrentUserContext = createContext(undefined);

export const CurrentUserProvider = ({ children }) => {
  // do query here to get user data

  return (
    <CurrentUserContext.Provider value={undefined}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error(
      `useCurrentUser must be called within a CurrentUserProvider`
    );
  }

  return context;
};
