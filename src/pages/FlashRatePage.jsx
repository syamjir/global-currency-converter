import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function FlashRatePage() {
  // Common styles for each link item
  const linkStyle =
    "flex items-center sm:gap-16 gap-0 border rounded border-border justify-around text-text py-2 hover:text-brand transition-all duration-500 cursor-pointer";

  // Currency pairs to display in two columns
  const flashRateCountryListOne = [
    { from: "USD", to: "CHF", key: 1 },
    { from: "USD", to: "AUD", key: 2 },
    { from: "USD", to: "INR", key: 3 },
    { from: "USD", to: "CAD", key: 4 },
    { from: "USD", to: "AUD", key: 5 },
  ];
  const flashRateCountryListTwo = [
    { from: "USD", to: "JPY", key: 6 },
    { from: "USD", to: "CNY", key: 7 },
    { from: "USD", to: "RUB", key: 8 },
    { from: "USD", to: "EUR", key: 9 },
    { from: "USD", to: "SGD", key: 10 },
  ];

  return (
    <div className="w-full lg:w-2/3 grid grid-cols-2 mt-12 gap-6 md:gap-12">
      {/* First column of currency pairs */}
      <ul className="flex flex-col gap-7">
        {flashRateCountryListOne.map(({ from, to, key }) => (
          <Link
            key={key}
            className={linkStyle}
            to={`/conversion?from=${from}&to=${to}`}
          >
            <span>{`1 ${from} to ${to}`}</span>
            <FiChevronRight />
          </Link>
        ))}
      </ul>

      {/* Second column of currency pairs */}
      <ul className="flex flex-col gap-7">
        {flashRateCountryListTwo.map(({ from, to, key }) => (
          <Link
            key={key}
            className={linkStyle}
            to={`/conversion?from=${from}&to=${to}`}
          >
            <span>{`1 ${from} to ${to}`}</span>
            <FiChevronRight />
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default FlashRatePage;
