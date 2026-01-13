![banner-5](https://github.com/user-attachments/assets/269b7f19-b216-4177-8dbf-d78c706f2900)
# Frankfurter API Dev Client
A lightweight, type-safe JavaScript/TypeScript client for the <b>Frankfurter Currency Exchange Rates API</b>, designed for developers who want clean abstractions, strong date validation, and a minimal API surface. This package wraps the Frankfurter API with strict input validation, predictable error handling, and zero runtime configuration.
<br/><br/>
### 📦 Installation
```console
npm install frankfurter-api-dev-client
```
Note: This client is powered by the official [Frankfurter API](https://frankfurter.dev/). No API Keys are required.

### 📘 Features
1. TypeScript-first with full type definitions
2. Strict date validation (including leap years & future dates)
3. Supports historical rates and time-series queries
4. Minimal dependencies: dayjs only
5. Clean, promise-based API - Works in both Node.js and modern browsers

### 🔤 Example Usage
1. Get Latest Exchange Rates
```javascript
import { getLatestRates } from "frankfurter-api-dev-client";

const response = await getLatestRates({
  base: "EUR",
  symbols: ["USD", "INR"], /* symbols part in the input props is optional */
});

/*
{
  base: "EUR",
  date: "2025-01-10",
  rates: {
    USD: 1.09,
    INR: 90.42,
    ...
  }
}
*/
```
2. Get Historical Rates for a Specific Date
```javascript
import { getHistoricalRatesForDate } from "frankfurter-api-dev-client";

const data = await getHistoricalRatesForDate({
  base: "USD",
  symbols: ["EUR", "GBP"], /* symbols part in the input props is optional */
  period: {
    year: 2023,
    month: 10, /* 1 (Jan) ... 12 (Dec), not indexed value */
    date: 12, /* range between 1 and 31 */
  },
});

/*
{
  base: "USD",
  date: "2023-10-12",
  rates: {
    EUR: 0.94,
    GBP: 0.82,
    ...
  }
}
*/
```
3. Get Time Series Rates Between Two Dates
```javascript
import { getTimeSeriesRates } from "frankfurter-api-dev-client";

const data = await getTimeSeriesRates({
  base: "EUR",
  symbols: ["USD"], /* symbols part in the input props is optional */
  start: {
    year: 2023,
    month: 1, /* 1 (Jan) ... 12 (Dec), not indexed value */
    date: 1, /* range between 1 and 31 */
  },
  end: {
    year: 2023,
    month: 1, /* 1 (Jan) ... 12 (Dec), not indexed value */
    date: 5, /* range between 1 and 31 */
  },
});

/*
{
  base: "EUR",
  start_date: "2023-01-01",
  end_date: "2023-01-05",
  rates: {
    "2023-01-01": { USD: 1.07 },
    "2023-01-02": { USD: 1.06 },
    "2023-01-03": { USD: 1.05 }
    ...
    ...
  }
}
*/
```
4. Get Supported Currencies
```javascript
import { getSupportedCurrencies } from "frankfurter-api-dev-client";
const data = await getSupportedCurrencies(); /* no input props required */
/*
{
  USD: "United States Dollar",
  EUR: "Euro",
  GBP: "British Pound Sterling",
  INR: "Indian Rupee",
  ...
  ...
}
*/
```

### 📘  Contributing
Contributions, suggestions, and improvements are welcome.<br/>
Feel free to open issues or pull requests.

### ❤️ Support
Like this project? Support it with a github star, it would mean a lot to me! Cheers and Happy Coding.
