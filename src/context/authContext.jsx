import { createContext, useContext, useState } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
 
  const [isAuthorized, setIsAuthorized]  = useState(false)

  return <authContext.Provider value={{isAuthorized, setIsAuthorized}}>{children}</authContext.Provider>;
};

const useAuth = () => {
  const context = useContext(authContext);

  return context;
};

export { authContext, AuthProvider, useAuth };