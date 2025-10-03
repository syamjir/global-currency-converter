import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useCurrencyData } from "../contexts/CurrencyContext";
import useGetWindowSize from "../hooks/useGetWindowSize";

function CountrySelect({ onSetFrom, onSetTo, onFromCountry, onToCountry }) {
  // State to manage selected country, dropdown open, and search input
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState("");
  const [searchedCountry, setSearchedCountry] = useState([]);
  const selectRef = useRef();

  const { countryList, setToCountry, setFromCountry } = useCurrencyData();

  // Initialize selected country when from/to country prop changes
  useEffect(() => {
    if (onFromCountry) {
      setSelectedCountry(onFromCountry);
    } else if (onToCountry) {
      setSelectedCountry(onToCountry);
    }
  }, [onFromCountry, onToCountry]);

  // Close dropdown if clicked outside component
  useEffect(() => {
    function handleClick(e) {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
        setIsSearch("");
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Filter countries based on search input
  useEffect(() => {
    const filteredCountries = countryList.filter((country) =>
      country.code.toLowerCase().includes(isSearch.toLowerCase()) ||
      country.name.toLowerCase().includes(isSearch.toLowerCase())
    );
    setSearchedCountry(filteredCountries);
  }, [isSearch, countryList]);

  // If no search results show 'No results found' message
  const countries =
    searchedCountry.length === 0
      ? [{ name: "No results found !" }]
      : searchedCountry.length > 0
        ? searchedCountry
        : countryList;

  // Handle selecting a country and updating context & parent callbacks
  const handleSelectCountry = (country) => {
    if (onSetFrom) {
      setFromCountry(country);
    } else if (onSetTo) {
      setToCountry(country);
    }
    onSetFrom ? onSetFrom(country.code) : onSetTo(country.code);
    setIsOpen(false);
  };

  // Custom hook to get window width for responsive truncation
  const windowSize = useGetWindowSize();

  // Trim country name for smaller screens
  const trimCountryName = (name) => {
    if (name?.length > 12) {
      if (windowSize < 400) return `${name.slice(0, 8)}...`;
      if (windowSize < 850) return `${name.slice(0, 13)}...`;
    }
    return name;
  };

  return (
    <div className="relative inline-block w-full text-xl" ref={selectRef}>
      {/* Selected country button */}
      <div className="flex border-2 border-bg_secondary gap-2 px-4 py-1 items-center bg-text-white rounded justify-center ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 w-full h-12 "
        >
          {selectedCountry ? (
            <>
              <span>{selectedCountry.flag}</span>
              <span className="font-extrabold text-red-500">{selectedCountry.code}</span>
              <span>{trimCountryName(selectedCountry.name)}</span>
            </>
          ) : (
            "Select a country"
          )}
        </button>
        {/* Clear selection button */}
        {selectedCountry && (
          <button
            onClick={() => {
              setSelectedCountry(null);
              setIsOpen(false);
            }}
            className="hover:bg-secondary hover:text-dark rounded-full px-2"
          >
            &times;
          </button>
        )}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 mt-1  bg-light border-border rounded shadow-lg w-full">
          {/* Search input */}
          <div className="grid grid-cols-[auto_1fr] p-1 gap-3 items-center border-none  pl-3">
            <FaSearch />
            <input
              type="text"
              className="bg-grey-100 rounded text-dark px-2  outline-none w-full"
              placeholder="Search..."
              maxLength={20}
              value={isSearch}
              onChange={(e) => setIsSearch(e.target.value)}
            />
          </div>
          {/* Country list */}
          <div className="max-h-36 overflow-y-auto">
            {countries.map((country) => (
              <div
                key={country.code || Date.now()}
                onClick={() => handleSelectCountry(country)}
                className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-secondary hover:text-dark"
              >
                <span>{country.flag}</span>
                <span className="font-bold text-red-500">{country.code}</span>
                <span className={`${country.name === "No results found !" ? "text-base text-text-light" : ""}`}>
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
