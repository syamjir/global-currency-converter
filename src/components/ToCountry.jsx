import React from "react";
import CountrySelect from "./CountrySelect";
import { useCurrencyData } from "../contexts/CurrencyContext";

function ToCountry() {
  const { setTo, toCountry } = useCurrencyData();
  return (
    <div>
      <CountrySelect onSetTo={setTo} onToCountry={toCountry} />
    </div>
  );
}

export default ToCountry;
