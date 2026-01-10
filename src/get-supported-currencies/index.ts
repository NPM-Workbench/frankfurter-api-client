/* app imports */
import { API_ROOT } from "../shared/index.js";
import { TSupportedCurrencies } from "../types/index.js";

/* types */
type TOutput = TSupportedCurrencies;

/* module */
async function getSupportedCurrencies(): Promise<TOutput> {
  /* setup */
  const API_URL = `${API_ROOT}/v1/currencies`;

  /* fetch */
  const response = await fetch(API_URL);

  /* end */
  if (!response.ok) {
    throw new Error("frankfurter-api-dev-client: get supported currencies error");
  } else {
    return response.json();
  }
}

/* exports */
export { getSupportedCurrencies };
