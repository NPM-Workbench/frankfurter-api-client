/* app imports */
import { API_ROOT } from "../shared/index.js";
import { TLatestRates } from "../types/index.js";

/* types */
type TInput = {base: string, symbols?: string[]};
type TOutput = TLatestRates;

/* module */
async function getLatestRates(props: TInput): Promise<TOutput> {
  /* props - destruct */
  const { base, symbols } = props;

  /* setup */
  const params = new URLSearchParams({ base });
  if (symbols && symbols.length > 0) {
    params.set("symbols", symbols.join(","));
  }
  let API_URL = `${API_ROOT}/v1/latest?${params.toString()}`;

  /* fetch */
  const response = await fetch(API_URL);

  /* end */
  if (!response.ok) {
    throw new Error("frankfurter-api-dev-client: get latest rates error");
  } else {
    return response.json();
  }
}

/* exports */
export { getLatestRates };
