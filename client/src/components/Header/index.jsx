// /* eslint-disable-next-line no-unused-vars */
// import React from "react";

// import { NavLink, Outlet } from "react-router-dom";
// import "./header.css";

// const styles = ({ isActive }) => ({
//   textDecoration: isActive ? "underline" : "none",
// });

// export default function Header() {
//   return (
//     <main>
//       <header>
//         <nav>
//           <NavLink to="/" style={styles}>
//             Home
//           </NavLink>
//           <NavLink to="/myflashcards" style={styles}>
//             My flashcards
//           </NavLink>
//           <NavLink to="/createdeck" style={styles}>
//             Create flashcards
//           </NavLink>
//           <NavLink to="/decks" style={styles}>
//             Browse
//           </NavLink>
//           <NavLink to="/logout" style={styles}>
//             Logout
//           </NavLink>
//         </nav>
//       </header>
//       <Outlet />
//     </main>
//   );
// }

// {
//   /* <footer>BrainBoost © 2023</footer> */
// }

import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <NavLink to="/" activeClassName="activeLink">
          Home
        </NavLink>
        <NavLink to="/myflashcards" activeClassName="activeLink">
          My flashcards
        </NavLink>
        <NavLink to="/createdeck" activeClassName="activeLink">
          Create flashcards
        </NavLink>
        <NavLink to="/decks" activeClassName="activeLink">
          Browse
        </NavLink>
        <NavLink to="/logout" activeClassName="activeLink">
          Logout
        </NavLink>
      </nav>
      <Outlet />
    </header>
  );
};

export default Header;
