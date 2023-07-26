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
    <header>
      <NavLink to="/" className="logo">
        BrainBoost
        <img src={brainLogo} alt="Brain Logo" className="brain-logo" />
      </NavLink>
      <nav>
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
          activeClassName="activeLink"
        >
          Logout
        </NavLink>
      </nav>
      <Outlet />
    </header>
  );
};

export default Header;
