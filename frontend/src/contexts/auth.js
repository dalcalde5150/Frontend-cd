import { useState, useContext, createContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (new_user) => {
    const session = Cookies.get("koa.sess");
    console.log(session);
    if (session) {
      setUser(new_user);
      console.log(user);
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("koa.sess");
    Cookies.remove("koa.sess.sig");
  };

  return (<AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>);
}

export const useAuth = () => {
  return useContext(AuthContext);
}
