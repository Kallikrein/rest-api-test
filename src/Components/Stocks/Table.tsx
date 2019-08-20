import React from "react";
import {
  TableBody,
  TableHead,
  TableCell,
  Table,
  TableRow,
  Box
} from "@material-ui/core";
import { StockDispatch, Stocks } from "store/Stocks";

import { EditableStock } from "./EditableStock";

export const StocksTable: React.FC<{
  stocks: Stocks;
  dispatch: StockDispatch;
}> = ({ stocks, dispatch }) => (
  <Box overflow="scroll">
    <Table size="small" padding="none">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell align="center">Stock</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stocks.map((stock, key) => (
          <TableRow key={key}>
            <TableCell variant="head">
              {new Date(stock.timestamp).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <EditableStock dispatch={dispatch} stock={stock} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
);
