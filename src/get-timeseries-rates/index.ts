/* node modules */
import { TPeriod, TTimeSeriesRates } from "../types/index.js";

/* app imports */
import { API_ROOT } from "../shared/index.js";
import validateAndFormatDate from "../shared/validate-and-format-date.js";
import dayjs from "dayjs";

/* types */
type TInput = { base: string, symbols?: string[], start: TPeriod, end: TPeriod };
type TOutput = TTimeSeriesRates;

/* module */
async function getTimeSeriesRates(props: TInput): Promise<TOutput> {
  /* props - destruct */
  const { base, symbols, start, end } = props;

  /* get: dates */
  const startDt: string = validateAndFormatDate(start);
  const endDt: string = validateAndFormatDate(end);

  if (dayjs(startDt).isAfter(dayjs(endDt))) {
    throw new Error("Date Input Validation: Start Date cannot be after End Date!");
  } else {
    /* setup: url */
    const params = new URLSearchParams({ base });
    if (symbols && symbols.length > 0) {
      params.set("symbols", symbols.join(","));
    }
    const API_URL = `${API_ROOT}/v1/${startDt}..${endDt}?${params.toString()}`;

    /* fetch */
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("frankfurter-api-dev-client: get timeseries rates error");
    } else {
      return response.json();
    }
  }
}

/* exports */
export { getTimeSeriesRates };
