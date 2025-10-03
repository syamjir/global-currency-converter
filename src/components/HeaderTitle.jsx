import React, { memo } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Button from "./Button";

// Memoized component to prevent unnecessary re-renders
const HeaderTitle = memo(({ header, title }) => {
  return (
    <div className="mt-3">
      {/* Back button to navigate to main menu */}
      <Button type={"small"} to="/">
        <FaArrowLeft />
        To Menu
      </Button>

      {/* Subheading */}
      <h4 className="text-lg text-text-light mb-1 mt-8">{header}</h4>

      {/* Main heading */}
      <h2 className="text-4xl mb-6 font-bold">{title}</h2>
    </div>
  );
});

export default HeaderTitle;
