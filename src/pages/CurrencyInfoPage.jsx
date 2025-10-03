import React, { useMemo } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrencyData } from "../contexts/CurrencyContext";

function CurrencyInfoPage() {
  const navigate = useNavigate();
  const { code: countryCode } = useParams();
  const { currencyData } = useCurrencyData();

  const selectedCurrencyInfo = useMemo(() => {
    return currencyData.currencyInfo.find(
      (currency) => currency.currency.code === countryCode
    );
  }, [countryCode, currencyData]);

  if (!selectedCurrencyInfo) {
    return (
      <div className="p-5 text-center text-text-light">
        Currency information not found.
      </div>
    );
  }

  const {
    name,
    code,
    symbol,
    description,
    nicknames,
    iso4217Code,
    centralBank,
    subunits,
    denominations,
    countriesUsing,
    currenciesPegged,
    peggedTo,
    flag,
  } = selectedCurrencyInfo.currency;

  const flexStyle = "flex items-center justify-center gap-3";

  return (
    <div className="py-2 relative">
      <section className="flex items-center gap-2 font-semibold mt-9 sm:mt-7">
        <div className="flex gap-2 items-center">
          <button
            className="flex items-center gap-2 hover:underline hover:text-brand"
            onClick={() => navigate(-1)}
          >
            <p>Info Card</p>
            <FaChevronRight />
          </button>
          <button className="flex items-center gap-2 hover:underline hover:text-brand">
            <p>Currency Info</p>
            <FaChevronRight />
          </button>
        </div>
      </section>

      <div className="grid gap-3 mt-6 border-2 p-5 border-border rounded-xl bg-primary-hover-dark">
        <header className="flex items-center justify-between font-bold md:text-2xl text-lg">
          <h2>{name}</h2>
          <h2>
            {flag} {code}
          </h2>
        </header>
        <div className={`mt-2 ${flexStyle}`}>
          <p className="text-text-light">{description}</p>
        </div>

        <div className="grid md:grid-cols-2">
          <div className={`mt-2 ${flexStyle}`}>
            <h2 className="text-base font-semibold text-primary">Symbols:</h2>
            <p className="text-text-light">{symbol}</p>
          </div>
          <div className={`mt-2 ${flexStyle}`}>
            <h2 className="text-base font-semibold text-primary">Nicknames:</h2>
            <p className="text-text-light">{nicknames}</p>
          </div>
          <div className={`mt-2 ${flexStyle}`}>
            <h2 className="text-base font-semibold text-primary">ISO 4217 Code:</h2>
            <p className="text-text-light">{iso4217Code}</p>
          </div>
          <div className={`mt-2 ${flexStyle}`}>
            <h2 className="text-base font-semibold text-primary">Central Bank:</h2>
            <p className="text-text-light">{centralBank}</p>
          </div>
          <div className={`mt-2 ${flexStyle}`}>
            <h2 className="text-base font-semibold text-primary">Currency Subunits :</h2>
            <p className="text-text-light">
              {subunits.name} = {subunits.value}
            </p>
          </div>
          <div className={`mt-2 ${flexStyle}`}>
            <h2 className="text-base font-semibold text-primary">Banknotes:</h2>
            <p className="text-text-light">{denominations.banknotes.join(", ")}</p>
          </div>
          <div className={`mt-2 ${flexStyle}`}>
            <h2 className="text-base font-semibold text-primary">Coins:</h2>
            <p className="text-text-light">{denominations.coins.join(", ")}</p>
          </div>
          <div className={`mt-2 ${flexStyle}`}>
            <h2 className="text-base font-semibold text-primary">
              Countries Using This Currency :
            </h2>
            <p className="list-disc list-inside text-secondary">
              {countriesUsing.join(", ")}
            </p>
          </div>
          <div className={`mt-2 ${flexStyle}`}>
            <h2 className="text-base font-semibold text-primary">
              Currencies Pegged to {code} :
            </h2>
            <p className="list-disc list-inside text-secondary">
              {currenciesPegged.join(", ")}
            </p>
          </div>
          <div className={`mt-2 ${flexStyle}`}>
            <h2 className="text-base font-semibold text-primary">AUD is Pegged to :</h2>
            <p className="text-text-light">{peggedTo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrencyInfoPage;
