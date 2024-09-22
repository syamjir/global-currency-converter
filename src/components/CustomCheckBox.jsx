import React from "react";

function CustomCheckBox({ setIsChecked }) {
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  return (
    <label class="inline-flex items-center">
      <input
        type="checkbox"
        class="hidden peer"
        onChange={handleCheckboxChange}
      />
      <span class="w-5 h-5 flex items-center justify-center border-2 border-primary-dark rounded-md cursor-pointer peer-checked:bg-primary peer-checked:border-primary-dark"></span>
    </label>
  );
}

export default CustomCheckBox;
