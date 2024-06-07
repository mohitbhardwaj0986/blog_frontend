import { createContext, useContext, useState } from "react";

const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
 
  const value = { user, setUser };
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

const useUser = () => {
  const context = useContext(userContext);

  return context;
};

export { userContext, UserProvider, useUser };