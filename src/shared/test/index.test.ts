/// <reference types="jest" />
import { API_ROOT } from '../index.js';
import validateAndFormatDate from '../validate-and-format-date.js';

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe('shared', () => {
  /* #1 */
  test('API_ROOT points to frankfurter api base', () => {
    expect(API_ROOT).toBe('https://api.frankfurter.dev');
  });
});

describe('validateAndFormatDate', () => {
  /* #2 */
  test('returns YYYY-MM-DD for valid date', () => {
    const res = validateAndFormatDate({ year: 2020, month: 1, date: 2 });
    expect(res).toBe('2020-01-02');
  });

  /* #3 */
  test('throws for invalid year', () => {
    expect(() =>
      validateAndFormatDate({ year: 1800, month: 1, date: 1 }),
    ).toThrow('Date Input Validation: Invalid Year');
  });

  /* #4 */
  test('throws for invalid month', () => {
    expect(() =>
      validateAndFormatDate({ year: 2020, month: 13, date: 1 }),
    ).toThrow('Date Input Validation: Invalid Month');
  });

  /* #5 */
  test('throws for invalid date', () => {
    expect(() =>
      validateAndFormatDate({ year: 2020, month: 1, date: 32 }),
    ).toThrow('Date Input Validation: Invalid Date');
  });

  /* #6 */
  test('throws for date after today', () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    const run = () =>
      validateAndFormatDate({
        year: tomorrow.getFullYear(),
        month: tomorrow.getMonth() + 1,
        date: tomorrow.getDate(),
      });

    if (tomorrow.getFullYear() !== now.getFullYear()) {
      expect(run).toThrow('Date Input Validation: Invalid Year');
    } else {
      expect(run).toThrow(
        'Date Input Validation: Cannot be Greater than Today!',
      );
    }
  });

  /* #7 */
  test('throws for future year', () => {
    const nextYear = new Date().getFullYear() + 1;
    expect(() =>
      validateAndFormatDate({ year: nextYear, month: 1, date: 1 }),
    ).toThrow('Date Input Validation: Invalid Year');
  });
});
