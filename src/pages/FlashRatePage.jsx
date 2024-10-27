import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
function FlashRatePage() {
  const linkStyle =
    "flex items-center sm:gap-16 gap-0 border rounded border-primary-dark justify-around text-text py-2 hover:text-primary-dark transition-all-ease duration-500 cursor-pointer";

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
      <ul className="flex flex-col gap-7">
        {flashRateCountryListOne.map((country) => (
          <Link
            key={country.key}
            className={linkStyle}
            to={`/conversion?from=${country.from}&to=${country.to}`}
          >
            <span>{`1 ${country.from} to ${country.to}`}</span>
            <FiChevronRight />
          </Link>
        ))}
      </ul>

      <ul className="flex flex-col gap-7">
        {flashRateCountryListTwo.map((country) => (
          <Link
            key={country.key}
            className={linkStyle}
            to={`/conversion?from=${country.from}&to=${country.to}`}
          >
            <span>{`1 ${country.from} to ${country.to}`}</span>
            <FiChevronRight />
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default FlashRatePage;
