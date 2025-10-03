import React, { useEffect, useState, useMemo } from "react";
import CurrencyInfoCard from "../components/CurrencyInfoCard";
import CurrencyList from "../components/CurrencyList";
import { useCurrencyData } from "../contexts/CurrencyContext";
import Loader from "../components/Loader";

function CurrencyCardPage() {
  const [currencyInfoData, setCurrencyInfoData] = useState([]);
  const { currencyData, isLoading, setIsLoading } = useCurrencyData();

  // Fetch currency info data on mount or when currencyData changes
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await currencyData.getCurrencyInfo();
      setCurrencyInfoData(currencyData.currencyInfo);
      setIsLoading(false);
    }
    getData();
  }, [currencyData, setIsLoading]);

  // Memoize first two items to optimize rendering
  const slicedCurrencyData = useMemo(
    () => currencyInfoData.slice(0, 2),
    [currencyInfoData]
  );

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Display top 2 currency info cards */}
          <div className="md:grid md:grid-cols-2 md:gap-6 mt-1">
            {slicedCurrencyData.map((currency) => (
              <CurrencyInfoCard
                key={currency.currency.code}
                flag={currency.currency.flag}
                code={currency.currency.code}
                name={currency.currency.name}
                summary={currency.currency.description}
              />
            ))}
          </div>

          {/* Display full currency list */}
          <div>
            <CurrencyList onCurrencyInfoData={currencyInfoData} />
          </div>
        </>
      )}
    </div>
  );
}

export default CurrencyCardPage;
