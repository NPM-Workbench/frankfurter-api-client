/* node modules */
import { TPeriod, THistoricalRates } from "../types/index.js";

/* app imports */
import { API_ROOT } from "../shared/index.js";
import validateAndFormatDate from "../shared/validate-and-format-date.js";

/* types */
type TInput = { base: string, symbols?: string[], period: TPeriod };
type TOutput = THistoricalRates;

/* module */
async function getHistoricalRatesForDate(props: TInput): Promise<TOutput> {
  /* props - destruct */
  const { base, symbols, period } = props;

  /* setup */
  const dateStr = validateAndFormatDate(period);
  const params = new URLSearchParams({ base });
  if (symbols && symbols.length > 0) {
    params.set("symbols", symbols.join(","));
  }
  const API_URL = `${API_ROOT}/v1/${dateStr}?${params.toString()}`;

  /* fetch */
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("frankfurter-api-dev-client: get historical rates for date error");
  } else {
    return response.json();
  }
}

/* exports */
export { getHistoricalRatesForDate };
