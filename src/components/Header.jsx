import React from "react";
import StartButton from "./StartButton";
import NavBar from "./NavBar";

function Header() {
  return (
    <div className="flex items-center justify-center sm:justify-around gap-5 flex-wrap pt-1">
      <NavBar />
      <StartButton />
    </div>
  );
}

export default Header;
