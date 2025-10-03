import React from "react";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";

function StartButton() {
  // Button that navigates to the conversion page to start currency conversion
  return (
    <div className="flex-wrap">
      <Button type="primary" to={"conversion"}>
        Click <span className="bg-secondary px-3 py-0.5 rounded text-dark hover:bg-primary">me</span> anytime to
        start
        <FaArrowRight />
      </Button>
    </div>
  );
}

export default StartButton;
