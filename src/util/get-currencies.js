// These functions receive currency information
// from the "https://api.coingecko.com" API

import axios from "../api/axios";
import { delay } from "../util/delay";
import { currenciesData } from "./data/currencies-data";

export async function getCurrenciesInfo() {
  // const response = await axios.get("coingecko", {
  //   params: {
  //     _limit: 10,
  //   },
  // });
  // return response.data;
  const data = currenciesData;
  return data;
}

export async function getPaginatedCurrency(page) {
  const limit = 10;
  const response = await axios.get("coingecko", {
    params: {
      _limit: limit,
      _page: page,
    },
  });

  await delay(2000);

  const hasNext = page * limit < parseFloat(response.headers["x-total-count"]);
  return {
    currencies: response.data,
    nextPage: hasNext ? page + 1 : undefined,
    prevPage: page > 1 ? page - 1 : undefined,
  };
}
