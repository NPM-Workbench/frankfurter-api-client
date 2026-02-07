![banner-5](https://github.com/user-attachments/assets/269b7f19-b216-4177-8dbf-d78c706f2900)
![npm](https://img.shields.io/npm/v/frankfurter-api-client)
![downloads](https://img.shields.io/npm/dw/frankfurter-api-client)
![license](https://img.shields.io/npm/l/frankfurter-api-client)

# Frankfurter API Client

A lightweight, type-safe JavaScript/TypeScript client for the <b>Frankfurter Currency Exchange Rates API</b>, designed for developers who want clean abstractions, strong date validation, and a minimal API surface. This package wraps the Frankfurter API with strict input validation, predictable error handling, and zero runtime configuration.
<br/><br/>

### 📦 Installation

```console
npm install frankfurter-api-client
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
import { getLatestRates } from 'frankfurter-api-client';

const response = await getLatestRates({
  base: 'EUR',
  symbols: ['USD', 'INR'] /* symbols part in the input props is optional */,
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
import { getHistoricalRatesForDate } from 'frankfurter-api-client';

const data = await getHistoricalRatesForDate({
  base: 'USD',
  symbols: ['EUR', 'GBP'] /* symbols part in the input props is optional */,
  period: {
    year: 2023,
    month: 10 /* 1 (Jan) ... 12 (Dec), not indexed value */,
    date: 12 /* range between 1 and 31 */,
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
import { getTimeSeriesRates } from 'frankfurter-api-client';

const data = await getTimeSeriesRates({
  base: 'EUR',
  symbols: ['USD'] /* symbols part in the input props is optional */,
  start: {
    year: 2023,
    month: 1 /* 1 (Jan) ... 12 (Dec), not indexed value */,
    date: 1 /* range between 1 and 31 */,
  },
  end: {
    year: 2023,
    month: 1 /* 1 (Jan) ... 12 (Dec), not indexed value */,
    date: 5 /* range between 1 and 31 */,
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
import { getSupportedCurrencies } from 'frankfurter-api-client';
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

### 📗 Test Coverage

```
PASS src/get-supported-currencies/test/index.test.ts
  getSupportedCurrencies
    ✓ throws when fetch response is not ok
    ✓ returns payload when response ok
    ✓ targets the currencies endpoint

PASS src/get-latest-rates/test/index.test.ts
  getLatestRates
    ✓ throws when fetch response is not ok
    ✓ returns payload when response ok
    ✓ targets the latest rates endpoint with base only
    ✓ adds symbols when provided

PASS src/get-timeseries-rates/test/index.test.ts
  getTimeSeriesRates
    ✓ throws when start date is after end date
    ✓ throws when fetch response is not ok
    ✓ returns payload when response ok
    ✓ targets the timeseries endpoint with base only
    ✓ adds symbols when provided

PASS src/shared/test/index.test.ts
  shared
    ✓ API_ROOT points to frankfurter api base
  validateAndFormatDate
    ✓ returns YYYY-MM-DD for valid date
    ✓ throws for invalid year
    ✓ throws for invalid month
    ✓ throws for invalid date
    ✓ throws for date after today
    ✓ throws for future year

PASS src/get-historical-rates/test/index.test.ts
  getHistoricalRatesForDate
    ✓ throws when fetch response is not ok
    ✓ returns payload when response ok
    ✓ targets the historical endpoint with base only
    ✓ adds symbols when provided

Test Suites: 5 passed, 5 total
Tests:       23 passed, 23 total
Snapshots:   0 total
```

```
------------------------------|---------|----------|---------|---------|-------------------
File                          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------------------|---------|----------|---------|---------|-------------------
All files                     |   99.43 |    96.77 |     100 |   99.43 |
 get-historical-rates         |     100 |      100 |     100 |     100 |
  index.ts                    |     100 |      100 |     100 |     100 |
 get-latest-rates             |     100 |      100 |     100 |     100 |
  index.ts                    |     100 |      100 |     100 |     100 |
 get-supported-currencies     |     100 |      100 |     100 |     100 |
  index.ts                    |     100 |      100 |     100 |     100 |
 get-timeseries-rates         |     100 |      100 |     100 |     100 |
  index.ts                    |     100 |      100 |     100 |     100 |
 shared                       |    97.5 |     90.9 |     100 |    97.5 |
  index.ts                    |     100 |      100 |     100 |     100 |
  validate-and-format-date.ts |   97.43 |     90.9 |     100 |   97.43 | 29
------------------------------|---------|----------|---------|---------|-------------------
```

### 📘 Contributing

Contributions, suggestions, and improvements are welcome.<br/>
Feel free to open issues or pull requests.

### ❤️ Support

Like this project? Support it with a github star, it would mean a lot to me! Cheers and Happy Coding.
