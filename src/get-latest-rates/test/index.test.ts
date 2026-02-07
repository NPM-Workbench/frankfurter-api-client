/// <reference types="jest" />
import { getLatestRates } from "../index.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("getLatestRates", () => {
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

    await expect(getLatestRates({ base: "USD" })).rejects.toThrow(
      "frankfurter-api-dev-client: get latest rates error"
    );
  });

  /* #2 */
  test("returns payload when response ok", async () => {
    const mockPayload = { base: "USD", rates: { EUR: 0.9 } };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockPayload)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getLatestRates({ base: "USD" })).resolves.toEqual(mockPayload);
  });

  /* #3 */
  test("targets the latest rates endpoint with base only", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getLatestRates({ base: "USD" });
    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://api.frankfurter.dev/v1/latest?base=USD"
    );
  });

  /* #4 */
  test("adds symbols when provided", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getLatestRates({ base: "USD", symbols: ["EUR", "GBP"] });
    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://api.frankfurter.dev/v1/latest?base=USD&symbols=EUR%2CGBP"
    );
  });
});
