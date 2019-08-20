import React from "react";
import { ajax } from "rxjs/ajax";
import { CssBaseline, Grid, Box, AppBar, Toolbar } from "@material-ui/core";

import { persist } from "./localStoragePersistance";
import {
  StocksWidget,
  StockGraph,
  StocksTable,
  stocksHook
} from "Components/Stocks";
import { Stocks } from "store/Stocks";

const useStocks = stocksHook(
  ajax.getJSON("/stocks?_limit=20"),
  persist<Stocks>("stocks"),
  1000
);

const App: React.FC = () => {
  const [stockState, stockDispatch] = useStocks();
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          Source: {stockState.dataSource} / Request Status:&nbsp;
          {stockState.fetchStatus}
          {stockState.fetchStatus === "ERROR" ||
          stockState.fetchStatus === "TIMEOUT" ? (
            <>
              <br />
              Le service est momentanément indisponible
            </>
          ) : null}
        </Toolbar>
      </AppBar>
      <Box padding={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={9}>
            <StocksWidget>
              <StockGraph stocks={stockState.data} />
            </StocksWidget>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <StocksWidget>
              <StocksTable stocks={stockState.data} dispatch={stockDispatch} />
            </StocksWidget>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default App;
