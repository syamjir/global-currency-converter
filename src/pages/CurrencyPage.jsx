import React from "react";
import { Outlet } from "react-router-dom";

function CurrencyPage() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default CurrencyPage;
