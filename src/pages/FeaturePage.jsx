import React from "react";
import HeaderTitle from "../components/HeaderTitle";
import FeatureNav from "../components/FeatureNav";
import { Outlet } from "react-router-dom";

function FeaturePage() {
  return (
    <div className="w-full md:w-3/4">
      {/* Page header with main heading and subtitle */}
      <HeaderTitle
        header={"ExchanGo Currency Converter"}
        title={"What Makes ExchanGo Stand Out"}
      />

      {/* Navigation and nested route outlet */}
      <div className="border-t border-border pt-7 flex flex-col items-center justify-center">
        <FeatureNav />
        <Outlet />
      </div>
    </div>
  );
}

export default FeaturePage;
