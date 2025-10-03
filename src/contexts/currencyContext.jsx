import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Currency } from "../services/getCurrencyRate";
import { convertToFlag } from "../utils/helper";
import { getDate } from "../utils/getDate";

const CurrencyContext = createContext();

function CurrencyDataProvider({ children }) {
  // State to manage loading, amount, rate, selected currencies, etc.
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(1);
  const [rate, setRate] = useState(null);
  const [countryCodeList, setCountryCodeList] = useState([]);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [fromCountry, setFromCountry] = useState(null);
  const [toCountry, setToCountry] = useState(null);
  const [chartDate, setChartDate] = useState(() => getDate());

  // Memoize currency data instance to avoid unnecessary recreations
  const currencyData = useMemo(
    () => new Currency(from, to, amount, chartDate),
    [from, to, amount, chartDate]
  );

  // Fetch historical rate data when chartDate changes
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await currencyData.getHistoryRate();
      setIsLoading(false);
    }
    getData();
  }, [chartDate]);

  // Fetch list of country codes once on currencyData change
  useEffect(() => {
    let isMounted = true;
    async function getData() {
      try {
        setIsLoading(true);
        await currencyData.getCodes();
        if (isMounted) {
          setCountryCodeList(currencyData.code);
        }
      } catch (error) {
        console.error("Error fetching country codes:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    getData();
    return () => {
      isMounted = false;
    };
  }, [currencyData]);

  // Format country list with code, name, and flag emoji
  const countryList = Array.isArray(countryCodeList)
    ? countryCodeList.map((country) => ({
        code: country[0],
        name: country[1],
        flag: convertToFlag(country[0]),
      }))
    : [];

  // Calculate exchange rate for selected currencies and amount
  const calculateRate = async () => {
    try {
      setIsLoading(true);
      await currencyData.getCurrencyPairRate();
      setRate(currencyData.rate);
    } catch (error) {
      console.error("Error calculating rate:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        isLoading,
        countryList,
        amount,
        setAmount,
        rate,
        setRate,
        calculateRate,
        setFrom,
        setTo,
        fromCountry,
        setFromCountry,
        toCountry,
        setToCountry,
        setChartDate,
        chartDate,
        currencyData,
        setIsLoading,
        from,
        to,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

function useCurrencyData() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error(
      "CurrencyContext is used outside the CurrencyContext provider"
    );
  }
  return context;
}

export { CurrencyDataProvider, useCurrencyData };
