const API_KEY = "";
const API_KEY_FIXER = "";
const BASE_URL = "";

export class Currency {
  #from;
  #to;
  #amount;
  #date;
  constructor(from, to, amount, date) {
    this.#from = from;
    this.#to = to;
    this.#amount = amount;
    this.rate = 0;
    this.code = [];
    this.#date = date;
    this.chartData = [];
    this.currencyInfo = [];
  }

  async getCurrencyPairRate() {
    try {
      const res = await fetch(
        `${BASE_URL}/${API_KEY}/pair/${this.#from}/${this.#to}/${this.#amount}`
      );
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      const data = await res.json();
      this.rate = data.conversion_result;
    } catch (err) {
      console.error("Failed to fetch currency rate:", err);
    }
  }
  async getCodes() {
    try {
      const res = await fetch(`${BASE_URL}/${API_KEY}/codes`);
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      const code = await res.json();
      this.code = code.supported_codes;
    } catch (err) {
      console.error("Failed to fetch currency rate:", err);
    }
  }
  async getHistoryRate() {
    try {
      const res = await fetch(
        `http://data.fixer.io/api/${this.#date}?access_key=${API_KEY_FIXER}`
      );
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      const data = await res.json();
      const result = Object.entries(data.rates).map(([key, value]) => ({
        code: key,
        rate: value,
      }));
      this.chartData = result;
      console.log(result);
    } catch (err) {
      console.error("Failed to fetch conversion rate:", err);
    }
  }
  async getCurrencyInfo() {
    try {
      const res = await fetch("/currencyInfo.json");
      if (!res.ok) {
        throw new Error("Error: Data fetch error");
      }
      const data = await res.json();
      this.currencyInfo = data;
    } catch (err) {
      console.error("Failed to fetch currency info", err);
    }
  }
}
