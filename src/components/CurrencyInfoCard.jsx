import React from "react";
import { Link } from "react-router-dom";

function CurrencyInfoCard({ flag, code, name, summary }) {
  return (
    // Card container
    <div className="w-full grid gap-2 p-4 bg-primary-hover-light rounded-md mt-7">
      <header>
        {/* Currency flag, code, and name */}
        <h2 className="text-lg font-semibold">
          {flag} {code} - {name}
        </h2>
      </header>
      <section>
        {/* Currency summary */}
        <p className="mb-2">{summary}</p>
        {/* Link to detailed currency info */}
        <Link
          className="text-brand underline hover:text-highlight "
          to={`${code}`}
        >
          More {name} Info
        </Link>
      </section>
    </div>
  );
}

export default CurrencyInfoCard;
