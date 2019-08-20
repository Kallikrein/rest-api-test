import React, { Dispatch, useCallback } from "react";
import { Stock, StockActions, editStock } from "store/Stocks";

interface EditableStockProps {
  stock: Stock;
  dispatch: Dispatch<StockActions>;
}

const useStock = (props: EditableStockProps) =>
  useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value) {
        props.dispatch(editStock(props.stock.index, event.target.value));
      }
    },
    [props]
  );

export const EditableStock: React.FC<EditableStockProps> = props => (
  <input
    style={{ textAlign: "right" }}
    type="number"
    value={props.stock.stocks}
    onChange={useStock(props)}
  />
);
