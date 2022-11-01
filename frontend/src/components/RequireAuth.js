import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

export const RequireAuth = ({ children }) => {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/signin" />;
  }

  return children 
}
