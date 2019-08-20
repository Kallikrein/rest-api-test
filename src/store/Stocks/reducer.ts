import { Reducer } from "react";
import { StockState, StockActions } from "./typings";

export const defaultStocks: StockState = {
  data: [],
  fetchStatus: "INIT",
  dataSource: "none"
};

export const stockReducer: Reducer<StockState, StockActions> = (
  state = defaultStocks,
  action
) => {
  switch (action.type) {
    case "ADD_STOCKS":
      return { ...state, data: action.stocks, dataSource: action.dataSource };
    case "EDIT_STOCK":
      if (action.value === state.data[action.index].stocks) {
        return state;
      }
      const newStock = { ...state.data[action.index], stocks: action.value };
      const data = [...state.data];
      data[action.index] = newStock;
      return { ...state, data };
    case "FETCH_STOCKS_STATUS":
      return { ...state, fetchStatus: action.fetchStatus };
  }
  return state;
};
