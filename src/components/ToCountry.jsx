import React from "react";
import CountrySelect from "./CountrySelect";
import { useCurrencyData } from "../contexts/CurrencyContext";

function ToCountry() {
  const { setTo, toCountry } = useCurrencyData();

  // Render country selector for the "To" currency with current selection and setter
  return (
    <div>
      <CountrySelect onSetTo={setTo} onToCountry={toCountry} />
    </div>
  );
}

export default ToCountry;
