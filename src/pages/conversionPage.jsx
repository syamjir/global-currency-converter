import React, { useEffect, useState } from "react";
import HeaderTitle from "../components/HeaderTitle";
import FromCountry from "../components/FromCountry";
import ToCountry from "../components/ToCountry";
import CustomDateInput from "../components/CustomDateInput";
import Button from "../components/Button";
import { useUrlConversionData } from "../hook/useUrlConversionData";
import { useCurrencyData } from "../contexts/CurrencyContext";

// setRate not get null when component mount while click link in flashrate

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

  useEffect(() => {
    setRate(null);
    handleEditFrom(from);
  }, [from]);
  useEffect(() => {
    handleEditTo(to);
  }, [to]);

  const handleEditFrom = (code) => {
    const fromCountry = countryList.find(
      (countryCode) => countryCode.code === code
    );
    if (fromCountry) {
      setFromCountry(fromCountry);
    }
    setFrom(code);
  };
  const handleEditTo = (code) => {
    const toCountry = countryList.find(
      (countryCode) => countryCode.code === code
    );
    if (toCountry) {
      setToCountry(toCountry);
    }
    setTo(code);
  };

  const currencyStyle =
    "hover:bg-primary-dark hover:rounded-full hover:px-1 cursor-pointer duration-700 transition-all-ease ";
  return (
    <div className=" w-full md:w-3/4 mb-6 sm:mt-9">
      <HeaderTitle
        header={"ExchanGo Currency Converter"}
        title={"1 US Dollar to Indian rupees"}
      />
      <div className=" bg-primary-hover-dark grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 relative p-7 mt-12 rounded-md">
        <FromCountry />

        <ToCountry />

        <input
          type="text"
          className="px-4 w-full h-14 rounded border-2 border-primary text-lg font-medium"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <input
          type="text"
          readOnly
          className=" px-4 w-full h-14 rounded border-2 border-primary text-red-600  text-lg font-bold"
          value={rate !== null ? rate : ""}
        />

        <ul className="flex items-center md:gap-8 gap-4 ml-4  justify-self-start row-start-2 row-end-3 sm:row-auto ">
          <li className={currencyStyle} onClick={() => handleEditFrom("USD")}>
            USD
          </li>
          <li className={currencyStyle} onClick={() => handleEditFrom("INR")}>
            INR
          </li>
          <li className={currencyStyle} onClick={() => handleEditFrom("AED")}>
            AED
          </li>
          <li className={currencyStyle} onClick={() => handleEditFrom("EUR")}>
            EUR
          </li>
        </ul>
        <ul className="flex items-center md:gap-8 gap-4 ml-4  justify-self-start row-start-4 row-end-5 sm:row-auto ">
          <li className={currencyStyle} onClick={() => handleEditTo("USD")}>
            USD
          </li>
          <li className={currencyStyle} onClick={() => handleEditTo("INR")}>
            INR
          </li>
          <li className={currencyStyle} onClick={() => handleEditTo("AED")}>
            AED
          </li>
          <li className={currencyStyle} onClick={() => handleEditTo("EUR")}>
            EUR
          </li>
        </ul>

        <div className="flex items-center gap-6">
          <label htmlFor="date" id="date" className="text-lg">
            Date
          </label>
          <CustomDateInput />
        </div>
        <Button
          type={"primary"}
          color={`bg-primary-dark ${isLoading ? "cursor-wait" : ""}`}
          onClick={calculateRate}
        >
          {isLoading ? "Loading..." : "Convert"}
        </Button>
      </div>
    </div>
  );
}

export default ConversionPage;
