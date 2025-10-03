import React from "react";
import CountrySelect from "./CountrySelect";
import { useCurrencyData } from "../contexts/CurrencyContext";

function FromCountry() {
  const { setFrom, fromCountry } = useCurrencyData();

  return (
    <div>
      {/* Pass down setter and current fromCountry data to CountrySelect */}
      <CountrySelect onSetFrom={setFrom} onFromCountry={fromCountry} />
    </div>
  );
}

export default FromCountry;
