import React from "react";

function CustomCheckBox({ setIsChecked }) {
  // Update parent component state when checkbox changes
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <label className="inline-flex items-center">
      {/* Hidden native checkbox */}
      <input
        type="checkbox"
        className="hidden peer"
        onChange={handleCheckboxChange}
      />
      {/* Custom styled checkbox */}
      <span className="w-5 h-5 flex items-center justify-center border-2 border-primary-dark rounded-md cursor-pointer peer-checked:bg-primary peer-checked:border-primary-dark"></span>
    </label>
  );
}

export default CustomCheckBox;
