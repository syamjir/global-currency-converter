import React from "react";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";

function StartButton() {
  return (
    <div className="flex-wrap">
      <Button type="primary" color="bg-primary-dark" to={"conversion"}>
        Press <span className="bg-primary p-1 rounded">Enter</span> anytime to
        start
        <FaArrowRight />
      </Button>
    </div>
  );
}

export default StartButton;
