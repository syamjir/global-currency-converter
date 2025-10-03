import React from "react";
import { Link } from "react-router-dom";

function CurrencyList({ code = "INR", onCurrencyInfoData }) {
  return (
    <div>
      {/* Section title */}
      <h2 className="text-2xl font-semibold mb-4 mt-4">
        Find other currencies
      </h2>
      {/* Grid container for currency items */}
      <div className="grid grid-cols-1 md:grid-cols-3 ml-4">
        {onCurrencyInfoData
          ? onCurrencyInfoData.slice(2, 11).map((currency) => (
              // Each currency item with unique key for React
              <div
                className="flex gap-3 items-center p-2"
                key={currency.currency.code}
              >
                {/* Display flag and code */}
                <p>
                  {currency.currency.flag} {currency.currency.code}
                </p>
                {/* Link to currency detail page */}
                <Link
                  className="text-secondary hover:text-highlight underline"
                  to={`${currency.currency.code}`}
                >
                  {currency.currency.name}
                </Link>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default CurrencyList;
