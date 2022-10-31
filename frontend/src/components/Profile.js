import React from "react";
import { useAuth } from "../contexts/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Profile = () => {

  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.delete('http://localhost:3000/users/logout');
    auth.logout();
    navigate("/");
  };
  return <div>Welcome {auth.user}
  <button onClick={handleLogout}>Logout</button></div>
}