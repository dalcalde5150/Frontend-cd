import { useState, useContext, createContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = () => {
    const session = Cookies.get("token");
    const id = Cookies.get("user_id");
    console.log(session);
    if (session) {
      setUser(id);
      console.log(user);
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user_id");
    Cookies.remove("token");
  };

  return (<AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>);
}

export const useAuth = () => {
  return useContext(AuthContext);
}
