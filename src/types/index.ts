export type TSupportedCurrencies = {[code: string]: string};
export type TLatestRates = {
  base: string,
  date: string,
  amount: number,
  rates: Record<string, number>,
};
export type TPeriod = {date: number, month: number, year: number};
export type THistoricalRates = TLatestRates;
export type TTimeSeriesRates = {
  amount: number,
  base: string,
  start_date: string,
  end_date: string,
  rates: Record<string, Record<string, number>>
};
