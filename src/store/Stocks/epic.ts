import { Stocks, StockActions } from "./typings";
import { SchedulerLike, Observable, of } from "rxjs";
import { tap, timeout, catchError, startWith, mergeMap } from "rxjs/operators";
import { addStocks, fetchStocksStatus } from "./actions";
import { Persist } from "localStoragePersistance";

export const stocksEpic = (
  persist: Persist<Stocks>,
  timeoutMs: number,
  scheduler?: SchedulerLike
) => (source$: Observable<Stocks>): Observable<StockActions> =>
  source$.pipe(
    tap(persist.set),
    mergeMap(stocks => of(addStocks(stocks, "api"), fetchStocksStatus("DONE"))),
    timeout(timeoutMs, scheduler),
    catchError(err =>
      of(fetchStocksStatus(err.name === "TimeoutError" ? "TIMEOUT" : "ERROR"))
    ),
    startWith(
      addStocks(persist.get() || [], "localstorage"),
      fetchStocksStatus("START")
    )
  );
