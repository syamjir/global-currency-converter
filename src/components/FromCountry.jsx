import React, { useState } from "react";
import CountrySelect from "./CountrySelect";
import { useCurrencyData } from "../contexts/CurrencyContext";

function FromCountry() {
  const { setFrom, fromCountry } = useCurrencyData();
  return (
    <div>
      <CountrySelect onsetFrom={setFrom} onFromCountry={fromCountry} />
    </div>
  );
}

export default FromCountry;
