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

  console.log(selectedCurrencyInfo.currency);

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
    <div className="py-2 relative ">
      <section className="flex items-center gap-2 text-semibold mt-9  sm:mt-7 ">
        <div className="flex gap-2 items-center">
          <button
            className="flex items-center gap-2 hover:underline hover:decoration-blue-800 hover:text-blue-800"
            onClick={() => navigate(-1)}
          >
            <p>Info Card</p>
            <FaChevronRight />
          </button>
          <button className="flex items-center gap-2 hover:underline hover:decoration-blue-800 hover:text-blue-800">
            <p>Currency Info</p>
            <FaChevronRight />
          </button>
        </div>
      </section>

      <div className="grid gap-3 mt-6 border p-5 border-primary rounded-xl bg-primary-hover-dark ">
        <header
          className={`flex items-center justify-between font-bold md:text-2xl text-lg`}
        >
          <h2>{name}</h2>
          <h2>
            {flag} {code}
          </h2>
        </header>
        <div class={`mt-2 ${flexStyle}`}>
          <p class="text-text-light">{description}</p>
        </div>

        <div className="grid md:grid-cols-2 ">
          <div class={`mt-2 ${flexStyle}`}>
            <h2 class="text-base font-semibold text-text-dark">Symbols:</h2>
            <p class="text-text-light">{symbol}</p>
          </div>
          <div class={`mt-2 ${flexStyle}`}>
            <h2 class="text-base font-semibold text-text-dark">Nicknames:</h2>
            <p class="text-text-light">{nicknames}</p>
          </div>
          <div class={`mt-2 ${flexStyle}`}>
            <h2 class="text-base font-semibold text-text-dark">
              ISO 4217 Code:
            </h2>
            <p class="text-text-light">{iso4217Code}</p>
          </div>
          <div class={`mt-2 ${flexStyle}`}>
            <h2 class="text-base font-semibold text-text-dark">
              Central Bank:
            </h2>
            <p class="text-text-light">{centralBank}</p>
          </div>
          <div class={`mt-2 ${flexStyle}`}>
            <h2 class="text-base font-semibold text-text-dark">
              Currency Subunits :
            </h2>
            <p class="text-text-light">
              {subunits.name} = {subunits.value}
            </p>
          </div>
          <div class={`mt-2 ${flexStyle}`}>
            <h2 class="text-base font-semibold text-text-dark">Banknotes:</h2>
            <p class="text-text-light">{denominations.banknotes.join(", ")}</p>
          </div>
          <div class={`mt-2 ${flexStyle}`}>
            <h2 class="text-base font-semibold text-text-dark">Coins:</h2>
            <p class="text-text-light">{denominations.coins.join(", ")}</p>
          </div>
          <div class={`mt-2 ${flexStyle}`}>
            <h2 class="text-base font-semibold text-text-dark">
              Countries Using This Currency :
            </h2>
            <p class="list-disc list-inside text-gray-600">
              {countriesUsing.join(", ")}
            </p>
          </div>
          <div class={`mt-2 ${flexStyle}`}>
            <h2 class="text-base font-semibold text-text-dark">
              Currencies Pegged to {code} :
            </h2>
            <p class="list-disc list-inside text-gray-600">
              {currenciesPegged.join(", ")}
            </p>
          </div>
          <div class={`mt-2 ${flexStyle}`}>
            <h2 class="text-base font-semibold text-text-dark">
              AUD is Pegged to :
            </h2>
            <p class="text-text-light">{peggedTo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrencyInfoPage;
