import React, { useState } from "react";
import { Link } from "react-router-dom";

function FeatureNav() {
  const [activeBtn, setActiveBtn] = useState("hotConversion");

  const activeBtnStyle = "bg-highlight text-dark px-2.5";
  const featureBtn = "px-2 rounded-full cursor-pointer py-1 text-sm sm:py-1 flex items-center text-center";

  // Helper to generate link className based on active state
  const getLinkClass = (btnName) =>
    `${featureBtn} ${activeBtn === btnName ? activeBtnStyle : ""}`;

  return (
    <nav>
      <ul className="text-text bg-primary-hover-dark inline-flex items-center rounded-full sm:uppercase">
        <li>
          <Link
            className={getLinkClass("rateAlert")}
            onClick={() => setActiveBtn("rateAlert")}
            to="rate-alert"
          >
            Rate Alert
          </Link>
        </li>
        <li>
          <Link
            className={getLinkClass("hotConversion")}
            onClick={() => setActiveBtn("hotConversion")}
            to="flash-rate"
          >
            Flash Rates
          </Link>
        </li>
        <li>
          <Link
            className={getLinkClass("currencyInfo")}
            onClick={() => setActiveBtn("currencyInfo")}
            to="currency-details"
          >
            Currency Info
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default FeatureNav;
