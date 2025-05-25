// src/components/Header.js
import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const baseLinkClasses = "hover:underline";
  const buttonClasses = "border border-white px-4 py-1 rounded hover:bg-white hover:text-teal-700";

  return (
    <header className="flex justify-between items-center px-8 py-6 bg-gradient-to-br from-teal-700 to-teal-900 text-white sticky top-0 z-50">
      <h1 className="text-2xl font-bold">🚀 EMS</h1>
      <nav className="space-x-6">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? `${baseLinkClasses} underline font-bold text-teal-300` : baseLinkClasses
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? `${baseLinkClasses} underline font-bold text-teal-300` : baseLinkClasses
          }
        >
          About
        </NavLink>

        <NavLink
          to="/features"
          className={({ isActive }) =>
            isActive ? `${baseLinkClasses} underline font-bold text-teal-300` : baseLinkClasses
          }
        >
          Features
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive
              ? `${buttonClasses} bg-white text-teal-700 font-bold`
              : buttonClasses
          }
        >
          Login
        </NavLink>

        
      </nav>
    </header>
  );
};

export default Header;
