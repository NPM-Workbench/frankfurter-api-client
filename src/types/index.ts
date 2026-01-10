export type TSupportedCurrencies = {[code: string]: string};
export type TLatestRates = {
  base: string,
  date: string,
  amount: number,
  rates: Record<string, number>,
};
export type TPeriod = {date: number, month: number, year: number};
export type THistoricalRates = TLatestRates;
