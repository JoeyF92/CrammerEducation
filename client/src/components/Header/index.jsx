import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import brainLogo from "./brain.png";
import "./header.css";

const styles = ({ isActive }) => ({
  textDecoration: isActive ? "underline" : "none",
});
const Header = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <main>
      <header>
        <nav>
          <NavLink to="/" className="logo">
            BrainBoost
            <img
              id="brain"
              src={brainLogo}
              alt="Brain Logo"
              className="brain-logo"
            />
          </NavLink>
          <NavLink to="/" activeclassnamee="activeLink" style={styles}>
            Home
          </NavLink>
          <NavLink
            to="/myflashcards"
            style={styles}
            activeclassnamee="activeLink"
          >
            My flashcards
          </NavLink>
          <NavLink to="/createdeck" style={styles} activeclassname="activeLink">
            Create flashcards
          </NavLink>
          <NavLink to="/decks" style={styles} activeclassname="activeLink">
            Browse
          </NavLink>
          <NavLink
            to="/login"
            style={styles}
            onClick={handleLogout}
            activeclassname="activeLink"
          >
            Logout
          </NavLink>
        </nav>
        <Outlet />
      </header>
      <footer>BrainBoost © 2023</footer>
    </main>
  );
};
export default Header;
