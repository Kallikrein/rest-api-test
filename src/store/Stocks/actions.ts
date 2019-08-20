import { Stocks, FetchStocksStatus, StocksDataSource } from "./typings";

export function addStocks(stocks: Stocks, dataSource: StocksDataSource) {
  return { type: "ADD_STOCKS", stocks, dataSource } as const;
}

export function editStock(index: number, value: string) {
  return { type: "EDIT_STOCK", index, value } as const;
}

export function fetchStocksStatus(fetchStatus: FetchStocksStatus) {
  return { type: "FETCH_STOCKS_STATUS", fetchStatus } as const;
}
