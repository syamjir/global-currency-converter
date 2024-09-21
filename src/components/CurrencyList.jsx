import React from "react";
import { Link } from "react-router-dom";

function CurrencyList({ code = "INR", onCurrencyInfoData }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 mt-4">
        Find other currencies
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 ml-4  ">
        {onCurrencyInfoData
          ? onCurrencyInfoData.slice(2, 11).map((currency) => (
              <div className="flex gap-3 items-center p-2">
                <p>
                  {currency.currency.flag} {currency.currency.code}
                </p>
                <Link
                  className="text-blue-800 hover:text-blue-700 underline"
                  to={`${currency.currency.code}`}
                  key={currency.currency.code}
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
