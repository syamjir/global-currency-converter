import React, { memo } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Button from "./Button";

const HeaderTitle = memo(({ header, title }) => {
  return (
    <div className="mt-3">
      <Button type={"small"} to="/">
        <FaArrowLeft />
        To Menu
      </Button>
      <h4 className="text-lg text-text-light mb-1 mt-8">{header}</h4>
      <h2 className="text-4xl mb-6 font-bold">{title}</h2>
    </div>
  );
});

export default HeaderTitle;
