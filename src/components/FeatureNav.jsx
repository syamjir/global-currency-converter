import React, { useState } from "react";
import { Link } from "react-router-dom";

function FeatureNav() {
  const [activeBtn, setActiveBtn] = useState("hotConversion");
  const activeBtnStyle = "bg-primary-dark";
  const featureBtn =
    "px-2 rounded-full cursor-pointer py-1 text-sm sm:py-1 flex item-center text-center";
  return (
    <nav>
      <ul className="text-text  bg-primary-hover-dark inline-flex items-center rounded-full sm:uppercase">
        <Link
          className={`${featureBtn} ${
            activeBtn === "rateAlert" ? activeBtnStyle : ""
          }`}
          onClick={() => {
            setActiveBtn("");
            setActiveBtn("rateAlert");
          }}
          to={"rate-alert"}
        >
          Rate Alert
        </Link>
        <Link
          className={`${featureBtn} ${
            activeBtn === "hotConversion" ? activeBtnStyle : ""
          }`}
          onClick={() => {
            setActiveBtn("");
            setActiveBtn("hotConversion");
          }}
          to={"flash-rate"}
        >
          Flash Rates
        </Link>
        <Link
          className={`${featureBtn} ${
            activeBtn === "currencyInfo" ? activeBtnStyle : ""
          }`}
          onClick={() => {
            setActiveBtn("");
            setActiveBtn("currencyInfo");
          }}
          to={"currency-details"}
        >
          Currency Info
        </Link>
      </ul>
    </nav>
  );
}

export default FeatureNav;
