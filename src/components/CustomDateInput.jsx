import React, { useMemo } from "react";

function CustomDateInput() {
  // Get today's date in YYYY-MM-DD format
  const dateForInput = useMemo(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }, []);

  return (
    <input
      type="date"
      readOnly
      value={dateForInput}
      className="h-12 w-full rounded border-2 border-secondary bg-light p-4"
    />
  );
}

export default CustomDateInput;
