import React, { useEffect } from "react";
import HeaderTitle from "../components/HeaderTitle";
import FromCountry from "../components/FromCountry";
import ToCountry from "../components/ToCountry";
import CustomDateInput from "../components/CustomDateInput";
import Button from "../components/Button";
import { useUrlConversionData } from "../hooks/useUrlConversionData";
import { useCurrencyData } from "../contexts/CurrencyContext";

// Fix: Reset rate on mount and update from/to based on URL params
function ConversionPage() {
  const {
    amount,
    setAmount,
    rate,
    calculateRate,
    countryList,
    setFrom,
    setTo,
    setFromCountry,
    setToCountry,
    isLoading,
    setRate,
  } = useCurrencyData();

  const { from, to } = useUrlConversionData();

  // When 'from' currency changes, reset rate and update from country
  useEffect(() => {
    setRate(null);
    handleEditFrom(from);
  }, [from]);

  // When 'to' currency changes, update to country
  useEffect(() => {
    handleEditTo(to);
  }, [to]);

  // Helper to update 'from' country and code
  const handleEditFrom = (code) => {
    const fromCountry = countryList.find((c) => c.code === code);
    if (fromCountry) setFromCountry(fromCountry);
    setFrom(code);
  };

  // Helper to update 'to' country and code
  const handleEditTo = (code) => {
    const toCountry = countryList.find((c) => c.code === code);
    if (toCountry) setToCountry(toCountry);
    setTo(code);
  };

  const currencyStyle =
    "hover:bg-brand hover:rounded-full hover:text-dark hover:px-1.5 cursor-pointer duration-700 transition-all-ease ";

  return (
    <div className=" w-full md:w-3/4 mb-6 sm:mt-9">
      <HeaderTitle
        header={"ExchanGo Currency Converter"}
        title={"1 US Dollar to Indian rupees"}
      />
      <div className=" bg-primary-hover-dark grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 relative p-7 mt-12 rounded-md">
        {/* Country selectors */}
        <FromCountry />
        <ToCountry />

        {/* Amount input */}
        <input
          type="text"
          className="px-4 w-full h-14 rounded border-2 border-secondary bg-light text-lg font-medium focus:outline-none focus:ring-0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Rate display (readonly) */}
        <input
          type="text"
          readOnly
          className=" px-4 w-full h-14 rounded border-2 border-secondary bg-light text-red-600  text-lg font-bold focus:outline-none focus:ring-0"
          value={rate !== null ? rate : ""}
        />

        {/* Quick-select currencies for 'from' */}
        <ul className="flex items-center md:gap-8 gap-4 ml-4  justify-self-start row-start-2 row-end-3 sm:row-auto ">
          {["USD", "INR", "AED", "EUR"].map((code) => (
            <li
              key={code}
              className={currencyStyle}
              onClick={() => handleEditFrom(code)}
            >
              {code}
            </li>
          ))}
        </ul>

        {/* Quick-select currencies for 'to' */}
        <ul className="flex items-center md:gap-8 gap-4 ml-4  justify-self-start row-start-4 row-end-5 sm:row-auto ">
          {["USD", "INR", "AED", "EUR"].map((code) => (
            <li
              key={code}
              className={currencyStyle}
              onClick={() => handleEditTo(code)}
            >
              {code}
            </li>
          ))}
        </ul>

        {/* Date input */}
        <div className="flex items-center gap-6">
          <label htmlFor="date" id="date" className="text-lg">
            Date
          </label>
          <CustomDateInput />
        </div>

        {/* Convert button */}
        <Button
          type={"secondary"}
          color={`bg-primary-dark ${isLoading ? "cursor-wait" : ""}`}
          onClick={calculateRate}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Convert"}
        </Button>
      </div>
    </div>
  );
}

export default ConversionPage;
