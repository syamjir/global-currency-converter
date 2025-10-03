import React from "react";
import { Outlet } from "react-router-dom";

// Parent wrapper for nested currency-related routes
function CurrencyPage() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default CurrencyPage;
