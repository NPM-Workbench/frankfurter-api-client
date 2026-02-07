/// <reference types="jest" />
import { getSupportedCurrencies } from "../index.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("getSupportedCurrencies", () => {
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

    await expect(getSupportedCurrencies()).rejects.toThrow(
      "frankfurter-api-dev-client: get supported currencies error"
    );
  });

  /* #2 */
  test("returns payload when response ok", async () => {
    const mockPayload = { USD: "United States Dollar", EUR: "Euro" };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockPayload)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getSupportedCurrencies()).resolves.toEqual(mockPayload);
  });

  /* #3 */
  test("targets the currencies endpoint", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getSupportedCurrencies();
    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://api.frankfurter.dev/v1/currencies"
    );
  });
});
