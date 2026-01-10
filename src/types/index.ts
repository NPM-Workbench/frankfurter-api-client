export type TSupportedCurrencies = {[code: string]: string};
export type TLatestRates = {
  base: string,
  date: string,
  amount: number,
  rates: Record<string, number>,
};
