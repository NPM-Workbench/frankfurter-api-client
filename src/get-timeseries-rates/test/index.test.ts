/// <reference types="jest" />
import { getTimeSeriesRates } from '../index.js';

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe('getTimeSeriesRates', () => {
  const originalFetch = (global as any).fetch;

  afterEach(() => {
    if (originalFetch) (global as any).fetch = originalFetch;
    else delete (global as any).fetch;
    jest.restoreAllMocks();
  });

  /* #1 */
  test('throws when start date is after end date', async () => {
    await expect(
      getTimeSeriesRates({
        base: 'USD',
        start: { year: 2020, month: 2, date: 2 },
        end: { year: 2020, month: 1, date: 2 },
      }),
    ).rejects.toThrow(
      'Date Input Validation: Start Date cannot be after End Date!',
    );
  });

  /* #2 */
  test('throws when fetch response is not ok', async () => {
    const mockResponse = {
      ok: false,
      json: jest.fn().mockResolvedValue({}),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      getTimeSeriesRates({
        base: 'USD',
        start: { year: 2020, month: 1, date: 1 },
        end: { year: 2020, month: 1, date: 2 },
      }),
    ).rejects.toThrow('frankfurter-api-dev-client: get timeseries rates error');
  });

  /* #3 */
  test('returns payload when response ok', async () => {
    const mockPayload = {
      base: 'USD',
      start_date: '2020-01-01',
      end_date: '2020-01-02',
      rates: { '2020-01-01': { EUR: 0.9 } },
    };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockPayload),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      getTimeSeriesRates({
        base: 'USD',
        start: { year: 2020, month: 1, date: 1 },
        end: { year: 2020, month: 1, date: 2 },
      }),
    ).resolves.toEqual(mockPayload);
  });

  /* #4 */
  test('targets the timeseries endpoint with base only', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getTimeSeriesRates({
      base: 'USD',
      start: { year: 2020, month: 1, date: 1 },
      end: { year: 2020, month: 1, date: 2 },
    });

    expect((global as any).fetch).toHaveBeenCalledWith(
      'https://api.frankfurter.dev/v1/2020-01-01..2020-01-02?base=USD',
    );
  });

  /* #5 */
  test('adds symbols when provided', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getTimeSeriesRates({
      base: 'USD',
      symbols: ['EUR', 'GBP'],
      start: { year: 2020, month: 1, date: 1 },
      end: { year: 2020, month: 1, date: 2 },
    });

    expect((global as any).fetch).toHaveBeenCalledWith(
      'https://api.frankfurter.dev/v1/2020-01-01..2020-01-02?base=USD&symbols=EUR%2CGBP',
    );
  });
});
