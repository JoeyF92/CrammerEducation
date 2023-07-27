import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import brainLogo from "./brain.png";
import "./header.css";
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
            <img src={brainLogo} alt="Brain Logo" className="brain-logo" />
          </NavLink>
          <NavLink to="/" activeclassnamee="activeLink">
            Home
          </NavLink>
          <NavLink to="/myflashcards" activeclassnamee="activeLink">
            My flashcards
          </NavLink>
          <NavLink to="/createdeck" activeclassname="activeLink">
            Create flashcards
          </NavLink>
          <NavLink to="/decks" activeclassname="activeLink">
            Browse
          </NavLink>
          <NavLink
            to="/login"
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
