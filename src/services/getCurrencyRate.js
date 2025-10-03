// API keys and base URL for currency data
const API_KEY = '72dcb31cb68715c4e21c3408';
const API_KEY_FIXER = '675b69c963a65625a9a4b5913fbd8a5a';
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

// Currency class to handle fetching and storing exchange-related data
export class Currency {
  #from;
  #to;
  #amount;
  #date;

  constructor(from, to, amount, date) {
    this.#from = from;
    this.#to = to;
    this.#amount = amount;
    this.#date = date;

    this.rate = 0;               // Latest exchange rate
    this.code = [];              // Supported currency codes
    this.chartData = [];         // Historical rate data
    this.currencyInfo = [];      // Static info (e.g., currency names)
  }

  // Fetch real-time exchange rate between two currencies
  async getCurrencyPairRate() {
    try {
      const res = await fetch(
        `${BASE_URL}/${API_KEY}/pair/${this.#from}/${this.#to}/${this.#amount}`
      );
      if (!res.ok) throw new Error(`Error: ${res.statusText}`);

      const data = await res.json();
      this.rate = data.conversion_result;
    } catch (err) {
      console.error("Failed to fetch currency rate:", err);
    }
  }

  // Fetch supported currency codes
  async getCodes() {
    try {
      const res = await fetch(`${BASE_URL}/${API_KEY}/codes`);
      if (!res.ok) throw new Error(`Error: ${res.statusText}`);

      const code = await res.json();
      this.code = code.supported_codes;
    } catch (err) {
      console.error("Failed to fetch currency codes:", err);
    }
  }

  // Fetch historical exchange rates for the specified date
  async getHistoryRate() {
    try {
      const res = await fetch(
        `http://data.fixer.io/api/${this.#date}?access_key=${API_KEY_FIXER}`
      );
      if (!res.ok) throw new Error(`Error: ${res.statusText}`);

      const data = await res.json();
      this.chartData = Object.entries(data.rates).map(([key, value]) => ({
        code: key,
        rate: value,
      }));
    } catch (err) {
      console.error("Failed to fetch conversion rate:", err);
    }
  }

  // Load static currency metadata (e.g., symbols, country info)
  async getCurrencyInfo() {
    try {
      const res = await fetch("/currencyInfo.json");
      if (!res.ok) throw new Error("Error: Data fetch error");

      const data = await res.json();
      this.currencyInfo = data;
    } catch (err) {
      console.error("Failed to fetch currency info", err);
    }
  }
}
