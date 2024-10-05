import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useCurrencyData } from "../contexts/CurrencyContext";

function CountrySelect({ onsetFrom, onSetTo, onFromCountry, onToCountry }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState("");
  const [searchedCountry, setSearchedCountry] = useState([]);
  const selectRef = useRef();

  const { countryList, setToCountry, setFromCountry } = useCurrencyData();
  useEffect(() => {
    if (onFromCountry) {
      setSelectedCountry(onFromCountry);
    } else if (onToCountry) {
      setSelectedCountry(onToCountry);
    }
  }, [onFromCountry, onToCountry]);

  useEffect(() => {
    function handleClick(e) {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
        setIsSearch("");
      }
    }
    document.addEventListener("click", handleClick);
    return function () {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    let filteredCountries = countryList.filter((country) => {
      return (
        country.code.toLowerCase().includes(isSearch.toLowerCase()) ||
        country.name.toLowerCase().includes(isSearch.toLowerCase())
      );
    });

    setSearchedCountry(filteredCountries);
  }, [isSearch]);
  const countries =
    searchedCountry.length === 0
      ? [{ name: "No results found !" }]
      : searchedCountry.length > 0
      ? searchedCountry
      : countryList;
  const handleSelectCountry = (country) => {
    // setSelectedCountry(country);
    if (onsetFrom) {
      setFromCountry(country);
    } else if (onSetTo) {
      setToCountry(country);
    }

    onsetFrom ? onsetFrom(country.code) : onSetTo(country.code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full text-xl" ref={selectRef}>
      <div className="flex border-2 border-primary gap-2 px-4 py-1 items-center bg-text-white rounded justify-center ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 w-full h-12 "
        >
          {selectedCountry ? (
            <>
              <span>{selectedCountry.flag}</span>
              <span className="font-extrabold text-red-500">
                {selectedCountry.code}
              </span>
              <span>{selectedCountry.name}</span>
            </>
          ) : (
            "Select a country"
          )}
        </button>
        {selectedCountry && (
          <button
            onClick={() => {
              setSelectedCountry(null);
              setIsOpen(false);
            }}
            className="hover:bg-gray-100 rounded-full px-2"
          >
            &times;
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 bg-text-white border rounded shadow-lg w-full">
          <div className="grid grid-cols-[auto_1fr] p-1 gap-3 items-center border-2 border-primary-hover-light pl-3">
            <FaSearch />
            <input
              type="text"
              className="bg-grey-100 outline-none w-full"
              placeholder="Search..."
              maxLength={20}
              value={isSearch}
              onChange={(e) => setIsSearch(e.target.value)}
            />
          </div>
          <div className="max-h-36 overflow-y-auto">
            {countries.map((country) => (
              <div
                key={country.code || Date.now()}
                onClick={() => handleSelectCountry(country)}
                className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#fff9e9]"
              >
                <span>{country.flag}</span>
                <span className="font-bold text-red-500">{country.code}</span>
                <span
                  className={`${
                    country.name === "No results found"
                      ? "text-base text-text-light"
                      : ""
                  }`}
                >
                  {country.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CountrySelect;
