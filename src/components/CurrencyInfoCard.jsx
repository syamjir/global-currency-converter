import React from "react";
import { Link } from "react-router-dom";

function CurrencyInfoCard({ flag, code, name, summary }) {
  return (
    <div className="w-full grid gap-2 p-4 bg-primary-hover-light rounded-md mt-7">
      <header>
        <h2 className="text-lg font-semibold">
          {flag} {code} - {name}
        </h2>
      </header>
      <section>
        <p className="mb-2">{summary}</p>
        <Link
          className="text-blue-800 underline hover:text-blue-700 "
          to={`${code}`}
        >
          More {name} Info
        </Link>
      </section>
    </div>
  );
}

export default CurrencyInfoCard;
