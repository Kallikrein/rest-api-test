import { useReducer, useEffect } from "react";
import { Observable } from "rxjs";

import { Stocks, stockReducer, defaultStocks, stocksEpic } from "store/Stocks";
import { Persist } from "localStoragePersistance";

export const stocksHook = (
  fetch: Observable<Stocks>,
  persist: Persist<Stocks>,
  timeoutMS: number
) => () => {
  const [state, dispatch] = useReducer(stockReducer, defaultStocks);
  useEffect(() => {
    const sub = fetch.pipe(stocksEpic(persist, timeoutMS)).subscribe(dispatch);
    return () => sub.unsubscribe();
  }, []);
  return [state, dispatch] as const;
};
