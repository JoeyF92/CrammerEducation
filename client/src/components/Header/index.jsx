import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <main>
      <nav>
      <NavLink to="/" className="logo">
        BrainBoost
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
        <NavLink to="/logout" activeclassname="activeLink">
          Logout
        </NavLink>
      </nav>
      <Outlet />
    </main>
  );
};

export default Header;
