import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import { useAuth } from "../components/auth";

export const Navbar = () => {

  const auth = useAuth();

  return (
    <Nav>
      <NavLink className="navlink" to="/">Home</NavLink>
      {
        !auth.user && ( <NavLink className="navlink" to="/signin">Sign In</NavLink> )
      }
      {
        !auth.user && ( <NavLink className="navlink" to="/register">Register</NavLink> )
      }
      <NavLink className="navlink" to="/event">Event</NavLink>
      <NavLink className="navlink" to="/profile">Profile</NavLink>
    </Nav>
  );
};

const Nav = styled.nav`
  height: 60px;
  background-color: black;
  padding-top: 30px;
  .navlink {
    display: inline;
    color: white;
    text-decoration: none;
    padding-left: 40px;
    font-weight: bolder;
  }
  .navlink:hover {
    text-decoration: none;
  }
  .navlink:active {
    text-decoration: none;
  }
  .navlink:visited {
    text-decoration: none;
  }
  .navlink:link {
    text-decoration: none;
  }
`;