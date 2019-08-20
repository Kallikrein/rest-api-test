import { Dispatch } from "react";
import * as stockActionCreators from "./actions";

export interface Stock {
  index: number;
  stocks: string;
  timestamp: string;
}
export type Stocks = Stock[];

export interface StockState {
  fetchStatus: FetchStocksStatus;
  dataSource: StocksDataSource;
  data: Stocks;
}

// util
type ActionsFromActionCreators<
  AC extends Record<string, (...a: any[]) => void>
> = ReturnType<AC[keyof AC]>;

export type StockActions = ActionsFromActionCreators<
  typeof stockActionCreators
>;

export type StockDispatch = Dispatch<StockActions>;

export type FetchStocksStatus = "INIT" | "START" | "TIMEOUT" | "ERROR" | "DONE";

export type StocksDataSource = "none" | "localstorage" | "api";
