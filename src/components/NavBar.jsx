import React, { useState } from "react";
import Button from "./Button";
import { FaBars, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the menu (used when clicking a nav button)
  function handleCloseMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      {/* Hamburger icon for mobile menu toggle */}
      <FaBars
        className="sm:hidden block w-7 h-7 hover:text-primary-dark cursor-pointer transition-all-ease duration-200"
        onClick={() => setMenuOpen(true)}
      />
      {/* Navigation container with responsive menu visibility */}
      <div
        className={`bg-primary-hover-dark p-2 md:p-3 flex sm:gap-4 sm:translate-x-0 items-center sm:rounded-full md:mt-1 sm:text-lg flex-col sm:flex-row absolute sm:static top-0 justify-center gap-6 w-full h-full sm:w-auto transition-all-ease duration-500 ${
          menuOpen ? "translate-x-0 bg-border " : "-translate-x-full"
        }`}
      >
        {/* Brand button navigates home and closes menu */}
        <Button type="brand" onClick={handleCloseMenu} to="/">
          {`ExchanGo`.toUpperCase()}
        </Button>

        {/* Navigation links */}
        <ul className="flex sm:gap-4 sm:text-base text-xl flex-col sm:flex-row w-full items-center gap-6">
          <Link to="/conversion" className="navlink__hover px-2 cursor-pointer">
            Conversion
          </Link>
          <Link to="/chart" className="navlink__hover px-2 cursor-pointer">
            Chart
          </Link>
          <Link to="/features" className="navlink__hover px-2 cursor-pointer">
            Features
          </Link>
        </ul>

        {/* Start button changes style depending on menu state */}
        <Button
          type={menuOpen ? "primary" : "small"}
          color={menuOpen ? "bg-primary-dark" : "bg-primary"}
          to="conversion"
        >
          Start
          <FaArrowRight />
        </Button>
      </div>
    </>
  );
}

export default NavBar;
