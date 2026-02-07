/// <reference types="jest" />
import { getHistoricalRatesForDate } from "../index.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("getHistoricalRatesForDate", () => {
  const originalFetch = (global as any).fetch;

  afterEach(() => {
    if (originalFetch) (global as any).fetch = originalFetch;
    else delete (global as any).fetch;
    jest.restoreAllMocks();
  });

  /* #1 */
  test("throws when fetch response is not ok", async () => {
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      getHistoricalRatesForDate({
        base: "USD",
        period: { year: 2020, month: 1, date: 2 }
      })
    ).rejects.toThrow(
      "frankfurter-api-dev-client: get historical rates for date error"
    );
  });

  /* #2 */
  test("returns payload when response ok", async () => {
    const mockPayload = { base: "USD", rates: { EUR: 0.9 }, date: "2020-01-02" };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockPayload)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      getHistoricalRatesForDate({
        base: "USD",
        period: { year: 2020, month: 1, date: 2 }
      })
    ).resolves.toEqual(mockPayload);
  });

  /* #3 */
  test("targets the historical endpoint with base only", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getHistoricalRatesForDate({
      base: "USD",
      period: { year: 2020, month: 1, date: 2 }
    });

    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://api.frankfurter.dev/v1/2020-01-02?base=USD"
    );
  });

  /* #4 */
  test("adds symbols when provided", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getHistoricalRatesForDate({
      base: "USD",
      symbols: ["EUR", "GBP"],
      period: { year: 2020, month: 1, date: 2 }
    });

    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://api.frankfurter.dev/v1/2020-01-02?base=USD&symbols=EUR%2CGBP"
    );
  });
});
