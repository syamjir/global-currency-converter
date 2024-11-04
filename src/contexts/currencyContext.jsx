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
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(1);
  const [rate, setRate] = useState(null);
  const [countryCodeList, setCountryCodeList] = useState([]);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [fromCountry, setFromCountry] = useState(null);
  const [toCountry, setToCountry] = useState(null);
  const [chartDate, setChartDate] = useState(() => getDate());

  // Memoize currencyData creation
  const currencyData = useMemo(
    () => new Currency(from, to, amount, chartDate),
    [from, to, amount, chartDate]
  );
  // For chart data
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await currencyData.getHistoryRate();
      setIsLoading(false);
    }
    getData();
  }, [chartDate]);

  // Set country code list
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

  // Generate country list with flags
  const countryList = countryCodeList.map((country) => ({
    code: country[0],
    name: country[1],
    flag: convertToFlag(country[0]),
  }));

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
      "CurrencyContext is used outside the CurrencyContext provider "
    );
  }
  return context;
}

export { CurrencyDataProvider, useCurrencyData };
