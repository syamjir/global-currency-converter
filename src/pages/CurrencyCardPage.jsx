import React, { useEffect, useState, useMemo } from "react";
import CurrencyInfoCard from "../components/CurrencyInfoCard";
import CurrencyList from "../components/CurrencyList";
import { useCurrencyData } from "../contexts/CurrencyContext";
import Loader from "../components/Loader";

function CurrencyCardPage() {
  const [currencyInfoData, setCurrencyInfoData] = useState([]);
  const { currencyData, isLoading, setIsLoading } = useCurrencyData();

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await currencyData.getCurrencyInfo();
      setCurrencyInfoData(currencyData.currencyInfo);
      setIsLoading(false);
    }
    getData();
  }, [currencyData, setIsLoading]);

  // Use useMemo to memoize the sliced data
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
          <div>
            <CurrencyList onCurrencyInfoData={currencyInfoData} />
          </div>
        </>
      )}
    </div>
  );
}

export default CurrencyCardPage;
