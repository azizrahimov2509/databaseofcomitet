import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path) =>
    location.pathname === path ? "bg-slate-300 text-gray-900" : "text-gray-700";

  return (
    <header className="bg-base-200 p-4 shadow-md">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="text-lg font-bold">
          <Link to="/">Mahalla Komitet</Link>
        </div>
        {/* Button to open/close menu on mobile */}
        <button
          className="lg:hidden flex items-center text-gray-600"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        {/* Menu items */}
        <ul
          className={`lg:flex lg:space-x-4 flex-col lg:flex-row absolute lg:static top-16 lg:top-0 left-0 w-full lg:w-auto bg-base-200 lg:bg-base-200 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } lg:translate-x-0 lg:relative lg:flex lg:items-center lg:space-x-4 ${
            isMenuOpen ? "block" : "hidden"
          } md:block`}
          style={{ maxWidth: "100%" }} // Ensure the menu does not overflow
        >
          <li>
            <Link
              to="/"
              className={`block px-4 py-2 rounded-lg hover:bg-slate-300 ${isActive(
                "/"
              )}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/committees"
              className={`block px-4 py-2 rounded-lg hover:bg-slate-300 ${isActive(
                "/committees"
              )}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Комитеты
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className={`block px-4 py-2 rounded-lg hover:bg-slate-300 ${isActive(
                "/login"
              )}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
